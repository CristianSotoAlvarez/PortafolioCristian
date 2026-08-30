import { useState, useEffect, useRef } from 'react'
import t from '../i18n'

const PROJECTS = [
  {
    github: 'https://github.com/CristianSotoAlvarez/AvanceSeminario---Cristian-Soto',
    demo: null,
    featured: true,
    images: [
      '/projects/jat-1.jpg',
      '/projects/jat-2.jpg',
      '/projects/jat-3.jpg',
      '/projects/jat-4.jpg',
      '/projects/jat-5.jpg',
    ],
    eyebrow: { es: 'Seminario de título · 2026', en: 'Final-year thesis · 2026' },
    name: {
      es: 'JAT (Justo a Tiempo) — Trazabilidad de despacho',
      en: 'JAT (Just In Time) — Dispatch Traceability',
    },
    description: {
      es: 'Sistema con el que la jefatura de logística de una planta de alimentos ve en todo momento dónde está cada camión, qué andén ocupa y cuánto falta para cargarlo. Registra quién hizo cada paso y a qué hora, entrega indicadores de gestión y anticipa qué camiones se van a atrasar a partir del historial.',
      en: 'System that lets the logistics management of a food plant see, at any moment, where every truck is, which dock it occupies and how much is left to load. It records who did each step and when, delivers management indicators and predicts which trucks will run late based on history.',
    },
    tags: ['NestJS', 'Next.js', 'Prisma', 'PostgreSQL', 'Socket.IO', 'Docker', 'Python'],
  },
  {
    github: null,
    demo: 'https://cris-fness.vercel.app/',
    images: [
      '/projects/crisfness-1.jpg',
      '/projects/crisfness-2.jpg',
      '/projects/crisfness-3.jpg',
      '/projects/crisfness-4.jpg',
    ],
    eyebrow: { es: 'Cliente freelance · 2026', en: 'Freelance client · 2026' },
    name: {
      es: 'Cris Fness — Sitio para asesoría fitness',
      en: 'Cris Fness — Online Fitness Coaching Site',
    },
    description: {
      es: 'Sitio con el que un preparador físico capta clientes: presenta su servicio y le hace llegar las solicitudes de evaluación a su correo. Puede cambiar precios y contenidos él mismo, sin saber programar.',
      en: 'Site a personal trainer uses to win clients: it presents his service and delivers evaluation requests to his inbox. He can change prices and content himself, without knowing how to code.',
    },
    tags: ['Astro', 'JavaScript', 'CSS', 'Vercel', 'Formspree'],
  },
  {
    github: 'https://github.com/CristianSotoAlvarez/dialogflow-cx-webchat',
    demo: null,
    images: ['/projects/chatbot-1.jpg'],
    eyebrow: { es: 'Proyecto universitario', en: 'University project' },
    name: {
      es: 'FINRA Bot — Chatbot orientativo PUCV',
      en: 'FINRA Bot — PUCV Orientation Chatbot',
    },
    description: {
      es: 'Asistente que orienta a estudiantes dentro del edificio de la facultad: les responde por texto o por voz dónde queda cada lugar y cómo llegar.',
      en: 'Assistant that helps students find their way inside the faculty building: it answers by text or voice where each place is and how to get there.',
    },
    tags: ['Dialogflow CX', 'JavaScript', 'HTML', 'CSS', 'Web Speech API'],
  },
  {
    github: 'https://github.com/AlvaroCG20/Proyecto-Web-DiauloFood',
    demo: null,
    images: [
      '/projects/diaulo-1.jpg',
      '/projects/diaulo-2.jpg',
      '/projects/diaulo-3.jpg',
    ],
    eyebrow: { es: 'Proyecto universitario', en: 'University project' },
    name: {
      es: 'DiauloFood — Gestión de restaurante',
      en: 'DiauloFood — Restaurant Manager',
    },
    description: {
      es: 'Aplicación para que un restaurante lleve sus mesas y pedidos en tiempo real: el administrador gestiona el catálogo y el garzón toma los pedidos por mesa.',
      en: 'App for a restaurant to manage tables and orders in real time: the admin manages the catalogue and the waiter takes orders table by table.',
    },
    tags: ['Ionic', 'Angular', 'TypeScript', 'SCSS'],
  },
  {
    github: 'https://github.com/CristianSotoAlvarez/CristianSotoAlvarez-Proyecto_SIA_Registro_CivilFinal',
    demo: null,
    images: [
      '/projects/registro-civil-1.jpg',
      '/projects/registro-civil-2.jpg',
    ],
    eyebrow: { es: 'Proyecto universitario', en: 'University project' },
    name: {
      es: 'Sistema de Registro Civil',
      en: 'Civil Registry System',
    },
    description: {
      es: 'Sistema de escritorio para registrar, consultar y administrar datos de personas, con búsqueda por RUT y persistencia de la información.',
      en: 'Desktop system to register, query and manage personal records, with ID-based search and data persistence.',
    },
    tags: ['Java', 'Java Swing', 'CSV', 'Apache Ant'],
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

function ProjectImages({ images, alt }) {
  const [imgIndex, setImgIndex] = useState(0)
  if (!images || images.length === 0) return null

  const prevImg = (e) => { e.stopPropagation(); setImgIndex(i => (i - 1 + images.length) % images.length) }
  const nextImg = (e) => { e.stopPropagation(); setImgIndex(i => (i + 1) % images.length) }

  return (
    <div className="project-images">
      <img
        key={imgIndex}
        src={images[imgIndex]}
        alt={`${alt} — ${imgIndex + 1}`}
        className="project-screenshot"
        loading="lazy"
      />
      {images.length > 1 && (
        <>
          <button className="project-img-btn project-img-prev" onClick={prevImg} aria-label="Imagen anterior"><ChevronLeft /></button>
          <button className="project-img-btn project-img-next" onClick={nextImg} aria-label="Imagen siguiente"><ChevronRight /></button>
          <div className="project-img-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`project-img-dot${i === imgIndex ? ' active' : ''}`}
                onClick={e => { e.stopPropagation(); setImgIndex(i) }}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ProjectCard({ project, lang, tr, index }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const name = project.name[lang] ?? project.name.es
  const description = project.description[lang] ?? project.description.es
  const eyebrow = project.eyebrow?.[lang] ?? project.eyebrow?.es

  return (
    <article
      ref={ref}
      className={`project-card${project.featured ? ' featured' : ''}${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${Math.min(index, 4) * 70}ms` }}
    >
      <ProjectImages images={project.images} alt={name} />
      <div className="project-card-body">
        <div className="project-card-top">
          
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" title={tr.codeLabel} aria-label={tr.codeLabel}>
                <GitHubIcon />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" title={tr.demoLabel} aria-label={tr.demoLabel}>
                <ExternalLinkIcon />
              </a>
            )}
          </div>
        </div>
        {eyebrow && <span className="project-eyebrow">{eyebrow}</span>}
        <h3 className="project-name">{name}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span className="project-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects({ lang }) {
  const tr = t[lang].projects

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <h2 className="section-title">{tr.title}</h2>
        <p className="section-subtitle">{tr.subtitle}</p>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name.es} project={project} lang={lang} tr={tr} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
