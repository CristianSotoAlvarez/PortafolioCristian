import { useState, useEffect } from 'react'
import t from '../i18n'

function useTyping(texts, speed = 90, deleteSpeed = 50, pause = 2200) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    setDisplay('')
    setIdx(0)
    setCharIdx(0)
    setDeleting(false)
    setWaiting(false)
  }, [texts])

  useEffect(() => {
    if (waiting) return
    const current = texts[idx]

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIdx + 1)
        setDisplay(next)
        if (charIdx + 1 === current.length) {
          setWaiting(true)
          setTimeout(() => {
            setDeleting(true)
            setWaiting(false)
          }, pause)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        const next = current.slice(0, charIdx - 1)
        setDisplay(next)
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setIdx(i => (i + 1) % texts.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, idx, texts, speed, deleteSpeed, pause, waiting])

  return display
}

export default function Hero({ lang }) {
  const tr = t[lang].hero
  const typingText = useTyping(tr.typing)

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <p className="hero-greeting">{tr.greeting}</p>

            <h1 className="hero-name">
              Cristian<br />
              <span className="highlight">Soto Álvarez</span>
            </h1>

            <div className="hero-typing-wrapper">
              <span className="typing-text">{typingText}</span>
              <span className="hero-cursor" />
            </div>

            <p className="hero-description">
              {tr.description1} <strong style={{ color: 'var(--amber)' }}>{tr.degree}</strong> {tr.description2}{' '}
              <strong style={{ color: 'var(--text)' }}>{tr.fullstack}</strong> {tr.description3}
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                {tr.btnProjects}
              </button>
              <button className="btn btn-outline" onClick={() => scrollTo('#contact')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {tr.btnContact}
              </button>
            </div>

            <div className="hero-social">
              <a href="https://github.com/CristianSotoAlvarez" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/cristian-soto-alvarez-14739129a/" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a className="cv-btn" href="/cv.pdf" download="Cristian_Soto_CV.pdf">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16l-5-5 1.41-1.41L11 13.17V4h2v9.17l2.59-2.58L17 11l-5 5zm-7 2h14v2H5v-2z" />
                </svg>
                {tr.btnCV}
              </a>
            </div>
          </div>

          <div className="hero-avatar-wrapper">
            <img src="/avatars/avatar-hello.png" alt="Cristian Soto" className="hero-avatar" />
          </div>
        </div>
      </div>
    </section>
  )
}
