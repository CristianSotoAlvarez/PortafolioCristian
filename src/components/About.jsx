export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <h2 className="section-title">Sobre mí</h2>
        <p className="section-subtitle">// quien_soy.md</p>

        <div className="about-grid">
          <div className="about-text">
            <p>
              Soy <strong>Cristian Alonso Soto Álvarez</strong>, estudiante de último año de
              Ingeniería Informática en la{' '}
              <span className="highlight">Pontificia Universidad Católica de Valparaíso</span>.
            </p>
            <p>
              Me apasiona el desarrollo de software y estoy orientándome hacia el mundo del{' '}
              <strong>desarrollo Full Stack</strong>, combinando mi gusto por las interfaces
              modernas con el desarrollo de lógica de negocio robusta en el backend.
            </p>
            <p>
              A lo largo de mi carrera he trabajado con tecnologías como{' '}
              <strong>Angular, Ionic, Java y Python</strong>, participando en proyectos
              académicos y personales que me han permitido desarrollar habilidades tanto
              en frontend como en backend y bases de datos.
            </p>
            <p>
              Fuera del código, disfruto aprender nuevas tecnologías, resolver desafíos
              lógicos y colaborar en proyectos que generen impacto real.
            </p>
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
                  <div className="about-card-title">Pontificia Universidad Católica de Valparaíso</div>
                  <div className="about-card-subtitle">Ingeniería Informática · Último año</div>
                </div>
              </div>
              <div className="about-card-body">
                Formación en desarrollo de software, estructuras de datos, bases de datos,
                sistemas operativos y más. Actualmente finalizando la carrera con foco en
                proyectos prácticos de <strong>desarrollo web y móvil</strong>.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
