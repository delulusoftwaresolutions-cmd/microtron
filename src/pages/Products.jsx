import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['All','PCB','Assembly','Wire Harness','GPS Devices','BLDC & BMS']

const products = [
  { cat:'PCB', name:'Single Layer PCB', specs:['1 Layer','FR4 Material','1oz Copper','HASL Finish'], desc:'Cost-effective single layer boards for simple circuits and high-volume production.', icon:'🔲' },
  { cat:'PCB', name:'Double Layer PCB', specs:['2 Layers','FR4 Material','1oz Copper','ENIG/HASL'], desc:'Versatile two-layer boards with plated-through holes for moderate complexity designs.', icon:'📋' },
  { cat:'PCB', name:'4-Layer PCB', specs:['4 Layers','FR4/Rogers','Signal+Power+GND','ENIG Finish'], desc:'Four-layer stackup ideal for mixed-signal and power electronics applications.', icon:'📦' },
  { cat:'PCB', name:'6-Layer PCB', specs:['6 Layers','High-Tg FR4','Controlled Impedance','ENIG'], desc:'Complex multilayer boards with controlled impedance for high-frequency applications.', icon:'🗂️' },
  { cat:'PCB', name:'Multilayer PCB', specs:['8–20 Layers','High-Speed Material','Blind/Buried Vias','HDI'], desc:'High-density interconnect boards for advanced computing and telecommunications.', icon:'🔲' },
  { cat:'Assembly', name:'SMT Assembly', specs:['0402 & above','BGA/QFN Support','AOI Inspection','IPC-A-610'], desc:'Surface mount technology assembly with automated pick-and-place and reflow soldering.', icon:'⚙️' },
  { cat:'Assembly', name:'THT Assembly', specs:['Through-Hole','Wave Soldering','Manual Soldering','IPC Certified'], desc:'Traditional through-hole assembly for power components and connectors.', icon:'🔧' },
  { cat:'Assembly', name:'Mixed Assembly', specs:['SMT + THT','Full Turnkey','Components Sourcing','Testing'], desc:'Combined SMT and THT assembly for complex boards requiring both technologies.', icon:'🔨' },
  { cat:'Wire Harness', name:'Custom Wire Harness', specs:['Auto Grade Wire','Custom Connectors','Strain Relief','Pull Test'], desc:'Precision-engineered wire harnesses for automotive, industrial and aerospace applications.', icon:'🔌' },
  { cat:'GPS Devices', name:'AIS-140 GPS Tracker', specs:['AIS-140 Certified','4G LTE','Emergency SOS','Tamper Alert'], desc:'Government-certified GPS tracking device with real-time monitoring for fleet management.', icon:'📡' },
  { cat:'BLDC & BMS', name:'BLDC Motor System', specs:['0.5kW–10kW','Custom Windings','Controller Included','High Efficiency'], desc:'Energy-efficient BLDC motors with custom firmware-optimized controllers for EV and industrial use.', icon:'⚡' },
  { cat:'BLDC & BMS', name:'LiFePO₄ BMS', specs:['8S–32S Support','Active Balancing','CAN Bus','IP67 Rated'], desc:'Advanced Battery Management Systems ensuring safety and longevity of lithium battery packs.', icon:'🔋' },
]

