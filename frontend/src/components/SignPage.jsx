/*
import { useRef, useState } from "react";
import Webcam from "react-webcam";

function SignPage() {
  const webcamRef = useRef(null);
  const [letter, setLetter] = useState("");

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    const blob = await fetch(imageSrc).then(res => res.blob());

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const res = await fetch("http://127.0.0.1:8001/predict/", { // ✅ FIX
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        console.error("Backend error:", data.error);
        return;
      }

      setLetter(data.letter);

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sign Language → Text</h1>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
      />

      <br />

      <button onClick={capture}>Capture</button>

      <h2>Detected: {letter}</h2>
    </div>
  );
}

export default SignPage;

*/


import { useState } from "react";

function SignPage() {
  const [cameraOn, setCameraOn] = useState(false);
  const [text, setText] = useState(
    "Bonjour, je voudrais expliquer ma réponse à l'exercice..."
  );

  return (
    <div className="st-page">
      <div className="st-header">
        <div className="st-icon">🤟</div>

        <div className="st-header-text">
          <h1>Langue des Signes → Texte</h1>
          <p>
            Traduisez vos signes LSF ou LST en temps réel et répondez aux
            exercices avec votre langue naturelle.
          </p>
        </div>
      </div>

      <div className="st-grid">
        <div className="st-left">
          <div className="st-camera-box">
            <div className="st-camera-top">
              <span className="st-camera-emoji">📷</span>
              <span className="st-badge">● LSF détecté</span>
            </div>

            {!cameraOn ? (
              <>
                <h3>Caméra non activée</h3>
                <p>
                  Activez la caméra pour commencer la traduction en temps réel
                </p>
                <button
                  className="st-btn-primary"
                  onClick={() => setCameraOn(true)}
                >
                  Activer la caméra
                </button>
              </>
            ) : (
              <div className="st-camera-active">🎥 Caméra active...</div>
            )}
          </div>

          <div className="st-live-box">
            <span className="st-live-label">TRADUCTION EN TEMPS RÉEL</span>
            <p>{text}</p>
          </div>

          <div className="st-response-box">
            <div className="st-card-header">👜 Zone de réponse</div>

            <div className="st-response-body">
              <p className="st-helper">
                Texte traduit prêt à être soumis comme réponse à un exercice ou
                devoir :
              </p>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <div className="st-actions">
                <button className="st-btn-success">Soumettre la réponse</button>
                <button className="st-btn-light">Effacer</button>
                <button className="st-btn-light">📋 Copier</button>
              </div>
            </div>
          </div>
        </div>

        <div className="st-right">
          <div className="st-training-box">
            <div className="st-card-header st-card-header-row">
              <span>🏆 Mode Entraînement LSF</span>
              <span className="st-score">Score: 847 pts</span>
            </div>

            <div className="st-word-box">
              <p>Signe ce mot :</p>
              <h2>UNIVERSITÉ</h2>
            </div>

            <div className="st-stat">
              <span>Précision</span>
              <div className="st-bar">
                <div style={{ width: "87%" }}></div>
              </div>
              <span>87%</span>
            </div>

            <div className="st-stat">
              <span>Vitesse</span>
              <div className="st-bar st-bar-orange">
                <div style={{ width: "72%" }}></div>
              </div>
              <span>72%</span>
            </div>

            <div className="st-stat">
              <span>Fluidité</span>
              <div className="st-bar">
                <div style={{ width: "93%" }}></div>
              </div>
              <span>93%</span>
            </div>

            <button className="st-btn-dark">Mot suivant →</button>
          </div>

          <div className="st-history-box">
            <div className="st-card-header">🕘 Historique des sessions</div>

            <div className="st-history-list">
              <div className="st-history-item">
                <div className="st-history-date">Aujourd'hui</div>
                <div className="st-history-main">
                  <p className="st-history-title">Entraînement général LSF</p>
                  <span>24 signes · 14 min</span>
                </div>
                <div className="st-history-score">87%</div>
              </div>

              <div className="st-history-item">
                <div className="st-history-date">Hier</div>
                <div className="st-history-main">
                  <p className="st-history-title">Vocabulaire scientifique</p>
                  <span>18 signes · 10 min</span>
                </div>
                <div className="st-history-score">79%</div>
              </div>

              <div className="st-history-item">
                <div className="st-history-date">12 Avr</div>
                <div className="st-history-main">
                  <p className="st-history-title">Exercice Chapitre 4</p>
                  <span>Réponse soumise · 5 min</span>
                </div>
                <div className="st-history-score">✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignPage;












