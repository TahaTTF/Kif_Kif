import os
import cv2
import numpy as np
from tensorflow.keras.models import model_from_json

BASE_DIR = os.path.dirname(__file__)

json_path = os.path.join(BASE_DIR, "model_new.json")
weights_path = os.path.join(BASE_DIR, "model_new.h5")

with open(json_path, "r") as json_file:
    model_json = json_file.read()

model = model_from_json(model_json)
model.load_weights(weights_path)

labels = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ") + ["blank"]

def preprocess_image(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 2)

    th3 = cv2.adaptiveThreshold(
        blur,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV,
        11,
        2,
    )

    _, res = cv2.threshold(
        th3,
        70,
        255,
        cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU,
    )

    res = cv2.resize(res, (128, 128))
    res = res.reshape(1, 128, 128, 1)

    return res

def predict_letter(img):
    processed = preprocess_image(img)
    prediction = model.predict(processed, verbose=0)
    index = np.argmax(prediction)
    return labels[index]