const PCBIcon = ({ type }) => (
  <svg viewBox="0 0 120 80" width="120" height="80" style={{ opacity:0.6 }}>
    <rect x="5" y="5" width="110" height="70" rx="4" fill="#0d2a1a" stroke="#1a4a2a" strokeWidth="1.5"/>
    {type==='PCB' && <>
      <rect x="20" y="20" width="30" height="20" rx="1" fill="#1a1a2e" stroke="#334"/>
      <rect x="60" y="15" width="20" height="12" rx="1" fill="#2a1a0a" stroke="#D4860A" strokeWidth="0.5"/>
      <circle cx="75" cy="55" r="5" fill="#0a2a0a" stroke="#00FF88" strokeWidth="0.5"/>
      <path d="M35 30 L60 30 L60 20" stroke="#D4860A" strokeWidth="1" fill="none"/>
      <path d="M40 40 L40 60 L80 60" stroke="#00FF88" strokeWidth="0.8" fill="none"/>
    </>}
    {type==='Assembly' && <>
      <rect x="25" y="15" width="70" height="50" rx="2" fill="#111" stroke="#333"/>
      {[0.25,0.5,0.75].map((t,i) => <rect key={i} x="15" y={15+50*t-3} width="12" height="5" fill="#aaa" rx="1"/>)}
      {[0.25,0.5,0.75].map((t,i) => <rect key={i} x="93" y={15+50*t-3} width="12" height="5" fill="#aaa" rx="1"/>)}
      <circle cx="60" cy="40" r="8" fill="none" stroke="#00FF88" strokeWidth="1"/>
    </>}
    {!'PCBAssembly'.includes(type) && <>
      <path d="M20 40 Q60 20 100 40" stroke="#D4860A" strokeWidth="1.5" fill="none"/>
      <path d="M20 50 Q60 70 100 50" stroke="#00FF88" strokeWidth="1" fill="none"/>
      <circle cx="60" cy="40" r="6" fill="#00FF88" opacity="0.5"/>
    </>}
  </svg>
)

export default function Products() {
  const [active, setActive] = useState('All')

  const filtered = active==='All' ? products : products.filter(p=>p.cat===active)

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
      {/* Hero */}
      <div className="page-hero" style={{ background:'linear-gradient(135deg,#0A0E1A,#0d1a2a)' }}>
        <div className="circuit-bg" />
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 60% 50%,rgba(0,212,255,0.06) 0%,transparent 60%)' }} />
        <div className="container" style={{ position:'relative',zIndex:1 }}>
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}>
            <div className="section-eyebrow">Products</div>
            <h1 className="section-title" style={{ fontSize:'clamp(32px,5vw,60px)' }}>Our Product Range</h1>
            <p className="section-subtitle">From single-layer PCBs to complex multilayer assemblies, GPS devices to BLDC motors.</p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="circuit-bg" />
        <div className="container">
          {/* Filters */}
          <div style={{ display:'flex',gap:10,flexWrap:'wrap',marginBottom:40 }}>
            {categories.map(cat => (
              <motion.button key={cat} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                className={`filter-tab ${active===cat?'active':''}`} onClick={() => setActive(cat)}>
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:24 }}>
            <AnimatePresence>
              {filtered.map((p,i) => (
                <motion.div key={p.name} layout initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }} exit={{ opacity:0,scale:0.9 }} transition={{ duration:0.3,delay:i*0.05 }}
                  whileHover={{ y:-6,boxShadow:'0 20px 40px rgba(0,255,136,0.12)',borderColor:'rgba(0,255,136,0.4)' }}
                  className="glass-card" style={{ padding:28,cursor:'pointer',overflow:'hidden',position:'relative' }}>
                  <div style={{ display:'flex',justifyContent:'center',marginBottom:20 }}>
                    <PCBIcon type={p.cat} />
                  </div>
                  <div className="chip" style={{ marginBottom:12 }}>{p.cat}</div>
                  <h3 style={{ fontFamily:'Orbitron,monospace',fontSize:14,fontWeight:700,color:'#F0F4FF',marginBottom:10 }}>{p.name}</h3>
                  <p style={{ fontFamily:'Rajdhani,sans-serif',fontSize:14,color:'#8899BB',lineHeight:1.5,marginBottom:16 }}>{p.desc}</p>
                  <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:20 }}>
                    {p.specs.map((s,j) => (
                      <span key={j} style={{ padding:'3px 10px',background:'rgba(0,212,255,0.08)',border:'1px solid rgba(0,212,255,0.2)',borderRadius:4,fontSize:11,fontFamily:'Rajdhani,sans-serif',fontWeight:600,color:'#00D4FF',letterSpacing:0.5 }}>{s}</span>
                    ))}
                  </div>
                  <motion.button whileHover={{ scale:1.03 }} style={{ width:'100%',padding:'10px 0',background:'rgba(0,255,136,0.08)',border:'1px solid rgba(0,255,136,0.3)',borderRadius:6,color:'#00FF88',fontFamily:'Orbitron,monospace',fontSize:11,fontWeight:700,cursor:'pointer',letterSpacing:1 }}>
                    VIEW DETAILS
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
