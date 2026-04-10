from deep_translator import GoogleTranslator
from .helpers import LANGUAGE_MAP

def translate_text(text: str, source_lang: str, target_lang: str) -> str:
    src_code = LANGUAGE_MAP.get(source_lang, {}).get("code", "en")
    tgt_code = LANGUAGE_MAP.get(target_lang, {}).get("code", "en")

    if src_code == tgt_code or not text.strip():
        return text

    try:
        translated = GoogleTranslator(source=src_code, target=tgt_code).translate(text)
        return translated
    except Exception as e:
        print(f"❌ Translation error: {e}")
        return text