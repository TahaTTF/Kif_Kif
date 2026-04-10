# Kif Kif AI 🎓

Plateforme intelligente pour aider les étudiants avec :

## 🚀 Fonctionnalités

### 1. PDF → Audio
- Extraction texte PDF
- Traduction automatique
- Conversion en audio

### 2. Video → Text
- Transcription audio
- Converts speech into text using AI transcription
- Résumé intelligent (using ai API  )

### 3. Sign Language → Text (Frontend Ready)
- Interface webcam
- Détection gestes (à venir backend)

# 🏗️ Technical Architecture

The project follows a full-stack architecture:

* **Frontend** → React (Vite)
* **Backend** → FastAPI (Python)
* **AI Processing** → TensorFlow / Keras / OpenCV
* **Media Processing** → PDF parsing, TTS, Audio extraction

---

# ⚙️ Installation

## 🔹 Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📌 Notes

* `backend-sign` → en cours de développement
* Gemini API nécessite un quota actif

---

# 📦 Backend Requirements

* fastapi
* uvicorn
* tensorflow
* keras
* opencv-python
* ffmpeg-python
* numpy
* pillow
* pydantic
* python-multipart

---

# 📦 Frontend Requirements

* react
* vite
* axios
* tailwindcss

---

# ⚙️ How It Works

## 🔹 Sign to Text

* Capture image from camera
* Preprocess image (grayscale, resize)
* Send to AI model
* Return predicted letter

---

## 🔹 PDF to Audio

* Upload PDF
* Extract text
* Convert to speech (TTS)
* Return audio file

---

## 🔹 Video to Text

* Upload video
* Extract audio
* Convert speech → text
* Display transcription

---

# 🧠 AI Models

* CNN model trained for hand gesture recognition
* **Input:** Image (128x128 grayscale)
* **Output:** Alphabet prediction (A-Z + blank)
