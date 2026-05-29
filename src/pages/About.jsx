import { motion } from 'framer-motion'

const timeline = [
  { year: '2010', title: 'Company Founded', desc: 'Microtron India Technologies established in Puducherry with a focus on PCB manufacturing.' },
  { year: '2013', title: 'EMS Expansion', desc: 'Launched full Electronics Manufacturing Services including SMT and THT assembly lines.' },
  { year: '2016', title: 'Wire Harness Division', desc: 'Added wire harness manufacturing for automotive and industrial clients.' },
  { year: '2018', title: 'BLDC R&D', desc: 'Established dedicated R&D team for BLDC motor design and battery BMS development.' },
  { year: '2021', title: 'GPS Solutions', desc: 'Launched AIS-140 certified GPS tracking devices for fleet management and public safety.' },
  { year: '2025', title: 'Full-Stack EMS', desc: 'Now a comprehensive EMS provider with robotics, automation, and supply chain services.' },
]

const values = [
  { icon: '🎯', title: 'Precision', desc: 'Every component placed with micrometer accuracy.' },
  { icon: '💡', title: 'Innovation', desc: 'Constant R&D to stay ahead of technology curves.' },
  { icon: '🛡️', title: 'Reliability', desc: 'Consistent quality you can depend on, every batch.' },
  { icon: '⭐', title: 'Quality', desc: 'IPC standards adhered to at every production stage.' },
  { icon: '🤝', title: 'Customer-First', desc: 'Long-term partnerships built on trust and results.' },
  { icon: '🌱', title: 'Sustainability', desc: 'Eco-friendly processes and responsible sourcing.' },
]

const missionVision = [
  { icon: '🎯', title: 'Mission', desc: "To be India's most trusted electronics manufacturing partner, delivering precision-engineered solutions that power the future." },
  { icon: '🔭', title: 'Vision', desc: 'A world where every electronic device is built with perfection, sustainability, and innovation at its core.' },
]

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Hero */}
      <div className="page-hero" style={{ background: 'var(--bg-primary)' }}>
        <div className="circuit-bg" />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--surface-soft)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="section-eyebrow">About Us</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(24px,3.6vw,42px)' }}>Engineering Excellence<br /><span style={{ color: 'var(--accent-green)' }}>Since 2010</span></h1>
            <p className="section-subtitle">A forward-thinking company committed to world-class electronics design, manufacturing, and integration services.</p>
          </motion.div>
        </div>
      </div>

      {/* Story + Timeline */}
      <section className="section about-certs-section">
        <div className="circuit-bg" />
        <div className="container">
          <div className="about-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'flex-start' }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="section-eyebrow">Our Journey</div>
              <h2 className="section-title">A Timeline of Growth</h2>
              <div style={{ marginTop: 32 }}>
                {timeline.map((item, i) => (
                  <motion.div key={i} className="timeline-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, fontWeight: 700, color: 'var(--accent-green)', letterSpacing: 2, marginBottom: 4 }}>{item.year}</div>
                    <div style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="section-eyebrow">Who We Are</div>
              <h2 className="section-title">Our Story</h2>
              <div style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p>Microtron India Technologies Pvt. Ltd. is a forward-thinking company committed to providing world-class electronics design, manufacturing, and integration services based in Puducherry, India.</p>
                <p>With a strong foundation in innovation and engineering expertise, we deliver customized solutions catering to the automotive, industrial, IoT, renewable energy, and consumer electronics sectors.</p>
                <p>Our state-of-the-art Electronics Manufacturing Services ensure high-quality PCB assembly, testing, and product integration, meeting both national and international standards.</p>
                <p>We believe in building long-term partnerships by offering end-to-end solutions — from concept design to production, deployment, and after-sales support.</p>
              </div>
              <div className="about-mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
                {missionVision.map((item, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02, borderColor: 'var(--accent-border-strong)' }}
                    style={{ padding: 24, background: 'var(--surface-strong)', border: '1px solid var(--border-color)', borderRadius: 12, transition: 'all 0.3s' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                    <div style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--accent-green)', marginBottom: 8 }}>{item.title}</div>
                    <p style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Core Values</div>
            <h2 className="section-title">What Drives Us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(var(--accent-green-rgb),0.14)' }}
                style={{ padding: 28, background: 'var(--surface-medium)', border: '1px solid var(--border-color)', borderRadius: 12, textAlign: 'center', transition: 'all 0.3s' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
                <div style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{v.title}</div>
                <p style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section">
        <div className="circuit-bg" />
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Certifications</div>
            <h2 className="section-title">Standards We Uphold</h2>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['IPC-A-610', 'IPC-7711/7721', 'AIS-140 GPS', 'ISO 9001:2015', 'RoHS Compliant', 'REACH Compliant'].map((cert, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(var(--accent-green-rgb),0.2)' }}
                className="about-cert-chip"
                style={{ padding: '16px 28px', background: 'var(--accent-surface-soft)', border: '1px solid var(--accent-border)', borderRadius: 8, fontFamily: 'Manrope,sans-serif', fontSize: 11, fontWeight: 700, color: 'var(--accent-green)', letterSpacing: 1 }}>
                ✓ {cert}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="about-address-section" style={{ padding: '48px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="about-address-line" style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 14, color: 'var(--text-secondary)', letterSpacing: 1 }}>
            📍 No.01, Bajana Madam Street, Muthiyarpalayam, Puducherry - 605009, India
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="about-contact-link" style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 14, color: 'var(--accent-green)' }}>📞 +91-9159991774</span>
            <span className="about-contact-link" style={{ fontFamily: 'Source Sans 3,sans-serif', fontSize: 14, color: 'var(--accent-green)' }}>📧 sales@microtron.co.in</span>
          </div>
        </div>
      </section>

      <style>{`
        :root[data-theme='light'] .about-certs-section{
          background: var(--bg-surface);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        :root[data-theme='light'] .about-cert-chip{
          background: var(--accent-surface)!important;
          border-color: var(--accent-border)!important;
          color: var(--accent-green)!important;
        }
        :root[data-theme='light'] .about-address-line{
          color: var(--text-primary)!important;
        }
        :root[data-theme='light'] .about-contact-link{
          color: var(--accent-green-dim)!important;
          font-weight: 700;
        }
        @media(max-width:980px){
          .about-main-grid{grid-template-columns:1fr!important;gap:34px!important}
        }
        @media(max-width:640px){
          .about-mission-grid{grid-template-columns:1fr!important}
          .about-address-line{
            font-size:13px!important;
            letter-spacing:0.5px!important;
            overflow-wrap:anywhere;
          }
        }
      `}</style>
    </motion.div>
  )
}





