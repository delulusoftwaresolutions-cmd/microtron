import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PCBHeroAnimation from '../components/PCBHeroAnimation'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { icon: '🔲', title: 'PCB Manufacturing', desc: 'Single to multilayer PCBs with IPC Class 2/3 standards. Automated SMT & THT assembly.' },
  { icon: '⚙️', title: 'Component Assembly', desc: 'SMT, THT, mixed assembly, and wire harness cable assembly with AOI inspection, soldering, and quality testing.' },
  { icon: '🔌', title: 'Wire Harness', desc: 'Custom wire harnesses for automotive and industrial use with precision engineering.' },
  { icon: '⚡', title: 'BLDC Design', desc: 'Energy-efficient BLDC motor and controller design with custom hardware & firmware.' },
  { icon: '🔋', title: 'Battery BMS', desc: 'Advanced BMS for LiFePO₄ packs ensuring safety and longevity for EV/solar.' },
  { icon: '🔌', title: 'EV Charger Adaptors', desc: 'Adaptor-type EV chargers from 48V to 60V for reliable charging of e-mobility battery packs.' },
  { icon: '📡', title: 'GPS Tracking', desc: 'AIS-140 certified GPS trackers with real-time monitoring and emergency SOS.' },
]

const stats = [
  { val: 500, label: 'Projects Delivered', suffix: '+' },
  { val: 15, label: 'Years Experience', suffix: '+' },
  { val: 100, label: 'Quality Assured', suffix: '%' },
  { val: 50, label: 'Happy Clients', suffix: '+' },
]

const process = [
  { icon: '📋', label: 'Design Review' },
  { icon: '📁', label: 'Gerber Upload' },
  { icon: '💰', label: 'Quotation' },
  { icon: '🏭', label: 'Manufacturing' },
  { icon: '✅', label: 'QC Testing' },
  { icon: '🚚', label: 'Delivery' },
]

const clients = ['Automotive OEM','Solar Corp','IoT Systems','Fleet Tech','EV Motors','Robotics Inc','Defense Tech','MedEquip']

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i=0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i*0.1, ease: 'easeOut' } }) }

