export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>© {year} Cristian Soto Álvarez. Todos los derechos reservados.</p>
    </footer>
  )
}
