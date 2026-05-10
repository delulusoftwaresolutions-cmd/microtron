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

const ProductArtwork = ({ product }) => {
  const frame = (content) => (
    <svg viewBox="0 0 176 108" width="166" height="102" style={{ display:'block' }}>
      <rect x="8" y="8" width="160" height="92" rx="7" fill="#0a2a24" stroke="#155b45" strokeWidth="1.2"/>
      <rect x="14" y="14" width="148" height="80" rx="5" fill="#063128" opacity="0.9"/>
      {content}
    </svg>
  )

  switch (product.name) {
    case 'Single Layer PCB':
      return frame(
        <>
          <rect x="40" y="34" width="44" height="28" rx="2" fill="#11182e" stroke="#2f3c68"/>
          <path d="M84 48 H122 V30" stroke="#f3a81d" strokeWidth="2" fill="none"/>
          <path d="M50 64 H122" stroke="#00f7a1" strokeWidth="1.6" fill="none"/>
          <circle cx="122" cy="30" r="4" fill="#0f2038" stroke="#f3a81d"/>
        </>
      )
    case 'Double Layer PCB':
      return frame(
        <>
          <rect x="34" y="28" width="86" height="10" rx="2" fill="#14543d"/>
          <rect x="34" y="44" width="86" height="10" rx="2" fill="#0c3f30"/>
          <rect x="54" y="66" width="40" height="18" rx="2" fill="#11182e" stroke="#2f3c68"/>
          <path d="M94 74 H130 V54" stroke="#f3a81d" strokeWidth="2" fill="none"/>
          <circle cx="130" cy="54" r="3" fill="#0f2038" stroke="#f3a81d"/>
        </>
      )
    case '4-Layer PCB':
      return frame(
        <>
          {[28,38,48,58].map((y,i) => <rect key={i} x="28" y={y} width="96" height="5" rx="1.5" fill={i%2===0?'#19664b':'#104d3a'}/>)}
          <line x1="52" y1="28" x2="52" y2="64" stroke="#8fcdb7" strokeWidth="2"/>
          <line x1="98" y1="28" x2="98" y2="64" stroke="#8fcdb7" strokeWidth="2"/>
          <rect x="130" y="34" width="20" height="16" rx="2" fill="#11182e" stroke="#2f3c68"/>
          <circle cx="146" cy="70" r="7" fill="none" stroke="#00f7a1" strokeWidth="2"/>
        </>
      )
    case '6-Layer PCB':
      return frame(
        <>
          {[24,32,40,48,56,64].map((y,i) => <rect key={i} x="24" y={y} width="104" height="4" rx="1.2" fill={i%2===0?'#1b6f50':'#11533d'}/>)}
          <rect x="46" y="76" width="56" height="12" rx="2" fill="#11182e" stroke="#2f3c68"/>
          <line x1="102" y1="82" x2="142" y2="82" stroke="#00f7a1" strokeWidth="1.8"/>
          <circle cx="144" cy="82" r="3.5" fill="#0f2038" stroke="#00f7a1"/>
        </>
      )
    case 'Multilayer PCB':
      return frame(
        <>
          {[22,28,34,40,46,52,58,64,70].map((y,i) => <rect key={i} x="22" y={y} width="110" height="3.2" rx="1" fill={i%2===0?'#1c7454':'#126246'}/>)}
          <line x1="52" y1="22" x2="52" y2="74" stroke="#aad7c8" strokeWidth="1.6"/>
          <line x1="84" y1="22" x2="84" y2="74" stroke="#aad7c8" strokeWidth="1.6"/>
          <line x1="116" y1="22" x2="116" y2="74" stroke="#aad7c8" strokeWidth="1.6"/>
          <rect x="136" y="34" width="20" height="26" rx="2" fill="#11182e" stroke="#2f3c68"/>
        </>
      )
    case 'SMT Assembly':
      return frame(
        <>
          <rect x="42" y="24" width="92" height="56" rx="3" fill="#12192f" stroke="#2d3a61"/>
          {[0,1,2,3,4].map((i) => <rect key={`l-${i}`} x="34" y={30+i*10} width="8" height="4" fill="#b6c0ce" rx="1"/>)}
          {[0,1,2,3,4].map((i) => <rect key={`r-${i}`} x="134" y={30+i*10} width="8" height="4" fill="#b6c0ce" rx="1"/>)}
          <circle cx="88" cy="52" r="9" fill="none" stroke="#00f7a1" strokeWidth="1.8"/>
          <path d="M88 18 V30" stroke="#f3a81d" strokeWidth="2"/>
          <rect x="82" y="14" width="12" height="4" fill="#f3a81d" rx="1"/>
        </>
      )
    case 'THT Assembly':
      return frame(
        <>
          <rect x="32" y="22" width="112" height="62" rx="3" fill="#0f3a2d" stroke="#1e6a50"/>
          {[48,66,84,102,120].map((x,i) => <circle key={i} cx={x} cy="54" r="4" fill="#12213a" stroke="#f3a81d" strokeWidth="1.2"/>)}
          {[48,66,84,102,120].map((x,i) => <line key={i} x1={x} y1="50" x2={x} y2="28" stroke="#c3ccd8" strokeWidth="2"/>)}
          <path d="M28 66 H148" stroke="#00f7a1" strokeWidth="1.4"/>
        </>
      )
    case 'Mixed Assembly':
      return frame(
        <>
          <rect x="26" y="22" width="64" height="62" rx="3" fill="#11182e" stroke="#2d3a61"/>
          {[0,1,2,3].map((i) => <rect key={i} x="18" y={30+i*12} width="8" height="4" fill="#b6c0ce" rx="1"/>)}
          {[0,1,2,3].map((i) => <rect key={i} x="90" y={30+i*12} width="8" height="4" fill="#b6c0ce" rx="1"/>)}
          {[112,126,140].map((x,i) => <circle key={i} cx={x} cy="54" r="4" fill="#12213a" stroke="#f3a81d" strokeWidth="1.2"/>)}
          {[112,126,140].map((x,i) => <line key={i} x1={x} y1="50" x2={x} y2="30" stroke="#c3ccd8" strokeWidth="2"/>)}
          <path d="M96 64 H150" stroke="#00f7a1" strokeWidth="1.5"/>
        </>
      )
    case 'Custom Wire Harness':
      return frame(
        <>
          <rect x="24" y="70" width="24" height="14" rx="2" fill="#101833" stroke="#2d3a61"/>
          <rect x="128" y="22" width="24" height="14" rx="2" fill="#101833" stroke="#2d3a61"/>
          <path d="M48 76 C72 76 86 58 106 58 C122 58 130 44 128 28" stroke="#ffaf20" strokeWidth="2.3" fill="none"/>
          <path d="M48 80 C72 80 86 64 106 64 C122 64 132 52 130 32" stroke="#00f7a1" strokeWidth="2.3" fill="none"/>
          <path d="M48 72 C72 72 86 52 106 52 C122 52 128 38 126 24" stroke="#30d9ff" strokeWidth="2.3" fill="none"/>
          <circle cx="96" cy="60" r="5.5" fill="none" stroke="#00f7a1"/>
        </>
      )
    case 'AIS-140 GPS Tracker':
      return frame(
        <>
          <rect x="58" y="42" width="60" height="30" rx="4" fill="#11182e" stroke="#2d3a61"/>
          <circle cx="86" cy="56" r="5.5" fill="none" stroke="#00f7a1" strokeWidth="1.3"/>
          <path d="M118 58 H138" stroke="#30d9ff" strokeWidth="2"/>
          <path d="M88 36 Q104 18 122 36" stroke="#f3a81d" strokeWidth="1.8" fill="none"/>
          <path d="M82 30 Q104 8 128 30" stroke="#f3a81d" strokeWidth="1.2" fill="none" opacity="0.75"/>
          <path d="M80 78 Q104 96 128 78" stroke="#00f7a1" strokeWidth="1.6" fill="none"/>
        </>
      )
    case 'BLDC Motor System':
      return frame(
        <>
          <circle cx="88" cy="54" r="26" fill="#101833" stroke="#2f3c68" strokeWidth="1.5"/>
          <circle cx="88" cy="54" r="17" fill="#0f3a2d" stroke="#00f7a1" strokeWidth="1.2"/>
          <circle cx="88" cy="54" r="7" fill="#30d9ff"/>
          {[0,1,2,3,4,5].map((i) => {
            const angle = (Math.PI * 2 * i) / 6
            const x1 = 88 + Math.cos(angle) * 26
            const y1 = 54 + Math.sin(angle) * 26
            const x2 = 88 + Math.cos(angle) * 34
            const y2 = 54 + Math.sin(angle) * 34
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f3a81d" strokeWidth="2"/>
          })}
        </>
      )
    case 'LiFePO₄ BMS':
      return frame(
        <>
          <rect x="36" y="30" width="22" height="44" rx="2" fill="#0f2132" stroke="#2d3a61"/>
          <rect x="62" y="30" width="22" height="44" rx="2" fill="#0f2132" stroke="#2d3a61"/>
          <rect x="88" y="30" width="22" height="44" rx="2" fill="#0f2132" stroke="#2d3a61"/>
          <rect x="114" y="30" width="22" height="44" rx="2" fill="#0f2132" stroke="#2d3a61"/>
          <rect x="70" y="46" width="30" height="20" rx="2" fill="#11182e" stroke="#00f7a1"/>
          <path d="M56 52 H70 M100 52 H114 M84 30 V24 M84 74 V80" stroke="#f3a81d" strokeWidth="1.6"/>
          <circle cx="84" cy="56" r="4.5" fill="#00f7a1"/>
        </>
      )
    default:
      return frame(<circle cx="88" cy="54" r="18" fill="none" stroke="#00f7a1" strokeWidth="2"/>)
  }
}

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
                  <div style={{ display:'flex',justifyContent:'center',marginBottom:20,marginTop:2 }}>
                    <ProductArtwork product={p} />
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
