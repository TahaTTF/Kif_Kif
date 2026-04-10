import { useState } from "react";
import ResultSection from "./ResultSection";
import VideoPlayerSection from "./VideoPlayerSection";
function VideoPage() {
  const [fontSize, setFontSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/process-video/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Erreur:", err);
    }

    setLoading(false);
  };

  return (
    <div
      className={`video-page 
      ${highContrast ? "contrast" : ""} 
      ${dyslexia ? "dyslexia" : ""} 
      ${fontSize}`}
    >

      {/* 🔵 ACCESSIBILITY */}
      <div className="access-bar">
        <span>ACCESSIBILITÉ :</span>

        <button onClick={() => setFontSize("normal")}>A</button>
        <button onClick={() => setFontSize("large")}>A+</button>
        <button onClick={() => setFontSize("xlarge")}>A++</button>

        <button onClick={() => setHighContrast(!highContrast)}>
          Contraste élevé
        </button>

        <button onClick={() => setDyslexia(!dyslexia)}>
          Police dyslexie
        </button>
      </div>

      {/* 🎯 HEADER */}
      <div className="video-header">
        <div className="icon-box">🎧</div>

        <div>
          <h1>Vidéo → Texte</h1>
          <p>
            Transcription en temps réel des cours vidéo. Conçu pour les étudiants
            sourds et malentendants.
          </p>
        </div>
      </div>

      {/* 📦 UPLOAD */}
      <div className="upload-wrapper">
        <div className="upload-box">

          <div className="upload-icon">🎬</div>

          <h3>Déposez votre vidéo de cours ici</h3>

          <p>
            MP4, MOV, AVI — jusqu'à 2 Go · Ou collez un lien YouTube / Drive
          </p>

          <input
            id="fileUpload"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />

          <label htmlFor="fileUpload" className="upload-btn">
            Choisir un fichier
          </label>

          {file && <p className="file-name">{file.name}</p>}

          {/* 🔥 BOUTON UPLOAD */}
          <button className="upload-btn" onClick={handleUpload}>
            {loading ? "Processing..." : "Upload & Analyze"}
          </button>

        </div>
      </div>

      {/* ✅ RESULT */}
      {result && <ResultSection result={result} />}
      {file && <VideoPlayerSection file={file} />}

    </div>
  );
}

export default VideoPage;