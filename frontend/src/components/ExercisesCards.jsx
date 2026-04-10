function ExercisesCards() {
  const exercises = [
    {
      subject: "Mathématiques",
      subjectClass: "ex-tag-math",
      title: "Dérivation — Fonctions polynomiales",
      desc: "Calculez la dérivée des fonctions suivantes et déterminez les extremums locaux.",
      meta: "Intermédiaire · 5 questions",
      progress: "80%",
      progressValue: 80,
      metaDot: "ex-dot-green",
      status: ""
    },
    {
      subject: "Droit",
      subjectClass: "ex-tag-law",
      title: "Hiérarchie des normes juridiques",
      desc: "Classez ces textes juridiques selon la pyramide de Kelsen et justifiez vos réponses.",
      meta: "Avancé · 8 questions",
      progress: "37%",
      progressValue: 37,
      metaDot: "ex-dot-orange",
      status: ""
    },
    {
      subject: "Sciences",
      subjectClass: "ex-tag-science",
      title: "Cinétique chimique — Loi d'Arrhenius",
      desc: "Expliquez l'influence de la température sur la vitesse de réaction et appliquez la loi.",
      meta: "Difficile · 6 questions",
      progress: "Nouveau",
      progressValue: 0,
      metaDot: "ex-dot-red",
      status: "new"
    },
    {
      subject: "Langues",
      subjectClass: "ex-tag-language",
      title: "Expression écrite — Argumentation",
      desc: "Rédigez un paragraphe argumenté sur un sujet de société. Trois modes de réponse disponibles.",
      meta: "Intermédiaire · Réponse libre",
      progress: "✓",
      progressValue: 88,
      metaDot: "ex-dot-green",
      status: "done"
    },
    {
      subject: "Mathématiques",
      subjectClass: "ex-tag-math",
      title: "Intégration — Calcul d'aires",
      desc: "Calculez les intégrales définies et interprétez-les géométriquement.",
      meta: "Avancé · 4 questions",
      progress: "Nouveau",
      progressValue: 0,
      metaDot: "ex-dot-red",
      status: "new"
    },
    {
      subject: "Droit",
      subjectClass: "ex-tag-law",
      title: "Droits fondamentaux — QCM",
      desc: "Questionnaire à choix multiples sur les droits garantis par la Constitution.",
      meta: "Débutant · 10 questions",
      progress: "✓",
      progressValue: 88,
      metaDot: "ex-dot-green",
      status: "done"
    }
  ];

  return (
    <div className="ex-cards-section">
      <div className="ex-cards-grid">
        {exercises.map((item, index) => (
          <div className="ex-exercise-card" key={index}>
            <div className={`ex-card-tag ${item.subjectClass}`}>{item.subject}</div>

            <h3 className="ex-card-title">{item.title}</h3>
            <p className="ex-card-desc">{item.desc}</p>

            <div className="ex-card-footer">
              <div className="ex-card-meta">
                <span className={`ex-meta-dot ${item.metaDot}`}></span>
                <span>{item.meta}</span>
              </div>

              <div className="ex-card-progress-wrap">
                <div className="ex-card-progress-track">
                  <div
                    className="ex-card-progress-fill"
                    style={{ width: `${item.progressValue}%` }}
                  ></div>
                </div>

                <span
                  className={`ex-card-progress-label ${
                    item.status === "new"
                      ? "ex-progress-new"
                      : item.status === "done"
                      ? "ex-progress-done"
                      : ""
                  }`}
                >
                  {item.progress}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExercisesCards;