import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    icon: '🏭', color: '#00FF88',
    title: 'Electronics Manufacturing Services (EMS)',
    short: 'Full-scale PCB assembly for automotive, industrial & IoT applications.',
    desc: 'Our EMS division delivers high-quality PCB assembly for automotive, industrial, and IoT applications. We support SMT, THT, mixed assembly, and wire harness cable assembly processes compliant with IPC-A-610 Class 2 and Class 3 standards. Our automated SMT lines feature high-speed pick-and-place machines, nitrogen reflow ovens, and 3D SPI/AOI systems for zero-defect manufacturing.',
    highlights: ['SMT, THT & Mixed Assembly','Wire Harness Cable Assembly','IPC Class 2 & 3 Standards','AOI + X-Ray + ICT Testing','Turnkey & Consignment','NPI & Volume Production'],
  },
  {
    icon: '🔌', color: '#D4860A',
    title: 'Wire Harness Manufacturing',
    short: 'Custom wire harnesses engineered for automotive and industrial durability.',
    desc: 'We design and manufacture custom wire harnesses for automotive, industrial, and aerospace applications. Each harness is precision-engineered using automotive-grade wires, high-quality connectors, and strain relief mechanisms. We support complex multi-branch assemblies with full electrical testing and pull-strength validation.',
    highlights: ['Automotive-grade Materials','Custom Connector Assemblies','Strain Relief & Protection','Electrical Continuity Testing','Batch & Mass Production'],
  },
  {
    icon: '⚡', color: '#00D4FF',
    title: 'BLDC Motor Design & Manufacturing',
    short: 'Energy-efficient BLDC motor solutions with custom firmware-optimized controllers.',
    desc: 'Our BLDC division develops compact, high-efficiency brushless DC motors ranging from 0.5kW to 10kW with custom winding designs and embedded controllers. We design the complete motor-drive ecosystem including hardware design, PCB layout, and firmware development optimized for maximum efficiency and longevity.',
    highlights: ['0.5kW to 10kW Range','Custom Winding Design','Embedded FOC Controllers','Hall & Sensorless Options','EV & Industrial Grade'],
  },
  {
    icon: '🔋', color: '#00FF88',
    title: 'Battery BMS Design',
    short: 'Advanced BMS for LiFePO₄ packs — safety and performance for EV and solar.',
    desc: 'We design and manufacture advanced Battery Management Systems for LiFePO₄ and Li-ion packs. Our BMS solutions support 8S to 32S configurations with active cell balancing, CAN Bus communication, state-of-charge estimation, thermal management, and protection against overcharge, overdischarge, and short circuits.',
    highlights: ['8S to 32S Configuration','Active Cell Balancing','CAN Bus / RS-485 Comm','IP67 Rated Enclosures','SoC & SoH Estimation'],
  },
  {
    icon: '🔌', color: '#00D4FF',
    title: 'EV Charger Adaptors (48V–60V)',
    short: 'Adaptor-type EV chargers for 48V to 60V battery systems.',
    desc: 'We provide adaptor-type EV chargers designed for 48V to 60V EV battery packs used in electric scooters, e-rickshaws, and light electric vehicles. The charger designs focus on safe charging curves, thermal reliability, and stable long-cycle performance.',
    highlights: ['48V to 60V Charging Range','Adaptor-type Form Factor','Thermal & Safety Protection','CC/CV Charging Profile','EV-ready Connectors'],
  },
  {
    icon: '📡', color: '#D4860A',
    title: 'AIS-140 GPS Tracking Solutions',
    short: 'Government-certified GPS trackers with real-time fleet monitoring.',
    desc: 'Microtron designs and manufactures AIS-140 certified GPS tracking devices for commercial vehicles, fleet management, and public safety compliance. Our devices feature 4G LTE connectivity, emergency SOS with voice calls, panic button, tamper alerts, and a cloud-based fleet management portal.',
    highlights: ['AIS-140 Government Certified','4G LTE Real-Time Tracking','Emergency SOS & Panic Button','Tamper & Ignition Alerts','Cloud Fleet Management Portal'],
  },
  {
    icon: '🤖', color: '#00D4FF',
    title: 'Industrial Automation & Robotics',
    short: 'MIG welding robots and production line automation for precision and safety.',
    desc: 'We design and integrate industrial automation solutions including robotic welding cells, conveyor automation, PLC-controlled assembly lines, and vision systems. Our MIG welding robots deliver consistent weld quality, reducing human error and improving throughput by up to 3x compared to manual operations.',
    highlights: ['MIG Robotic Welding Cells','PLC & HMI Systems','Vision-Guided Automation','Conveyor & Handling Systems','Safety Guarding & Interlocks'],
  },
  {
    icon: '🔬', color: '#00FF88',
    title: 'R&D and Prototyping',
    short: 'Rapid prototyping and product development from concept to production.',
    desc: 'Our R&D team provides rapid prototyping, design verification, and proof-of-concept development. We work alongside clients from initial circuit schematics through PCB layout, firmware development, mechanical enclosure design, EMC pre-compliance testing, and final design-for-manufacturing (DFM) review before handing off to full production.',
    highlights: ['Schematic & PCB Design','Firmware Development','DFM & DFT Review','EMC Pre-Compliance','Prototype to Production'],
  },
  {
    icon: '📦', color: '#D4860A',
    title: 'Electronics Component Supply Chain',
    short: 'End-to-end supply of genuine, traceable components for OEMs and EMS.',
    desc: 'We manage end-to-end electronics component sourcing and supply chain services, offering genuine, fully-traceable components from authorized distributors. Our supply chain team handles BOM analysis, alternative component qualification, lead-time management, and kitting services to keep your production lines running without interruption.',
    highlights: ['Authorized Distributor Network','BOM Analysis & Optimization','Alternative Component Qual.','Kitting & Consignment','Counterfeit Prevention'],
  },
]

