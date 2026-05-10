import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/clients', label: 'Clients' },
  { to: '/contact', label: 'Contact' },
]

const ChipIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="7" width="10" height="10" rx="1"/>
    <path d="M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3"/>
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(10,14,26,0.95)' : 'rgba(10,14,26,0.2)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #1e2d47' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <motion.div animate={{ rotate: [0,360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
            <ChipIcon />
          </motion.div>
          <div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontWeight: 800, fontSize: 17, color: '#F0F4FF', letterSpacing: 2, lineHeight: 1 }}>
              MICRO<span style={{ color: '#00FF88' }}>TRON</span>
            </div>
            <div style={{ fontSize: 9, fontFamily: 'Rajdhani,sans-serif', color: '#8899BB', letterSpacing: 2 }}>INDIA TECHNOLOGIES</div>
          </div>
        </Link>

        <div id="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} style={{ position: 'relative', padding: '6px 14px', textDecoration: 'none', fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 14, letterSpacing: 1, color: location.pathname === to ? '#00FF88' : '#8899BB', transition: 'color 0.2s' }}>
              {label}
              {location.pathname === to && (
                <motion.div layoutId="nav-ul" style={{ position: 'absolute', bottom: 0, left: 14, right: 14, height: 2, background: '#00FF88', borderRadius: 2, boxShadow: '0 0 8px #00FF88' }} />
              )}
            </Link>
          ))}
          <Link to="/quote" style={{ textDecoration: 'none', marginLeft: 8 }}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,255,136,0.5)' }} whileTap={{ scale: 0.97 }}
              style={{ padding: '9px 22px', background: 'transparent', border: '1px solid #00FF88', borderRadius: 4, color: '#00FF88', fontFamily: 'Orbitron,monospace', fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 1, boxShadow: '0 0 12px rgba(0,255,136,0.2)' }}>
              GET QUOTE
            </motion.button>
          </Link>
        </div>

        <button id="hamburger" onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#F0F4FF', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(10,14,26,0.98)', borderTop: '1px solid #1e2d47', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {links.map(({ to, label }) => (
                <Link key={to} to={to} style={{ padding: '14px 0', textDecoration: 'none', fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: 1, color: location.pathname === to ? '#00FF88' : '#8899BB', borderBottom: '1px solid #1e2d47' }}>
                  {label}
                </Link>
              ))}
              <Link to="/quote" style={{ marginTop: 16, textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>GET A QUOTE</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:900px){#desktop-nav{display:none!important}#hamburger{display:block!important}}`}</style>
    </motion.nav>
  )
}
