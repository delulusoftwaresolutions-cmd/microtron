import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from './BrandLogo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/clients', label: 'Clients' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ theme = 'dark', onToggleTheme }) {
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
        background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg-top)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? 'var(--nav-shadow)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(14px, 4.4vw, 24px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'clamp(68px, 10vw, 78px)',
        }}
      >
        <Link to="/" className="navbar-brand-link" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', padding: '6px 0' }}>
          <BrandLogo size="nav" />
        </Link>

        <div id="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} style={{ position: 'relative', padding: '6px 14px', textDecoration: 'none', fontFamily: 'Source Sans 3,sans-serif', fontWeight: 600, fontSize: 14, letterSpacing: 1, color: location.pathname === to ? 'var(--accent-green)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>
              {label}
              {location.pathname === to && (
                <motion.div layoutId="nav-ul" style={{ position: 'absolute', bottom: 0, left: 14, right: 14, height: 2, background: 'var(--accent-green)', borderRadius: 2, boxShadow: 'var(--glow-green)' }} />
              )}
            </Link>
          ))}
          <Link to="/quote" style={{ textDecoration: 'none', marginLeft: 8 }}>
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,255,136,0.5)' }} whileTap={{ scale: 0.97 }}
              style={{ padding: '9px 22px', background: 'transparent', border: '1px solid var(--accent-green)', borderRadius: 4, color: 'var(--accent-green)', fontFamily: 'Manrope,sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 1, boxShadow: '0 0 12px rgba(0,255,136,0.2)' }}>
              GET QUOTE
            </motion.button>
          </Link>
          <button
            className={`theme-toggle ${theme === 'light' ? 'on' : ''}`}
            onClick={onToggleTheme}
            type="button"
            role="switch"
            aria-checked={theme === 'light'}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{ marginLeft: 10 }}
          >
            <span className="theme-toggle-thumb" />
          </button>
        </div>

        <button id="hamburger" onClick={() => setOpen(!open)} style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', color: 'var(--text-primary)', padding: 0, flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--nav-bg-scrolled)', borderTop: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {links.map(({ to, label }) => (
                <Link key={to} to={to} style={{ padding: '14px 0', textDecoration: 'none', fontFamily: 'Source Sans 3,sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: 1, color: location.pathname === to ? 'var(--accent-green)' : 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  {label}
                </Link>
              ))}
              <div style={{ marginTop: 16, paddingBottom: 14, borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 14, letterSpacing: 1, color: 'var(--text-secondary)' }}>Theme</span>
                <button
                  className={`theme-toggle ${theme === 'light' ? 'on' : ''}`}
                  onClick={onToggleTheme}
                  type="button"
                  role="switch"
                  aria-checked={theme === 'light'}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  <span className="theme-toggle-thumb" />
                </button>
              </div>
              <Link to="/quote" style={{ marginTop: 16, textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>GET A QUOTE</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media(max-width:900px){
          #desktop-nav{display:none!important}
          #hamburger{display:flex!important}
          .navbar-brand-link > div{transform-origin:left center}
        }
        @media(max-width:640px){
          .navbar-brand-link > div{transform:scale(0.9)}
          #hamburger svg{width:21px;height:21px}
        }
      `}</style>
    </motion.nav>
  )
}