export default function Services() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
      {/* Hero */}
      <div className="page-hero" style={{ background:'var(--bg-primary)' }}>
        <div className="circuit-bg" />
        <div style={{ position:'absolute',inset:0,background:'var(--surface-soft)' }} />
        <div className="container" style={{ position:'relative',zIndex:1 }}>
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}>
            <div className="section-eyebrow">Services</div>
            <h1 className="section-title" style={{ fontSize:'clamp(24px,3.6vw,42px)' }}>What We Offer</h1>
            <p className="section-subtitle">Comprehensive electronics engineering and manufacturing solutions for every stage of your product lifecycle.</p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="circuit-bg" />
        <div className="container">
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            {services.map((svc, i) => (
              <motion.div key={i} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.06 }}>
                <motion.div
                  whileHover={{ borderColor:`${svc.color}44` }}
                  style={{ background:'var(--surface-strong)',border:'1px solid var(--border-color)',borderRadius:12,overflow:'hidden',transition:'border-color 0.3s' }}>
                  {/* Header */}
                  <button className="service-header-btn" onClick={() => setOpenIdx(openIdx===i ? null : i)}
                    style={{ width:'100%',padding:'24px 28px',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:20,textAlign:'left' }}>
                    <div style={{ width:52,height:52,borderRadius:10,background:`${svc.color}15`,border:`1px solid ${svc.color}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0 }}>
                      {svc.icon}
                    </div>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontFamily:'Manrope,sans-serif',fontSize:14,fontWeight:700,color:'var(--text-primary)',marginBottom:4 }}>{svc.title}</div>
                      <div style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:14,color:'var(--text-secondary)' }}>{svc.short}</div>
                    </div>
                    <motion.div animate={{ rotate: openIdx===i ? 45 : 0 }} transition={{ duration:0.2 }}
                      style={{ width:32,height:32,borderRadius:'50%',border:`1px solid ${svc.color}44`,display:'flex',alignItems:'center',justifyContent:'center',color:svc.color,fontSize:18,flexShrink:0 }}>
                      +
                    </motion.div>
                  </button>

                  {/* Expanded */}
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div initial={{ height:0,opacity:0 }} animate={{ height:'auto',opacity:1 }} exit={{ height:0,opacity:0 }} transition={{ duration:0.35,ease:'easeInOut' }}
                        style={{ overflow:'hidden' }}>
                        <div className="service-expanded-inner" style={{ padding:'0 28px 28px',borderTop:`1px solid ${svc.color}22`,paddingTop:24 }}>
                          <div className="service-expand-grid" style={{ display:'grid',gridTemplateColumns:'1fr auto',gap:32,alignItems:'flex-start' }}>
                            <div>
                              <p style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:16,color:'var(--text-secondary)',lineHeight:1.8,marginBottom:20 }}>{svc.desc}</p>
                            </div>
                            <div className="service-cap-col" style={{ minWidth:220 }}>
                              <div style={{ fontFamily:'Manrope,sans-serif',fontSize:10,fontWeight:700,letterSpacing:2,color:svc.color,marginBottom:14,textTransform:'uppercase' }}>Capabilities</div>
                              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                                {svc.highlights.map((h,j) => (
                                  <motion.div key={j} initial={{ opacity:0,x:10 }} animate={{ opacity:1,x:0 }} transition={{ delay:j*0.05 }}
                                    style={{ display:'flex',alignItems:'center',gap:8 }}>
                                    <div style={{ width:6,height:6,borderRadius:'50%',background:svc.color,boxShadow:`0 0 6px ${svc.color}`,flexShrink:0 }} />
                                    <span style={{ fontFamily:'Source Sans 3,sans-serif',fontSize:13,color:'var(--text-secondary)' }}>{h}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:980px){
          .service-header-btn{
            padding:18px 16px!important;
            gap:12px!important;
            align-items:flex-start!important;
          }
          .service-expanded-inner{
            padding:0 16px 18px!important;
            padding-top:16px!important;
          }
          .service-expand-grid{
            grid-template-columns:1fr!important;
            gap:16px!important;
          }
          .service-cap-col{min-width:0!important}
        }
      `}</style>
    </motion.div>
  )
}





