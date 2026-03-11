import t from '../i18n'

export default function About({ lang }) {
  const tr = t[lang].about

  return (
    <section className="about section" id="about">
      <div className="container">
        <h2 className="section-title">{tr.title}</h2>
        <p className="section-subtitle">{tr.subtitle}</p>

        <div className="about-grid">
          <div className="about-text">
            <p>
              {tr.p1a} <strong>Cristian Alonso Soto Álvarez</strong>{tr.p1b}{' '}
              <span className="highlight">{tr.p1c}</span>.
            </p>
            <p>{tr.p2}</p>
            <p>{tr.p3}</p>
            <p>{tr.p4}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="about-avatar-wrapper">
              <img
                src="/avatars/avatar-coding.png"
                alt="Cristian programando"
                className="about-avatar"
              />
            </div>

            <div className="about-card">
              <div className="about-card-header">
                <div className="about-card-icon">🎓</div>
                <div>
                  <div className="about-card-title">{tr.cardTitle}</div>
                  <div className="about-card-subtitle">{tr.cardSubtitle}</div>
                </div>
              </div>
              <div className="about-card-body">{tr.cardBody}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
