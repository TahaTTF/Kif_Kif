function Testimonials() {
  return (
    <section className="testimonials">

      <p className="test-subtitle">TÉMOIGNAGES</p>

      <h2 className="test-title">
        Ils apprennent avec Kif Kif
      </h2>

      <p className="test-desc">
        Des étudiants du monde entier partagent leur expérience sur la plateforme.
      </p>

      <div className="test-cards">

        {/* CARD 1 */}
        <div className="test-card">
          <div className="stars">★★★★★</div>

          <p className="test-text">
            "Grâce aux transcriptions synchronisées, je n’ai plus à deviner ce que dit le professeur. Je lis chaque mot au moment où il est prononcé."
          </p>

          <div className="user">
            <div className="avatar green">SA</div>
            <div>
              <h4>Sarra Amara</h4>
              <span>Étudiante en droit · Sourde</span>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="test-card">
          <div className="stars">★★★★★</div>

          <p className="test-text">
            "Le mode PDF→Audio avec la voix féminine et la surbrillance en temps réel a transformé mes révisions. Je peux enfin étudier sans aide extérieure."
          </p>

          <div className="user">
            <div className="avatar blue">KM</div>
            <div>
              <h4>Karim Mansouri</h4>
              <span>Lycéen · Déficience visuelle</span>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="test-card">
          <div className="stars">★★★★★</div>

          <p className="test-text">
            "Le mode entraînement LSF est addictif. Voir mon score monter de 72% à 94% en deux semaines, c’était une vraie fierté."
          </p>

          <div className="user">
            <div className="avatar purple">LT</div>
            <div>
              <h4>Leila Touzri</h4>
              <span>Étudiante en informatique · LSF</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;