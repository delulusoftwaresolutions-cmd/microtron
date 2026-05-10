import { motion } from 'framer-motion'

const sectors = [
  { icon: '🚗', label: 'Automotive' },
  { icon: '🏭', label: 'Industrial' },
  { icon: '📶', label: 'IoT & Connectivity' },
  { icon: '☀️', label: 'Renewable Energy' },
  { icon: '📱', label: 'Consumer Electronics' },
  { icon: '🚌', label: 'Fleet Management' },
  { icon: '🛡️', label: 'Defense & Safety' },
  { icon: '⚕️', label: 'Medical Devices' },
]

const clientNames = [
  'Automotive OEM','Solar Corp India','FleetTrack Systems','IoT Innovations',
  'EV Motors Ltd','Industrial Robotics','Defense Systems','MedEquip India',
  'Power Electronics','SmartGrid Tech','ConnectAuto','EnergyTech Solutions',
  'PrecisionMech','DataSense IoT','VehicleTrack','BatteryTech EV',
]

const caseStudies = [
  {
    icon: '🚌',
    industry: 'Fleet Management',
    title: 'AIS-140 GPS Rollout for State Transport',
    desc: 'Designed and manufactured 2,000+ AIS-140 certified GPS devices for a state transport corporation, enabling real-time tracking, emergency SOS, and compliance with government mandates.',
    metrics: ['2,000+ Devices Deployed','99.8% Uptime','100% AIS-140 Certified'],
    color: '#00FF88',
  },
  {
    icon: '⚡',
    industry: 'EV / Automotive',
    title: 'BLDC Motor System for Electric Two-Wheeler',
    desc: 'Developed a complete BLDC motor and BMS solution for an electric two-wheeler startup, from initial PCB design through firmware, testing, and volume production of 500 units.',
    metrics: ['500 Units Produced','92% Motor Efficiency','3-Month Delivery'],
    color: '#D4860A',
  },
  {
    icon: '🔲',
    industry: 'Industrial IoT',
    title: 'Multilayer PCB Assembly for Smart Sensors',
    desc: 'Provided full turnkey EMS for a 6-layer PCB-based industrial IoT sensor platform, handling component sourcing, SMT assembly, AOI inspection, and functional testing.',
    metrics: ['10,000+ PCBs/Month','<50 PPM Defect Rate','ISO 9001 Compliant'],
    color: '#00D4FF',
  },
]

const row1 = clientNames.slice(0,8)
const row2 = clientNames.slice(8)

