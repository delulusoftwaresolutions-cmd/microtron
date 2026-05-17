import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { addEnquiry } from '../utils/adminStore'

const subjects = ['General Inquiry','Request a Quote','Technical Support','Partnership','Other']

export default function Contact() {
  const [form, setForm] = useState({ name:'',company:'',email:'',phone:'',subject:'General Inquiry',message:'' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const planeRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    addEnquiry({ ...form, source: 'contact' })
    if (planeRef.current) {
      gsap.to(planeRef.current, { x: 150, y: -80, opacity: 0, duration: 0.8, ease: 'power2.in', onComplete: () => {
        setSending(false)
        setSent(true)
      }})
    } else {
      setTimeout(() => { setSending(false); setSent(true) }, 1000)
    }
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
      {/* Hero */}
      <div className="page-hero" style={{ background:'var(--bg-primary)' }}>
        <div className="circuit-bg" />
        <div style={{ position:'absolute',inset:0,background:'var(--surface-soft)' }} />
        <div className="container" style={{ position:'relative',zIndex:1 }}>
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}>
            <div className="section-eyebrow">Contact</div>
            <h1 className="section-title" style={{ fontSize:'clamp(24px,3.6vw,42px)' }}>Get In Touch</h1>
            <p className="section-subtitle">Have a project? Need a quote? Let's talk about your electronics manufacturing requirements.</p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="circuit-bg" />
        <div className="container">
          <div className="contact-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'flex-start' }}>
            {/* Form */}
            <motion.div initial={{ opacity:0,x:-40 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <div className="contact-form-card" style={{ background:'var(--surface-strong)',border:'1px solid var(--border-color)',borderRadius:16,padding:36 }}>
                <h2 style={{ fontFamily:'Manrope,sans-serif',fontSize:20,fontWeight:700,marginBottom:6,color:'var(--text-primary)' }}>Send a Message</h2>
                <p style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:14,color:'var(--text-secondary)',marginBottom:28 }}>We respond within 24 business hours.</p>

                {sent ? (
                  <motion.div initial={{ opacity:0,scale:0.8 }} animate={{ opacity:1,scale:1 }} style={{ textAlign:'center',padding:'40px 0' }}>
                    <div style={{ fontSize:56,marginBottom:16 }}>✅</div>
                    <h3 style={{ fontFamily:'Manrope,sans-serif',fontSize:18,fontWeight:700,color:'#00FF88',marginBottom:8 }}>Message Sent!</h3>
                    <p style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:15,color:'var(--text-secondary)' }}>Our team will reach out to you shortly.</p>
                    <motion.button whileHover={{ scale:1.05 }} onClick={() => { setSent(false); setForm({ name:'',company:'',email:'',phone:'',subject:'General Inquiry',message:'' }) }}
                      className="btn-outline" style={{ marginTop:24 }}>Send Another</motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:18 }}>
                    <div className="contact-form-row" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
                      <div>
                        <label className="form-label">Name *</label>
                        <input className="form-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name" required />
                      </div>
                      <div>
                        <label className="form-label">Company</label>
                        <input className="form-input" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Company name" />
                      </div>
                    </div>
                    <div className="contact-form-row" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
                      <div>
                        <label className="form-label">Email *</label>
                        <input className="form-input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" required />
                      </div>
                      <div>
                        <label className="form-label">Phone</label>
                        <input className="form-input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Subject</label>
                      <select className="form-input" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Message *</label>
                      <textarea className="form-input" rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Describe your project or inquiry..." required style={{ resize:'vertical' }} />
                    </div>
                    <motion.button type="submit" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} disabled={sending}
                      className="btn-primary" style={{ justifyContent:'center',fontSize:13,position:'relative',overflow:'hidden' }}>
                      <span ref={planeRef} style={{ display:'flex',alignItems:'center',gap:8 }}>
                        {sending ? 'Sending...' : 'Send Message'} ✈️
                      </span>
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity:0,x:40 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <div className="contact-info-list" style={{ display:'flex',flexDirection:'column',gap:20,marginBottom:32 }}>
                {[
                  { icon:'📍', label:'Office Address', value:'No.01, Bajana Madam Street, Muthiyarpalayam, Puducherry - 605009, India', color:'#00FF88' },
                  { icon:'📞', label:'Phone Numbers', value:'+91-9159991774\n+91-9159991775', color:'#00D4FF' },
                  { icon:'📧', label:'Email', value:'sales@microtron.co.in', color:'#D4860A' },
                  { icon:'⏰', label:'Business Hours', value:'Mon–Sat: 9:00 AM – 6:00 PM IST', color:'#00FF88' },
                ].map((item,i) => (
                  <motion.div key={i} className="contact-info-card" initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                    whileHover={{ borderColor:`${item.color}44`,x:4 }}
                    style={{ display:'flex',gap:16,padding:20,background:'var(--surface-medium)',border:'1px solid var(--border-color)',borderRadius:10,transition:'all 0.3s' }}>
                    <div className="contact-info-icon" style={{ width:44,height:44,borderRadius:10,background:`${item.color}15`,border:`1px solid ${item.color}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily:'Manrope,sans-serif',fontSize:11,fontWeight:700,color:item.color,letterSpacing:1,marginBottom:4 }}>{item.label}</div>
                      <div style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:14,color:'var(--text-secondary)',lineHeight:1.6,whiteSpace:'pre-line',overflowWrap:'anywhere' }}>{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="contact-map-wrap" style={{ borderRadius:12,overflow:'hidden',border:'1px solid var(--border-color)',position:'relative' }}>
                <iframe
                  className="contact-map-frame"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.0!2d79.83!3d11.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU1JzQ4LjAiTiA3OcKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="220" style={{ border:0,filter:'invert(90%) hue-rotate(180deg)',display:'block' }}
                  allowFullScreen loading="lazy" title="Microtron Location" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:980px){
          .contact-grid{grid-template-columns:1fr!important;gap:28px!important}
        }
        @media(max-width:640px){
          .contact-form-card{padding:24px!important}
          .contact-form-row{grid-template-columns:1fr!important;gap:14px!important}
          .contact-info-list{gap:14px!important;margin-bottom:22px!important}
          .contact-info-card{padding:16px!important;gap:12px!important}
          .contact-info-icon{width:40px!important;height:40px!important;font-size:18px!important;border-radius:8px!important}
          .contact-map-frame{height:190px!important}
        }
      `}</style>
    </motion.div>
  )
}