export default function Home() {
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stat counters on scroll
      const nums = document.querySelectorAll('.stat-num')
      nums.forEach(el => {
        const target = parseInt(el.dataset.target)
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo({ val: 0 }, { val: target }, {
              duration: 1.5, ease: 'power2.out',
              onUpdate() { el.textContent = Math.round(this.targets()[0].val) }
            })
          },
          once: true
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* HERO */}
      <section className="home-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 70 }}>
        <div className="circuit-bg" />
        {/* Radial glow */}
        <div className="home-hero-glow" style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', width: 620, height: 620, background: 'var(--surface-soft)', pointerEvents: 'none' }} />

        <div className="container hero-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(14px, 4.4vw, 24px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Left */}
          <div className="hero-left">
            <motion.div className="home-hero-badge" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}
              style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'6px 14px',background:'var(--accent-surface)',border:'1px solid var(--accent-border)',borderRadius:100,marginBottom:24 }}>
              <div style={{ width:6,height:6,background:'var(--accent-green)',borderRadius:'50%',boxShadow:'0 0 8px var(--accent-green)',animation:'ledPulse 1.5s ease infinite' }} />
              <span className="home-hero-badge-text" style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:12,fontWeight:600,letterSpacing:2,color:'var(--accent-green)' }}>PRECISION ELECTRONICS MANUFACTURING</span>
            </motion.div>

            <motion.h1 className="home-hero-title" initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.35 }}
              style={{ fontFamily:'Manrope,sans-serif',fontSize:'clamp(30px,3.8vw,48px)',fontWeight:800,lineHeight:1.08,letterSpacing:'-0.015em',marginBottom:20 }}>
              Engineering<br/>
              <span style={{ color:'var(--accent-green)' }}>Tomorrow&apos;s</span><br/>
              Electronics Today
            </motion.h1>

            <motion.p className="home-hero-lead" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.5 }}
              style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:17,color:'var(--text-secondary)',lineHeight:1.7,marginBottom:32,maxWidth:480 }}>
              PCB Manufacturing · Component Assembly · Wire Harness Cable Assembly · EV Charger Adaptors (48V–60V) · BLDC Design · Battery BMS · AIS-140 GPS Solutions. Delivering world-class electronics from Puducherry, India.
            </motion.p>

            <motion.div className="home-hero-actions" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.65 }} style={{ display:'flex',gap:16,flexWrap:'wrap',marginBottom:48 }}>
              <Link to="/quote"><motion.button className="btn-primary" whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>Get a Quote →</motion.button></Link>
              <Link to="/services"><motion.button className="btn-outline" whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>Explore Services</motion.button></Link>
            </motion.div>

            {/* Stats */}
            <motion.div className="home-hero-stats" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
              style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24 }}>
              {stats.slice(0,3).map((s,i) => (
                <div key={i} style={{ borderLeft:'2px solid var(--border-color)',paddingLeft:16 }}>
                  <div style={{ fontFamily:'Manrope,sans-serif',fontSize:28,fontWeight:800,color:'var(--accent-green)',lineHeight:1 }}>
                    <span className="stat-num" data-target={s.val}>0</span>{s.suffix}
                  </div>
                  <div style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:13,color:'var(--text-secondary)',letterSpacing:0.5,marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - PCB Animation */}
          <motion.div className="hero-right" initial={{ opacity:0,x:60 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.3,duration:0.8,ease:'easeOut' }}
            style={{ display:'flex',justifyContent:'center',alignItems:'center',position:'relative',minHeight:440 }}>
            <PCBHeroAnimation />
            {/* Floating labels */}
            <motion.div className="hero-tag-left" animate={{ y:[-6,6,-6] }} transition={{ duration:3,repeat:Infinity,ease:'easeInOut' }}
              style={{ position:'absolute',top:34,left:-156,padding:'8px 14px',background:'var(--teal-surface)',border:'1px solid var(--teal-border)',borderRadius:6 }}>
              <div style={{ fontFamily:'Manrope,sans-serif',fontSize:9,color:'var(--accent-teal)',fontWeight:700 }}>SMT ASSEMBLY</div>
              <div style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:11,color:'var(--text-secondary)' }}>IPC Class 2/3</div>
            </motion.div>
            <motion.div className="hero-tag-right" animate={{ y:[6,-6,6] }} transition={{ duration:3.5,repeat:Infinity,ease:'easeInOut',delay:0.5 }}
              style={{ position:'absolute',bottom:24,right:-160,padding:'8px 14px',background:'var(--gold-surface)',border:'1px solid var(--gold-border)',borderRadius:6 }}>
              <div style={{ fontFamily:'Manrope,sans-serif',fontSize:9,color:'var(--accent-gold)',fontWeight:700 }}>QUALITY TESTED</div>
              <div style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:11,color:'var(--text-secondary)' }}>100% AOI + ICT</div>
            </motion.div>
          </motion.div>
        </div>

        <style>{`
          @media(max-width:980px){
            .home-hero{min-height:auto!important;padding:98px 0 42px!important}
            .home-hero-glow{display:none!important}
            .hero-grid{grid-template-columns:1fr!important;gap:28px!important}
            .hero-left{order:1}
            .hero-right{order:2}
            .hero-tag-left{left:8px!important;top:10px!important}
            .hero-tag-right{right:8px!important;bottom:14px!important}
            .home-why-grid{grid-template-columns:1fr!important;gap:34px!important}
            .home-why-card-shell{padding:28px!important}
            .home-process-flow{
              display:grid!important;
              grid-template-columns:repeat(3,minmax(0,1fr))!important;
              gap:20px 10px!important;
              justify-items:center!important;
            }
            .home-process-item{display:block!important}
            .home-process-connector{display:none!important}
          }
          @media(max-width:640px){
            .hero-right{min-height:320px}
            .hero-left{
              display:flex!important;
              flex-direction:column!important;
              align-items:flex-start!important;
            }
            .home-hero-badge{
              max-width:100%!important;
              margin-bottom:18px!important;
              padding:8px 12px!important;
            }
            .home-hero-badge-text{
              letter-spacing:1.4px!important;
              line-height:1.45!important;
            }
            .home-hero-title{font-size:clamp(24px,10vw,38px)!important;line-height:1.06!important}
            .home-hero-lead{font-size:15px!important;line-height:1.65!important;margin-bottom:24px!important}
            .home-hero-actions{flex-direction:column!important;gap:12px!important;margin-bottom:34px!important}
            .home-hero-actions a{width:100%}
            .home-hero-actions button{width:100%;justify-content:center}
            .home-hero-stats{gap:12px!important}
            .home-hero-stats > div{padding-left:10px!important}
            .hero-tag-left,.hero-tag-right{
              display:block!important;
              padding:6px 10px!important;
              border-radius:6px!important;
              z-index:2!important;
            }
            .hero-tag-left{left:6px!important;top:8px!important}
            .hero-tag-right{right:6px!important;bottom:8px!important}
            .hero-tag-left div:first-child,.hero-tag-right div:first-child{font-size:8px!important}
            .hero-tag-left div:last-child,.hero-tag-right div:last-child{font-size:10px!important}
            .home-services-grid{grid-template-columns:1fr!important}
            .home-why-points span{font-size:15px!important;line-height:1.45!important}
            .home-why-card-shell{padding:20px!important}
            .home-why-card-grid{grid-template-columns:1fr!important;gap:12px!important}
            .home-process-flow{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px 8px!important}
            .home-process-label{white-space:normal!important;line-height:1.35!important;font-size:12px!important}
          }
        `}</style>
      </section>

      {/* Stats Bar */}
      <section style={{ background:'var(--bg-secondary)',borderTop:'1px solid var(--border-color)',borderBottom:'1px solid var(--border-color)',padding:'40px 0' }}>
        <div className="container">
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:24,textAlign:'center' }}>
            {stats.map((s,i) => (
              <motion.div key={i} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}>
                <div style={{ fontFamily:'Manrope,sans-serif',fontSize:36,fontWeight:900,color:'var(--accent-green)',lineHeight:1 }}>
                  <span className="stat-num" data-target={s.val}>0</span>{s.suffix}
                </div>
                <div style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:14,color:'var(--text-secondary)',letterSpacing:1,marginTop:6,textTransform:'uppercase' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="circuit-bg" />
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:56 }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>What We Do</div>
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle" style={{ margin:'0 auto' }}>End-to-end electronics manufacturing and engineering solutions for every industry.</p>
          </div>
          <div className="home-services-grid" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24 }}>
            {services.map((s,i) => (
              <motion.div key={i} className="glass-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} custom={i}
                whileHover={{ y:-6,boxShadow:'0 20px 40px rgba(var(--accent-green-rgb),0.1)',borderColor:'rgba(var(--accent-green-rgb),0.4)' }}
                style={{ padding:32,cursor:'pointer' }}>
                <div style={{ fontSize:36,marginBottom:20 }}>{s.icon}</div>
                <h3 style={{ fontFamily:'Manrope,sans-serif',fontSize:15,fontWeight:700,marginBottom:12,color:'var(--text-primary)' }}>{s.title}</h3>
                <p style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:15,color:'var(--text-secondary)',lineHeight:1.6 }}>{s.desc}</p>
                <div style={{ marginTop:20,display:'flex',alignItems:'center',gap:6,color:'var(--accent-green)',fontFamily:'Source Sans 3,sans-serif',fontSize:13,fontWeight:600,letterSpacing:1 }}>
                  LEARN MORE <span>→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background:'var(--bg-secondary)' }}>
        <div className="container">
          <div className="home-why-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center' }}>
            <motion.div initial={{ opacity:0,x:-40 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <div className="section-eyebrow">Why Choose Us</div>
              <h2 className="section-title">Built on Precision,<br/>Driven by Innovation</h2>
              <p style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:16,color:'var(--text-secondary)',lineHeight:1.7,marginBottom:32 }}>
                Microtron India Technologies brings together deep engineering expertise with state-of-the-art manufacturing to deliver electronics that meet national and international standards.
              </p>
              <div className="home-why-points" style={{ display:'flex',flexDirection:'column',gap:16 }}>
                {['IPC Class 2 & 3 certified manufacturing','Full SMT, THT & mixed assembly capability','AOI + ICT + X-Ray quality inspection','Custom R&D and rapid prototyping','End-to-end from design to delivery','15+ years of industry expertise'].map((item,i) => (
                  <motion.div key={i} initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                    style={{ display:'flex',alignItems:'center',gap:12 }}>
                    <div style={{ width:22,height:22,background:'var(--accent-surface)',border:'1px solid var(--accent-border)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:12 }}>✓</div>
                    <span style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:16,color:'var(--text-secondary)' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0,x:40 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <div className="home-why-card-shell" style={{ background:'var(--bg-surface)',border:'1px solid var(--border-color)',borderRadius:16,padding:40,position:'relative',overflow:'hidden' }}>
                <div className="circuit-bg" />
                <div className="home-why-card-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,position:'relative',zIndex:1 }}>
                  {[{icon:'🏭',label:'Manufacturing',sub:'IPC Certified'},{icon:'🔬',label:'Quality Control',sub:'AOI + X-Ray'},{icon:'⚡',label:'Fast Turnaround',sub:'24-72 hr proto'},{icon:'🤝',label:'Customer First',sub:'Dedicated support'}].map((item,i) => (
                    <motion.div key={i} whileHover={{ scale:1.03 }} style={{ textAlign:'center',padding:24,background:'var(--accent-surface-soft)',border:'1px solid var(--border-color)',borderRadius:10 }}>
                      <div style={{ fontSize:32,marginBottom:8 }}>{item.icon}</div>
                      <div style={{ fontFamily:'Manrope,sans-serif',fontSize:11,fontWeight:700,color:'var(--text-primary)',marginBottom:4 }}>{item.label}</div>
                      <div style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:12,color:'var(--text-secondary)' }}>{item.sub}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="circuit-bg" />
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:56 }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>How It Works</div>
            <h2 className="section-title">Our Manufacturing Process</h2>
          </div>
          <div className="home-process-flow" style={{ display:'flex',alignItems:'flex-start',justifyContent:'center',flexWrap:'wrap',gap:0,position:'relative' }}>
            {process.map((step, i) => (
              <motion.div className="home-process-item" key={i} initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.12 }}
                style={{ display:'flex',alignItems:'center',gap:0 }}>
                <div style={{ textAlign:'center',padding:'0 8px' }}>
                  <motion.div whileHover={{ scale:1.1 }}
                    style={{ width:64,height:64,borderRadius:'50%',background:'var(--accent-surface)',border:'2px solid var(--accent-border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,margin:'0 auto 12px',boxShadow:'0 0 20px rgba(var(--accent-green-rgb),0.1)' }}>
                    {step.icon}
                  </motion.div>
                  <div className="home-process-label" style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:13,fontWeight:600,color:'var(--text-secondary)',letterSpacing:0.5,whiteSpace:'nowrap' }}>{step.label}</div>
                  <div style={{ fontFamily:'Manrope,sans-serif',fontSize:10,color:'rgba(var(--accent-green-rgb),0.4)',marginTop:2 }}>0{i+1}</div>
                </div>
                {i < process.length-1 && (
                  <div className="home-process-connector" style={{ width:40,height:2,background:'rgba(var(--accent-green-rgb),0.35)',marginBottom:32,flexShrink:0 }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Marquee */}
      <section className="section" style={{ background:'var(--bg-secondary)',overflow:'hidden' }}>
        <div className="container" style={{ textAlign:'center',marginBottom:36 }}>
          <div className="section-eyebrow" style={{ justifyContent:'center' }}>Our Clients</div>
          <h2 className="section-title">Trusted Across Industries</h2>
        </div>
        <div style={{ overflow:'hidden',padding:'10px 0' }}>
          <div className="marquee-track" style={{ display:'flex',gap:24,width:'max-content' }}>
            {[...clients,...clients].map((c,i) => (
              <div key={i} style={{ padding:'12px 28px',background:'var(--surface-strong)',border:'1px solid var(--border-color)',borderRadius:8,fontFamily:'Manrope,sans-serif',fontSize:11,fontWeight:700,color:'var(--text-muted)',letterSpacing:1,whiteSpace:'nowrap' }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 0',position:'relative',overflow:'hidden',background:'var(--bg-primary)' }}>
        <div className="circuit-bg" />
        <div style={{ position:'absolute',inset:0,background:'var(--surface-soft)',pointerEvents:'none' }} />
        <div className="container" style={{ textAlign:'center',position:'relative',zIndex:1 }}>
          <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>Get Started</div>
            <h2 style={{ fontFamily:'Manrope,sans-serif',fontSize:'clamp(28px,4vw,46px)',fontWeight:900,marginBottom:16,color:'var(--text-primary)' }}>
              Ready to Start Your<br/><span style={{ color:'var(--accent-green)' }}>PCB Project?</span>
            </h2>
            <p style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:18,color:'var(--text-secondary)',marginBottom:36,maxWidth:500,margin:'0 auto 36px' }}>
              Upload your Gerber files and get a competitive quote within 24 hours.
            </p>
            <Link to="/quote">
              <motion.button className="btn-primary" whileHover={{ scale:1.05,boxShadow:'0 0 50px rgba(var(--accent-green-rgb),0.5)' }} whileTap={{ scale:0.97 }}
                style={{ fontSize:15,padding:'16px 40px' }}>
                Request a Quote Now →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

