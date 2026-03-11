import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background from './components/Background'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <Background theme={theme} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />

      <button
        className={`back-to-top${showTop ? ' visible' : ''}`}
        onClick={scrollTop}
        aria-label="Volver arriba"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
      </button>
    </>
  )
}
