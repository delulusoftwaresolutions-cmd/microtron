import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BrandLogo from './BrandLogo'

const footerLinks = {
  'Quick Links': [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
    { to: '/clients', label: 'Our Clients' },
    { to: '/quote', label: 'Get a Quote' },
  ],
  'Services': [
    { label: 'PCB Manufacturing' },
    { label: 'Component Assembly' },
    { label: 'Wire Harness' },
    { label: 'BLDC Design' },
    { label: 'Battery BMS' },
    { label: 'GPS Tracking' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'none', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div className="container footer-shell" style={{ paddingTop: 64, paddingBottom: 40, position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <BrandLogo size="footer" />
            <p style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20, marginTop: 16 }}>
              Precision electronics manufacturing and engineering solutions for automotive, industrial, and IoT applications.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['in', 'tw', 'yt'].map(s => (
                <motion.div key={s} whileHover={{ scale: 1.1, color: 'var(--accent-green)' }} style={{ width: 36, height: 36, border: '1px solid var(--border-color)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'Manrope,sans-serif', fontWeight: 700, transition: 'all 0.2s' }}>
                  {s.toUpperCase()}
                </motion.div>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <div style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--accent-green)', marginBottom: 20, textTransform: 'uppercase' }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((item, i) => (
                  item.to ? (
                    <Link key={i} to={item.to} style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--accent-green)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                      {item.label}
                    </Link>
                  ) : (
                    <span key={i} style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 14, color: 'var(--text-muted)' }}>{item.label}</span>
                  )
                ))}
              </div>
            </div>
          ))}

          <div>
            <div style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--accent-green)', marginBottom: 20 }}>CONTACT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: 'LOC', text: 'No.01, Bajana Madam Street, Muthiyarpalayam, Puducherry - 605009' },
                { icon: 'TEL', text: '+91-9159991774 / +91-9159991775' },
                { icon: 'MAIL', text: 'sales@microtron.co.in' },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: 1, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase' }}>Newsletter</div>
              <div className="footer-newsletter-row" style={{ display: 'flex', gap: 8 }}>
                <input className="form-input" placeholder="your@email.com" style={{ flex: 1, fontSize: 13, padding: '10px 12px' }} />
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '10px 16px', background: 'var(--accent-green)', border: 'none', borderRadius: 4, color: 'var(--btn-primary-text)', fontWeight: 700, cursor: 'pointer', fontSize: 12, fontFamily: 'Manrope,sans-serif' }}>GO</motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 13, color: 'var(--text-subtle)' }}>
            (c) 2025 Microtron India Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0,255,136,0.35)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  border: '1px solid var(--accent-green)',
                  background: 'transparent',
                  color: 'var(--accent-green)',
                  padding: '8px 14px',
                  borderRadius: 4,
                  fontFamily: 'Manrope,sans-serif',
                  fontSize: 10,
                  letterSpacing: 1,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                Admin Login
              </motion.button>
            </Link>
            <div style={{ width: 6, height: 6, background: 'var(--accent-green)', borderRadius: '50%', boxShadow: 'var(--glow-green)', animation: 'ledPulse 2s ease infinite' }} />
            <span style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 12, color: 'var(--text-subtle)', letterSpacing: 1 }}>SYSTEMS ONLINE</span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:640px){
          .footer-shell{padding-top:48px!important;padding-bottom:28px!important}
          .footer-grid{gap:28px!important;margin-bottom:36px!important}
          .footer-newsletter-row{flex-direction:column!important}
          .footer-newsletter-row button{width:100%}
          .footer-bottom{padding-top:18px!important}
        }
      `}</style>
    </footer>
  )
}
