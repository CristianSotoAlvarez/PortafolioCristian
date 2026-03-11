import { useState, useEffect } from 'react'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4.354a.75.75 0 0 1 .75.75V7a.75.75 0 0 1-1.5 0V5.104a.75.75 0 0 1 .75-.75ZM12 17a.75.75 0 0 1 .75.75V19a.75.75 0 0 1-1.5 0v-1.25A.75.75 0 0 1 12 17ZM4.354 12a.75.75 0 0 1 .75-.75H7a.75.75 0 0 1 0 1.5H5.104a.75.75 0 0 1-.75-.75ZM17 12a.75.75 0 0 1 .75-.75H19a.75.75 0 0 1 0 1.5h-1.25A.75.75 0 0 1 17 12ZM6.697 7.757a.75.75 0 0 1 1.06 0l.884.884a.75.75 0 1 1-1.06 1.06l-.884-.884a.75.75 0 0 1 0-1.06ZM15.359 15.298a.75.75 0 0 1 1.06 0l.884.884a.75.75 0 1 1-1.06 1.06l-.884-.884a.75.75 0 0 1 0-1.06ZM7.757 17.303a.75.75 0 0 1 0-1.06l.884-.884a.75.75 0 1 1 1.06 1.06l-.884.884a.75.75 0 0 1-1.06 0ZM15.298 8.641a.75.75 0 0 1 0-1.06l.884-.884a.75.75 0 1 1 1.06 1.06l-.884.884a.75.75 0 0 1-1.06 0ZM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75 9.75 9.75 0 0 1 8.25 6c0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 2.25 12a9.75 9.75 0 0 0 17.502 5.91 9.75 9.75 0 0 0 2-2.908Z" />
    </svg>
  )
}

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a className="navbar-logo" href="#hero" onClick={e => handleLink(e, '#hero')}>
          &lt;<span>Cristian</span> /&gt;
        </a>

        <div className="navbar-right">
          <ul className="navbar-links">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={e => handleLink(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="navbar-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menú"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile${menuOpen ? ' open' : ''}`}>
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={e => handleLink(e, link.href)}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