export default function Clients() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
      {/* Hero */}
      <div className="page-hero" style={{ background:'linear-gradient(135deg,#0A0E1A,#0d1a2a)' }}>
        <div className="circuit-bg" />
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(0,255,136,0.07) 0%,transparent 60%)' }} />
        <div className="container" style={{ position:'relative',zIndex:1,textAlign:'center' }}>
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>Our Clients</div>
            <h1 className="section-title" style={{ fontSize:'clamp(32px,5vw,60px)' }}>Trusted by Industry Leaders</h1>
            <p className="section-subtitle" style={{ margin:'0 auto' }}>Building long-term partnerships across automotive, industrial, IoT, and energy sectors.</p>
          </motion.div>
        </div>
      </div>

      {/* Marquees */}
      <section style={{ padding:'60px 0',overflow:'hidden',background:'#070B15',borderTop:'1px solid #1e2d47' }}>
        <div style={{ marginBottom:16,overflow:'hidden' }}>
          <div className="marquee-track" style={{ display:'flex',gap:16,width:'max-content' }}>
            {[...row1,...row1].map((c,i) => (
              <motion.div key={i} whileHover={{ borderColor:'#00FF88',color:'#00FF88' }}
                style={{ padding:'14px 28px',background:'rgba(17,24,39,0.8)',border:'1px solid #1e2d47',borderRadius:8,fontFamily:'Orbitron,monospace',fontSize:11,fontWeight:700,color:'#4a5568',letterSpacing:1,whiteSpace:'nowrap',transition:'all 0.3s',cursor:'default' }}>
                {c}
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ overflow:'hidden' }}>
          <div className="marquee-track-reverse" style={{ display:'flex',gap:16,width:'max-content' }}>
            {[...row2,...row2].map((c,i) => (
              <motion.div key={i} whileHover={{ borderColor:'#00D4FF',color:'#00D4FF' }}
                style={{ padding:'14px 28px',background:'rgba(17,24,39,0.8)',border:'1px solid #1e2d47',borderRadius:8,fontFamily:'Orbitron,monospace',fontSize:11,fontWeight:700,color:'#4a5568',letterSpacing:1,whiteSpace:'nowrap',transition:'all 0.3s',cursor:'default' }}>
                {c}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section">
        <div className="circuit-bg" />
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>Industries Served</div>
            <h2 className="section-title">Sectors We Power</h2>
          </div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:14,justifyContent:'center' }}>
            {sectors.map((s,i) => (
              <motion.div key={i} initial={{ opacity:0,scale:0.9 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
                whileHover={{ borderColor:'#00D4FF',color:'#00D4FF',y:-3 }}
                className="sector-badge">
                <span style={{ fontSize:18 }}>{s.icon}</span>
                <span style={{ fontWeight:700,letterSpacing:1 }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section" style={{ background:'#070B15' }}>
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>Case Studies</div>
            <h2 className="section-title">Real Projects. Real Results.</h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24 }}>
            {caseStudies.map((cs,i) => (
              <motion.div key={i} initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                whileHover={{ y:-6,boxShadow:`0 20px 40px ${cs.color}18` }}
                style={{ padding:32,background:'rgba(17,24,39,0.8)',border:`1px solid ${cs.color}22`,borderRadius:12,transition:'all 0.3s' }}>
                <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20 }}>
                  <div style={{ fontSize:32 }}>{cs.icon}</div>
                  <span className="chip" style={{ background:`${cs.color}15`,borderColor:`${cs.color}33`,color:cs.color }}>{cs.industry}</span>
                </div>
                <h3 style={{ fontFamily:'Orbitron,monospace',fontSize:14,fontWeight:700,color:'#F0F4FF',marginBottom:12,lineHeight:1.4 }}>{cs.title}</h3>
                <p style={{ fontFamily:'Rajdhani,sans-serif',fontSize:14,color:'#8899BB',lineHeight:1.7,marginBottom:20 }}>{cs.desc}</p>
                <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                  {cs.metrics.map((m,j) => (
                    <div key={j} style={{ display:'flex',alignItems:'center',gap:8 }}>
                      <div style={{ width:6,height:6,borderRadius:'50%',background:cs.color,boxShadow:`0 0 6px ${cs.color}`,flexShrink:0 }} />
                      <span style={{ fontFamily:'Rajdhani,sans-serif',fontSize:14,fontWeight:600,color:cs.color }}>{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'70px 0',background:'linear-gradient(135deg,#0A0E1A,#0d1a2a)',position:'relative' }}>
        <div className="circuit-bg" />
        <div className="container" style={{ textAlign:'center',position:'relative',zIndex:1 }}>
          <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
            <h2 style={{ fontFamily:'Orbitron,monospace',fontSize:'clamp(24px,3vw,40px)',fontWeight:800,marginBottom:16 }}>
              Become Our Next <span style={{ color:'#00FF88' }}>Success Story</span>
            </h2>
            <p style={{ fontFamily:'Rajdhani,sans-serif',fontSize:16,color:'#8899BB',marginBottom:32 }}>Let's discuss your project and see how Microtron can deliver results.</p>
            <div style={{ display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap' }}>
              <a href="/contact"><motion.button whileHover={{ scale:1.05 }} className="btn-primary">Contact Us →</motion.button></a>
              <a href="/quote"><motion.button whileHover={{ scale:1.05 }} className="btn-outline">Get a Quote</motion.button></a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
