import os
import uuid
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import whisper
import subprocess
from google import genai

from fastapi import Form
from io import BytesIO

# 📄 PDF modules
from services.extractor import extract_text_from_pdf
from services.preprocessor import clean_text
from services.translator import translate_text
from services.tts import text_to_speech
from services.helpers import detect_language


client = genai.Client(api_key="AIzaSyBYHg1o1vOZrkL0y6FvI_ykhGDKJ78UE1J")
app = FastAPI()
model_whisper = whisper.load_model("base")
os.environ["PATH"] += os.pathsep + r"C:\ffmpeg-8.1-essentials_build\bin"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ======================
# 🎤 TRANSCRIPTION
# ======================
def transcribe_audio(audio_path):
    result = model_whisper.transcribe(audio_path)
    return result["text"]

# ======================
# 🎥 EXTRACTION AUDIO
# ======================
def extract_audio(video_path):
    audio_path = f"uploads/{uuid.uuid4()}.wav"

    subprocess.run(
        rf'"C:\ffmpeg-8.1-essentials_build\bin\ffmpeg.exe" -y -i "{video_path}" "{audio_path}"',
        shell=True
    )

    return audio_path

# ======================
# ✂️ SEGMENTATION
# ======================
def segment_text(text):
    import re
    sentences = re.split(r'[.!؟\n]', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    return sentences

# ======================
# 🧠 ORGANISATION IA
# ======================
def organize_text(text):
    prompt = f"""
Tu es un assistant spécialisé dans l'organisation de contenu académique.

Transforme ce texte en résumé structuré avec titres, sous-titres et points clés.

Respecte strictement :
- ne pas ajouter d'informations
- reformuler proprement
- supprimer répétitions
- respecter la langue original
- utilise des titres clairs
- ajoute emojis légers si utile 

Texte :
{text}
"""

    response = client.models.generate_content(
    model="models/gemini-2.0-flash-lite",
    contents=prompt
    )

    return response.text

# ======================
# 🧠 RÉSUMÉ SIMPLE
# ======================
def summarize_text(text):
    length = len(text)

    if length < 1000:
        style = "résumé très court (3 lignes)"
    elif length < 3000:
        style = "résumé moyen (5-8 lignes)"
    else:
        style = "résumé détaillé structuré (paragraphes + points clés)"

    prompt = f"""
Donne un {style} de ce texte.
Respecte la langue originale.

Texte :
{text}
"""

    response = client.models.generate_content(
    model="models/gemini-2.0-flash-lite",
    contents=prompt
    )
    

    return response.text


# ======================
# 📁 UPLOAD
# ======================
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ======================
# 🚀 API
# ======================
@app.post("/process-video/")
async def process_video(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    audio_path = extract_audio(file_path)

    transcription = transcribe_audio(audio_path)

    segments = segment_text(transcription)

    try:
        organized = organize_text(transcription)
    except Exception as e:
        print("Erreur Gemini organize:", e)
        organized = "⚠️ Gemini indisponible (quota dépassé)"

    try:
        summary = summarize_text(transcription)
    except Exception as e:
        print("Erreur Gemini summary:", e)
        summary = "⚠️ Résumé indisponible (quota dépassé)"

    return {
        "transcription": transcription,
        "segments": segments,
        "organized": organized,
        "summary": summary
    }

# ======================
# 📄 PDF → AUDIO
# ======================
@app.post("/pdf-to-audio/")
async def pdf_to_audio(
    file: UploadFile = File(...),
    target_lang: str = Form(...)
):
    try:
        # 📄 Read PDF
        pdf_bytes = await file.read()
        pdf_file = BytesIO(pdf_bytes)

        # 🧠 Extract
        raw_text = extract_text_from_pdf(pdf_file)
        cleaned_text = clean_text(raw_text)

        if not cleaned_text.strip():
            return {"error": "No text found in PDF"}

        # 🌍 Detect language
        source_lang = detect_language(cleaned_text)

        # 🔁 Translate
        translated_text = translate_text(cleaned_text, source_lang, target_lang)

        # 🔊 TTS
        audio_bytes = text_to_speech(translated_text, target_lang)

        return {
            "source_lang": source_lang,
            "target_lang": target_lang,
            "transcription": cleaned_text,
            "translation": translated_text,
            "audio_base64": audio_bytes.getvalue().hex()
        }

    except Exception as e:
        return {"error": str(e)}
    



