# Kif Kif AI 🎓

Plateforme intelligente pour aider les étudiants avec :

## 🚀 Fonctionnalités

### 1. PDF → Audio
- Extraction texte PDF
- Traduction automatique
- Conversion en audio

### 2. Video → Text
- Transcription audio
- Résumé intelligent

### 3. Sign Language → Text (Frontend Ready)
- Interface webcam
- Détection gestes (à venir backend)

---

## 🛠️ Tech Stack

- Frontend: React + Vite
- Backend: FastAPI
- AI: Whisper / Gemini / TTS

---

## 📦 Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### frontend
cd frontend
npm install
npm run dev

📌 Notes
backend-sign en cours de développement
Gemini API nécessite quota actif