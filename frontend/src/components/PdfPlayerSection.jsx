import { useEffect, useMemo, useRef, useState } from "react";

function PdfPlayerSection({ result, onChangeLanguage, loading }) {
  const audioRef = useRef(null);

  const [voice, setVoice] = useState("amira");
  const [speed, setSpeed] = useState(1.5);
  const [language, setLanguage] = useState(result.target_lang || "French");
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const translationText = useMemo(() => {
    return result?.translation || "";
  }, [result]);

  useEffect(() => {
    setLanguage(result.target_lang || "French");
  }, [result.target_lang]);

  useEffect(() => {
    if (!result?.audio_base64) return;

    const bytes = new Uint8Array(
      result.audio_base64.match(/.{1,2}/g).map((b) => parseInt(b, 16))
    );

    const blob = new Blob([bytes], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);

    setAudioUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [result]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const interval = setInterval(() => {
    if (!audio.duration) return;

    const words = translationText.split(" ");
    const progress = audio.currentTime / audio.duration;

    const index = Math.floor(progress * words.length);

    setCurrentWordIndex(index);
  }, 100); // update every 100ms

  return () => clearInterval(interval);
}, [translationText]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (e) {
      console.error("Audio play error:", e);
    }

    if (!audio.paused && audio.currentTime === 0) {
        setCurrentWordIndex(0);
    }
  };

  const skipTime = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;

    const next = Math.max(0, Math.min((audio.duration || 0), audio.currentTime + seconds));
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);

    const words = translationText.split(" ");
    const progress = value / (audio.duration || 1);
    setCurrentWordIndex(Math.floor(progress * words.length));
  };

  const handleSpeedChange = (value) => {
    const numeric = Number(value);
    setSpeed(numeric);
    if (audioRef.current) {
      audioRef.current.playbackRate = numeric;
    }
  };

  const handleLanguageChange = async (nextLang) => {
    setLanguage(nextLang);
    await onChangeLanguage(nextLang);
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="pdf-result">
      <audio ref={audioRef} src={audioUrl || undefined} preload="metadata" />

      <div className="pdf-left">
        <div className="audio-player">
          <p className="doc-label">Document chargé</p>
          <h3>
            {result.source_lang} → {result.target_lang}
          </h3>

          <div className="progress-bar">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="player-controls">
            <button className="small-btn" type="button" onClick={() => skipTime(-10)}>
              ⏪ 10s
            </button>

            <button className="small-btn" type="button" onClick={() => skipTime(-5)}>
              ⏮
            </button>

            <button className="play-btn" type="button" onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button className="small-btn" type="button" onClick={() => skipTime(5)}>
              ⏭
            </button>

            <button className="small-btn" type="button" onClick={() => skipTime(10)}>
              10s ⏩
            </button>

            <button className="speed-btn" type="button">
              {speed}x
            </button>
          </div>
        </div>

        <div className="voice-box">
          <h4>🔊 Sélection de voix</h4>

          <div className="voice-grid">
            <div
              className={`voice-card ${voice === "amira" ? "active" : ""}`}
              onClick={() => setVoice("amira")}
            >
              <div className="voice-avatar">👩</div>
              <div>
                <p>Amira</p>
                <span>Française · Féminine</span>
              </div>
            </div>

            <div
              className={`voice-card ${voice === "thomas" ? "active" : ""}`}
              onClick={() => setVoice("thomas")}
            >
              <div className="voice-avatar">👨</div>
              <div>
                <p>Thomas</p>
                <span>Français · Masculin</span>
              </div>
            </div>

            <div
              className={`voice-card ${voice === "yasmine" ? "active" : ""}`}
              onClick={() => setVoice("yasmine")}
            >
              <div className="voice-avatar">👩</div>
              <div>
                <p>Yasmine</p>
                <span>Arabe · Féminine</span>
              </div>
            </div>

            <div
              className={`voice-card ${voice === "adam" ? "active" : ""}`}
              onClick={() => setVoice("adam")}
            >
              <div className="voice-avatar">👨</div>
              <div>
                <p>Adam</p>
                <span>Anglais · Masculin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pdf-right">
        <div className="text-box">
          <div className="text-header">📖 Texte avec surbrillance</div>

          <div className="text-content">
            {translationText.split(" ").map((word, i) => (
              <span
                key={i}
                className={i === currentWordIndex ? "highlight" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </div>

          <div className="text-controls">
            <div>
              <label>VITESSE :</label>
              <select
                value={speed}
                onChange={(e) => handleSpeedChange(e.target.value)}
              >
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>

            <div>
              <label>LANGUE :</label>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                disabled={loading}
              >
                <option value="French">Français</option>
                <option value="English">Anglais</option>
                <option value="Arabic">Arabe</option>
                <option value="German">Allemand</option>
                <option value="Spanish">Espagnol</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfPlayerSection;