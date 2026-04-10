 import ExercisesCards from "./ExercisesCards";
 import ExerciseAnswerBox from "./ExerciseAnswerBox";
 function ExercisesPage() {
  return (
    <div className="ex-page">
      {/* HEADER */}
      <div className="ex-header">
        <div className="ex-header-icon">📚</div>

        <div className="ex-header-text">
          <h1>Exercices</h1>
          <p>
            Répondez par texte, audio ou langue des signes. Chaque exercice
            s&apos;adapte à votre mode de communication.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="ex-filter-bar">
        <div className="ex-filter-left">
          <span className="ex-filter-label">MATIÈRE :</span>

          <div className="ex-pill-group">
            <button className="ex-pill ex-pill-active">Tout</button>
            <button className="ex-pill">Mathématiques</button>
            <button className="ex-pill">Droit</button>
            <button className="ex-pill">Sciences</button>
            <button className="ex-pill">Langues</button>
          </div>
        </div>

        <div className="ex-filter-right">
          <span className="ex-filter-label">NIVEAU :</span>
          <select className="ex-select">
            <option>Tous</option>
            <option>Débutant</option>
            <option>Intermédiaire</option>
            <option>Avancé</option>
          </select>
        </div>
      </div>

      {/* CONTENT */}
      <div className="ex-content">
        {/* STATS */}
        <div className="ex-stats-grid">
          <div className="ex-stat-card">
            <div className="ex-stat-number ex-green">14</div>
            <div className="ex-stat-label">Exercices complétés</div>
          </div>

          <div className="ex-stat-card">
            <div className="ex-stat-number ex-orange">1,240</div>
            <div className="ex-stat-label">Points gagnés</div>
          </div>

          <div className="ex-stat-card">
            <div className="ex-stat-number ex-navy">68%</div>
            <div className="ex-stat-label">Progression globale</div>
          </div>

          <div className="ex-stat-card">
            <div className="ex-stat-number ex-purple">
              7 <span className="ex-fire">🔥</span>
            </div>
            <div className="ex-stat-label">Jours consécutifs</div>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="ex-progress-block">
          <div className="ex-progress-head">
            <span>Progression globale</span>
            <span>14 / 21 exercices</span>
          </div>

          <div className="ex-progress-track">
            <div className="ex-progress-fill"></div>
          </div>
        </div>

        {/* BADGES */}
        <div className="ex-badges-block">
          <div className="ex-badges-title">BADGES OBTENUS</div>

          <div className="ex-badges-row">
            <div className="ex-badge-card ex-badge-gold">
              <span className="ex-badge-icon">🏅</span>
              <span>Premier exercice</span>
            </div>

            <div className="ex-badge-card ex-badge-orange">
              <span className="ex-badge-icon">🔥</span>
              <span>7 jours consécutifs</span>
            </div>

            <div className="ex-badge-card ex-badge-yellow">
              <span className="ex-badge-icon">🤟</span>
              <span>Maître LSF</span>
            </div>

            <div className="ex-badge-card ex-badge-disabled">
              <span className="ex-badge-icon">🏆</span>
              <span>100% du module</span>
            </div>

            <div className="ex-badge-card ex-badge-disabled">
              <span className="ex-badge-icon">⚡</span>
              <span>Réponse rapide</span>
            </div>
          </div>
        </div>

        <ExercisesCards />
        <ExerciseAnswerBox />

      </div>
    </div>
  );
}

export default ExercisesPage;