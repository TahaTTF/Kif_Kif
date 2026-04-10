from fastapi import FastAPI, UploadFile, File
import numpy as np
import cv2
from PIL import Image
import io
import os
from tensorflow.keras.models import model_from_json

app = FastAPI()

# 📁 Fix path
BASE_DIR = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE_DIR, "services")

json_path = os.path.join(MODEL_DIR, "model_new.json")
weights_path = os.path.join(MODEL_DIR, "model_new.h5")

# 🔥 Load model
with open(json_path, "r") as f:
    model = model_from_json(f.read())

model.load_weights(weights_path)

labels = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ") + ["blank"]

# ======================
# 🧠 PREPROCESS
# ======================
def preprocess(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 2)

    th3 = cv2.adaptiveThreshold(
        blur, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV, 11, 2
    )

    _, res = cv2.threshold(
        th3, 70, 255,
        cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
    )

    res = cv2.resize(res, (128, 128))
    res = res.reshape(1, 128, 128, 1)

    return res

# ======================
# 🚀 API
# ======================
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        img = np.array(image)

        processed = preprocess(img)
        pred = model.predict(processed, verbose=0)

        letter = labels[np.argmax(pred)]

        return {"letter": letter}

    except Exception as e:
        return {"error": str(e)}