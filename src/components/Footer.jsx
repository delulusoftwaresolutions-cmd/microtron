import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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
    <footer style={{ background: '#070B15', borderTop: '1px solid #1e2d47', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,255,136,0.04) 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div className="container" style={{ paddingTop: 64, paddingBottom: 40, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontWeight: 800, fontSize: 20, color: '#F0F4FF', letterSpacing: 2, marginBottom: 8 }}>
              MICRO<span style={{ color: '#00FF88' }}>TRON</span>
            </div>
            <div style={{ fontSize: 10, fontFamily: 'Rajdhani,sans-serif', color: '#8899BB', letterSpacing: 2, marginBottom: 16 }}>INDIA TECHNOLOGIES PVT. LTD.</div>
            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14, color: '#4a5568', lineHeight: 1.7, marginBottom: 20 }}>
              Precision electronics manufacturing & engineering solutions for automotive, industrial, and IoT applications.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['in','tw','yt'].map(s => (
                <motion.div key={s} whileHover={{ scale: 1.1, color: '#00FF88' }} style={{ width: 36, height: 36, border: '1px solid #1e2d47', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8899BB', fontSize: 14, fontFamily: 'Orbitron,monospace', fontWeight: 700, transition: 'all 0.2s' }}>
                  {s.toUpperCase()}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#00FF88', marginBottom: 20, textTransform: 'uppercase' }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((item, i) => (
                  item.to ? (
                    <Link key={i} to={item.to} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14, color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color='#00FF88'} onMouseLeave={e => e.target.style.color='#4a5568'}>
                      {item.label}
                    </Link>
                  ) : (
                    <span key={i} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14, color: '#4a5568' }}>{item.label}</span>
                  )
                ))}
              </div>
            </div>
          ))}

          {/* Contact */}
          <div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#00FF88', marginBottom: 20 }}>CONTACT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '📍', text: 'No.01, Bajana Madam Street, Muthiyarpalayam, Puducherry - 605009' },
                { icon: '📞', text: '+91-9159991774 / +91-9159991775' },
                { icon: '📧', text: 'sales@microtron.co.in' },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: '#4a5568', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
            {/* Newsletter */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: 1, color: '#8899BB', marginBottom: 10, textTransform: 'uppercase' }}>Newsletter</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="form-input" placeholder="your@email.com" style={{ flex: 1, fontSize: 13, padding: '10px 12px' }} />
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '10px 16px', background: '#00FF88', border: 'none', borderRadius: 4, color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: 12, fontFamily: 'Orbitron,monospace' }}>GO</motion.button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e2d47', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: '#2d3f5a' }}>
            © 2025 Microtron India Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, background: '#00FF88', borderRadius: '50%', boxShadow: '0 0 8px #00FF88', animation: 'ledPulse 2s ease infinite' }} />
            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: '#2d3f5a', letterSpacing: 1 }}>SYSTEMS ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
