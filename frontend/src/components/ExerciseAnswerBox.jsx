import { useState } from "react";

function ExerciseAnswerBox() {
  const [mode, setMode] = useState("text");
  const [answer, setAnswer] = useState("");

  return (
    <div className="ex-answer-box">
      <div className="ex-answer-header">
        <span>✏️ Répondre à un exercice — Modes disponibles</span>
      </div>

      <div className="ex-answer-body">
        <p className="ex-answer-helper">
          Choisissez votre mode de réponse préféré pour l’exercice sélectionné :
        </p>

        <div className="ex-answer-modes">
          <button
            className={`ex-answer-mode ${mode === "text" ? "ex-answer-mode-active" : ""}`}
            onClick={() => setMode("text")}
          >
            ✏️ Texte écrit
          </button>

          <button
            className={`ex-answer-mode ${mode === "audio" ? "ex-answer-mode-active" : ""}`}
            onClick={() => setMode("audio")}
          >
            🎤 Réponse audio
          </button>

          <button
            className={`ex-answer-mode ${mode === "sign" ? "ex-answer-mode-active" : ""}`}
            onClick={() => setMode("sign")}
          >
            🤟 Langue des signes
          </button>
        </div>

        {mode === "text" && (
          <textarea
            className="ex-answer-textarea"
            placeholder="Écrivez votre réponse ici..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}

        {mode === "audio" && (
          <div className="ex-answer-placeholder">
            Enregistrement audio à venir...
          </div>
        )}

        {mode === "sign" && (
          <div className="ex-answer-placeholder">
            Réponse en langue des signes à venir...
          </div>
        )}
      </div>

      <div className="ex-answer-footer">
        <div className="ex-answer-actions">
          <button className="ex-answer-submit">Soumettre la réponse</button>
          <button className="ex-answer-draft">Brouillon</button>
        </div>

        <div className="ex-answer-points">+120 points à gagner</div>
      </div>
    </div>
  );
}

export default ExerciseAnswerBox;