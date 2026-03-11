import t from '../i18n'

export default function Footer({ lang }) {
  const year = new Date().getFullYear()
  const tr = t[lang].footer

  return (
    <footer className="footer">
      <p>© {year} Cristian Soto Álvarez. {tr.rights}</p>
    </footer>
  )
}
