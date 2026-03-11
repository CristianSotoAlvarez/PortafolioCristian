import { useEffect, useRef } from 'react'

export default function Background({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    const mouse = { x: -9999, y: -9999 }
    const prev  = { x: -9999, y: -9999 }

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const onMouse = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    // ─── STATE ───────────────────────────────────────────
    let particles     = []
    let drops         = []
    let lastAutoDrop  = 0
    let lastMouseDrop = 0
    const mousePrev   = { x: -9999, y: -9999 }

    function init() {
      const W = canvas.width
      const H = canvas.height

      if (theme === 'dark') {
        particles = []
        const count = Math.min(70, Math.floor((W * H) / 13000))
        for (let i = 0; i < count; i++) {
          particles.push({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            r:  Math.random() * 1.5 + 0.6,
            amber: Math.random() > 0.5,
          })
        }
      } else {
        drops = []
        for (let i = 0; i < 20; i++) {
          const bx = Math.random() * W
          const by = Math.random() * H
          drops.push({
            x: bx, y: by, baseX: bx, baseY: by,
            r:      Math.random() * 35 + 20,
            speed:  Math.random() * 0.4 + 0.15,
            phase:  Math.random() * Math.PI * 2,
            purple: Math.random() > 0.4,
            opacity: Math.random() * 0.22 + 0.14,
            dvx: (Math.random() - 0.5) * 0.3,
            dvy: (Math.random() - 0.5) * 0.3,
          })
        }
      }
    }

    // ─── DARK: Constellation ─────────────────────────────
    function drawDark() {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 180 && d > 0) {
          const f = ((180 - d) / 180) * 0.018
          p.vx += dx * f
          p.vy += dy * f
        }
        p.vx *= 0.97; p.vy *= 0.97
        p.x  += p.vx;  p.y  += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
      }

      // Lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(249,115,22,${(1 - d / 110) * 0.18})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
        // Lines from mouse
        const dx = mouse.x - particles[i].x
        const dy = mouse.y - particles[i].y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 130) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(251,191,36,${(1 - d / 130) * 0.38})`
          ctx.lineWidth = 0.8
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.amber ? 'rgba(251,191,36,0.85)' : 'rgba(249,115,22,0.85)'
        ctx.fill()
      }
    }

    // ─── LIGHT: Floating orbs ────────────────────────────
    function drawLight(t) {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (const orb of drops) {
        orb.x = orb.baseX + Math.sin(t * orb.speed * 0.0009 + orb.phase) * 45
        orb.y = orb.baseY + Math.cos(t * orb.speed * 0.0007 + orb.phase) * 30

        const dx = orb.x - mouse.x
        const dy = orb.y - mouse.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 220 && d > 0) {
          const f = ((220 - d) / 220) * 2.5
          orb.baseX += (dx / d) * f
          orb.baseY += (dy / d) * f
        }
        orb.dvx += (Math.random() - 0.5) * 0.04
        orb.dvy += (Math.random() - 0.5) * 0.04
        orb.dvx *= 0.98; orb.dvy *= 0.98
        orb.dvx = Math.max(-0.6, Math.min(0.6, orb.dvx))
        orb.dvy = Math.max(-0.6, Math.min(0.6, orb.dvy))
        orb.baseX += orb.dvx
        orb.baseY += orb.dvy
        if (orb.baseX < orb.r) { orb.baseX = orb.r; orb.dvx *= -1 }
        if (orb.baseX > W - orb.r) { orb.baseX = W - orb.r; orb.dvx *= -1 }
        if (orb.baseY < orb.r) { orb.baseY = orb.r; orb.dvy *= -1 }
        if (orb.baseY > H - orb.r) { orb.baseY = H - orb.r; orb.dvy *= -1 }

        const color = orb.purple ? '109,40,217' : '139,92,246'
        const grad  = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        grad.addColorStop(0,   `rgba(${color},${orb.opacity})`)
        grad.addColorStop(0.5, `rgba(${color},${orb.opacity * 0.55})`)
        grad.addColorStop(1,   `rgba(${color},0)`)
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    // ─── LOOP ─────────────────────────────────────────────
    function animate(t) {
      if (theme === 'dark') drawDark()
      else drawLight(t)
      raf = requestAnimationFrame(animate)
    }

    init()
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
