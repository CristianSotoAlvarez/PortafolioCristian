import { useState, useEffect, useRef } from 'react'
import t from '../i18n'

const PROJECTS = [
  {
    icon: '🏛️',
    github: 'https://github.com/CristianSotoAlvarez/CristianSotoAlvarez-Proyecto_SIA_Registro_CivilFinal',
    demo: null,
    images: [
      '/projects/registro-civil-1.png',
      '/projects/registro-civil-2.png',
    ],
    name: {
      es: 'Sistema de Registro Civil',
      en: 'Civil Registry System',
    },
    description: {
      es: 'Sistema de Información Administrativa (SIA) para gestión de registros civiles en Java Swing. Permite registrar, consultar y administrar datos de personas con persistencia en CSV.',
      en: 'Administrative Information System (SIA) for civil registry management in Java Swing. Enables registering, querying and managing personal records with CSV-based data persistence.',
    },
    tags: ['Java', 'Java Swing', 'CSV', 'Apache Ant', 'NetBeans'],
  },
  {
    icon: '🍽️',
    github: 'https://github.com/AlvaroCG20/Proyecto-Web-DiauloFood',
    demo: null,
    images: [
      '/projects/diaulo-1.jpg',
      '/projects/diaulo-2.jpg',
      '/projects/diaulo-3.jpg',
    ],
    name: {
      es: 'DiauloFood — Gestión de Restaurante',
      en: 'DiauloFood — Restaurant Manager',
    },
    description: {
      es: 'Aplicación web para gestión integral de restaurantes con control de roles (administrador y garzón), manejo de mesas en tiempo real, catálogo de productos con CRUD y seguimiento de pedidos por mesa.',
      en: 'Web app for full restaurant management with role-based access (admin and waiter), real-time table status tracking, product catalog with CRUD and per-table order tracking.',
    },
    tags: ['Ionic', 'Angular', 'TypeScript', 'SCSS'],
  },
]

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ fill: 'none' }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function ProjectImages({ images }) {
  const [imgIndex, setImgIndex] = useState(0)
  if (!images || images.length === 0) return null

  const prevImg = (e) => { e.stopPropagation(); setImgIndex(i => (i - 1 + images.length) % images.length) }
  const nextImg = (e) => { e.stopPropagation(); setImgIndex(i => (i + 1) % images.length) }

  return (
    <div className="project-images">
      <img key={imgIndex} src={images[imgIndex]} alt={`Screenshot ${imgIndex + 1}`} className="project-screenshot" />
      {images.length > 1 && (
        <>
          <button className="project-img-btn project-img-prev" onClick={prevImg} aria-label="Anterior"><ChevronLeft /></button>
          <button className="project-img-btn project-img-next" onClick={nextImg} aria-label="Siguiente"><ChevronRight /></button>
          <div className="project-img-dots">
            {images.map((_, i) => (
              <span key={i} className={`project-img-dot${i === imgIndex ? ' active' : ''}`} onClick={e => { e.stopPropagation(); setImgIndex(i) }} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const GAP = 24

export default function Projects({ lang }) {
  const tr = t[lang].projects
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef()
  const total = PROJECTS.length

  const next = () => setCurrent(i => (i + 1) % total)
  const prev = () => setCurrent(i => (i - 1 + total) % total)

  // Slide the track so the active card is centered
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const slide = track.children[current]
    if (!slide) return
    const parentWidth = track.parentElement.offsetWidth
    const slideWidth = slide.offsetWidth
    const offset = current * (slideWidth + GAP) - (parentWidth - slideWidth) / 2
    track.style.transform = `translateX(${-offset}px)`
  }, [current])

  // Auto-advance
  useEffect(() => {
    if (paused || total <= 1) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [paused, total, current])

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <h2 className="section-title">{tr.title}</h2>
        <p className="section-subtitle">{tr.subtitle}</p>

        <div className="carousel-wrapper" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Prev button */}
          <button
            className="carousel-btn carousel-btn-prev"
            onClick={prev}
            aria-label="Anterior"
            style={{ visibility: total > 1 ? 'visible' : 'hidden' }}
          >
            <ChevronLeft />
          </button>

          {/* Sliding track */}
          <div className="carousel-viewport">
            <div className="carousel-track" ref={trackRef} style={{ gap: GAP }}>
              {PROJECTS.map((project, i) => {
                const name = project.name[lang] ?? project.name.es
                const description = project.description[lang] ?? project.description.es
                return (
                  <div key={i} className={`project-card carousel-slide${i === current ? ' active' : ''}`}>
                    <ProjectImages images={project.images} />
                    <div className="project-card-body">
                      <div className="project-card-top">
                        <span className="project-icon">{project.icon}</span>
                        <div className="project-links">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" title={tr.codeLabel}>
                              <GitHubIcon />
                            </a>
                          )}
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" title={tr.demoLabel}>
                              <ExternalLinkIcon />
                            </a>
                          )}
                        </div>
                      </div>
                      <h3 className="project-name">{name}</h3>
                      <p className="project-description">{description}</p>
                      <div className="project-tags">
                        {project.tags.map(tag => (
                          <span className="project-tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Next button */}
          <button
            className="carousel-btn carousel-btn-next"
            onClick={next}
            aria-label="Siguiente"
            style={{ visibility: total > 1 ? 'visible' : 'hidden' }}
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className="carousel-dots">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Proyecto ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
