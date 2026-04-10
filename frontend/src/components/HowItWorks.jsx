function HowItWorks() {
  return (
    <section className="how">

      <p className="how-subtitle">COMMENT ÇA MARCHE</p>

      <h2 className="how-title">
        Simple, rapide, efficace
      </h2>

      <p className="how-desc">
        Chaque service suit trois étapes pensées pour être intuitives dès la première utilisation.
      </p>

      <div className="how-cards">

        <div className="how-card">
          <h1>01</h1>
          <div className="icon">🎧</div>
          <h3>Importez votre cours</h3>
          <p>
            Uploadez une vidéo, un PDF ou activez votre caméra selon le service choisi.
          </p>
        </div>

        <div className="how-card">
          <h1>02</h1>
          <div className="icon">✨</div>
          <h3>Traitement automatique</h3>
          <p>
            Notre IA analyse et convertit le contenu en quelques secondes.
          </p>
        </div>

        <div className="how-card">
          <h1>03</h1>
          <div className="icon">📖</div>
          <h3>Apprenez à votre rythme</h3>
          <p>
            Lisez, écoutez ou signez à votre propre rythme.
          </p>
        </div>

        <div className="how-card">
          <h1>04</h1>
          <div className="icon">🏆</div>
          <h3>Progressez & motivez-vous</h3>
          <p>
            Suivez vos progrès et améliorez votre apprentissage.
          </p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;