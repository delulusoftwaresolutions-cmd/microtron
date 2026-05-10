import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'

const steps = ['PCB Specs','Assembly','Gerber Upload','Contact','Confirm']

const LAYERS = ['1','2','4','6','8','10+']
const THICKNESS = ['0.8mm','1.0mm','1.6mm','2.0mm']
const SURFACE = ['HASL','ENIG','OSP','Immersion Silver']
const SOLDERMASK = [
  { color:'#1a6a2a',label:'Green' },{ color:'#8B0000',label:'Red' },
  { color:'#00008B',label:'Blue' },{ color:'#111',label:'Black' },
  { color:'#eee',label:'White' },{ color:'#ccaa00',label:'Yellow' },
]
const SILKSCREEN = [{ color:'#fff',label:'White' },{ color:'#111',label:'Black' }]
const ASSEMBLY_TYPE = ['SMT','THT','Mixed']
const SUPPLY = ['Customer Supplied','Microtron Sourced','Mixed']
const QTY_PRESETS = [10,50,100,500,1000]

function ProgressBar({ step }) {
  const pct = ((step) / (steps.length - 1)) * 100
  return (
    <div style={{ marginBottom:40 }}>
      <div style={{ display:'flex',justifyContent:'space-between',marginBottom:12 }}>
        {steps.map((s,i) => (
          <div key={i} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4,flex:1 }}>
            <motion.div animate={{ background: i<=step ? '#00FF88' : '#1e2d47', borderColor: i<=step ? '#00FF88' : '#1e2d47', boxShadow: i===step ? '0 0 14px #00FF88' : 'none' }}
              style={{ width:28,height:28,borderRadius:'50%',border:'2px solid #1e2d47',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Orbitron,monospace',fontSize:10,fontWeight:700,color: i<=step ? '#000' : '#4a5568',transition:'all 0.4s' }}>
              {i < step ? '✓' : i+1}
            </motion.div>
            <span style={{ fontFamily:'Rajdhani,sans-serif',fontSize:11,color: i===step ? '#00FF88' : '#4a5568',fontWeight:600,letterSpacing:0.5,textAlign:'center',display:'none' }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ height:3,background:'#1e2d47',borderRadius:2,overflow:'hidden' }}>
        <motion.div animate={{ width:`${pct}%` }} transition={{ duration:0.5,ease:'easeInOut' }} style={{ height:'100%',background:'linear-gradient(90deg,#00FF88,#00D4FF)',boxShadow:'0 0 10px rgba(0,255,136,0.5)' }} />
      </div>
      <div style={{ marginTop:8,fontFamily:'Rajdhani,sans-serif',fontSize:13,color:'#00FF88',fontWeight:600,textAlign:'center' }}>
        Step {step+1} of {steps.length}: {steps[step]}
      </div>
    </div>
  )
}

function Step1({ data, setData }) {
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:28 }}>
      {/* Board preview */}
      <div style={{ display:'flex',gap:32,alignItems:'flex-start' }}>
        <div style={{ flex:1 }}>
          <label className="form-label">PCB Layer Count</label>
          <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
            {LAYERS.map(l => (
              <motion.button key={l} whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} onClick={() => setData({...data,layers:l})}
                className={`quote-option-card ${data.layers===l?'selected':''}`} style={{ minWidth:60 }}>
                <div style={{ fontFamily:'Orbitron,monospace',fontSize:13,fontWeight:700,color: data.layers===l ? '#00FF88' : '#8899BB' }}>{l}</div>
                <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:11,color:'#4a5568',marginTop:2 }}>Layer{l!=='1'?'s':''}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Live PCB preview */}
        <div style={{ flexShrink:0 }}>
          <label className="form-label" style={{ textAlign:'center',display:'block' }}>Board Preview</label>
          <motion.div animate={{ width:Math.min(Math.max((data.width||100)/3,40),160), height:Math.min(Math.max((data.height||100)/3,30),120) }}
            transition={{ duration:0.4 }} style={{ background:'#0d2a1a',border:'2px solid #1a4a2a',borderRadius:4,minWidth:40,minHeight:30,position:'relative',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <div style={{ position:'absolute',inset:4,border:'1px dashed rgba(0,255,136,0.2)',borderRadius:2 }} />
            <span style={{ fontFamily:'Orbitron,monospace',fontSize:8,color:'rgba(0,255,136,0.5)',textAlign:'center' }}>PCB</span>
          </motion.div>
          <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:11,color:'#8899BB',textAlign:'center',marginTop:6 }}>{data.width||'—'}×{data.height||'—'} mm</div>
        </div>
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
        <div>
          <label className="form-label">Width (mm)</label>
          <input className="form-input" type="number" value={data.width} onChange={e=>setData({...data,width:e.target.value})} placeholder="e.g. 100" min="10" max="500" />
        </div>
        <div>
          <label className="form-label">Height (mm)</label>
          <input className="form-input" type="number" value={data.height} onChange={e=>setData({...data,height:e.target.value})} placeholder="e.g. 80" min="10" max="500" />
        </div>
      </div>

      <div>
        <label className="form-label">Quantity</label>
        <div style={{ display:'flex',gap:8,alignItems:'center',flexWrap:'wrap' }}>
          {QTY_PRESETS.map(q => (
            <motion.button key={q} whileHover={{ scale:1.05 }} onClick={() => setData({...data,qty:q})}
              className={`quote-option-card ${data.qty===q?'selected':''}`} style={{ minWidth:70 }}>
              <div style={{ fontFamily:'Orbitron,monospace',fontSize:13,fontWeight:700,color: data.qty===q?'#00FF88':'#8899BB' }}>{q}</div>
            </motion.button>
          ))}
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            <button onClick={() => setData({...data,qty:Math.max(1,(data.qty||1)-1)})} style={{ width:32,height:32,background:'rgba(17,24,39,0.8)',border:'1px solid #1e2d47',borderRadius:4,color:'#F0F4FF',cursor:'pointer',fontSize:18 }}>−</button>
            <input className="form-input" type="number" value={data.qty||''} onChange={e=>setData({...data,qty:parseInt(e.target.value)||1})} style={{ width:80,textAlign:'center' }} placeholder="Custom" />
            <button onClick={() => setData({...data,qty:(data.qty||1)+1})} style={{ width:32,height:32,background:'rgba(17,24,39,0.8)',border:'1px solid #1e2d47',borderRadius:4,color:'#F0F4FF',cursor:'pointer',fontSize:18 }}>+</button>
          </div>
        </div>
      </div>

      <div>
        <label className="form-label">Board Thickness</label>
        <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
          {THICKNESS.map(t => (
            <motion.button key={t} whileHover={{ scale:1.05 }} onClick={() => setData({...data,thickness:t})}
              className={`quote-option-card ${data.thickness===t?'selected':''}`}>
              <div style={{ fontFamily:'Orbitron,monospace',fontSize:12,color: data.thickness===t?'#00FF88':'#8899BB' }}>{t}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="form-label">Surface Finish</label>
        <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
          {SURFACE.map(s => (
            <motion.button key={s} whileHover={{ scale:1.05 }} onClick={() => setData({...data,surface:s})}
              className={`quote-option-card ${data.surface===s?'selected':''}`}>
              <div style={{ fontFamily:'Orbitron,monospace',fontSize:11,color: data.surface===s?'#00FF88':'#8899BB' }}>{s}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:24 }}>
        <div>
          <label className="form-label">Solder Mask Color</label>
          <div style={{ display:'flex',gap:10,flexWrap:'wrap',marginTop:4 }}>
            {SOLDERMASK.map(sm => (
              <motion.div key={sm.label} whileHover={{ scale:1.15 }} title={sm.label} onClick={() => setData({...data,soldermask:sm.label})}
                className={`color-swatch ${data.soldermask===sm.label?'selected':''}`} style={{ background:sm.color }} />
            ))}
          </div>
          {data.soldermask && <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:12,color:'#00FF88',marginTop:6 }}>{data.soldermask}</div>}
        </div>
        <div>
          <label className="form-label">Silkscreen Color</label>
          <div style={{ display:'flex',gap:10,marginTop:4 }}>
            {SILKSCREEN.map(ss => (
              <motion.div key={ss.label} whileHover={{ scale:1.15 }} title={ss.label} onClick={() => setData({...data,silkscreen:ss.label})}
                className={`color-swatch ${data.silkscreen===ss.label?'selected':''}`} style={{ background:ss.color,border:`3px solid ${data.silkscreen===ss.label ? '#00FF88' : '#333'}` }} />
            ))}
          </div>
          {data.silkscreen && <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:12,color:'#00FF88',marginTop:6 }}>{data.silkscreen}</div>}
        </div>
      </div>
    </div>
  )
}

function Step2({ data, setData }) {
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:28 }}>
      <div>
        <label className="form-label">Assembly Required?</label>
        <div style={{ display:'flex',alignItems:'center',gap:16,marginTop:8 }}>
          <div className={`toggle ${data.assembly?'on':''}`} onClick={() => setData({...data,assembly:!data.assembly})}>
            <div className="toggle-thumb" />
          </div>
          <span style={{ fontFamily:'Rajdhani,sans-serif',fontSize:15,color: data.assembly ? '#00FF88' : '#8899BB',fontWeight:600 }}>
            {data.assembly ? 'Yes — Include assembly' : 'No — PCB only'}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {data.assembly && (
          <motion.div initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:'auto' }} exit={{ opacity:0,height:0 }} style={{ overflow:'hidden',display:'flex',flexDirection:'column',gap:24 }}>
            <div>
              <label className="form-label">Assembly Type</label>
              <div style={{ display:'flex',gap:10,flexWrap:'wrap',marginTop:4 }}>
                {ASSEMBLY_TYPE.map(t => (
                  <motion.button key={t} whileHover={{ scale:1.05 }} onClick={() => setData({...data,assemblyType:t})}
                    className={`quote-option-card ${data.assemblyType===t?'selected':''}`} style={{ minWidth:100 }}>
                    <div style={{ fontFamily:'Orbitron,monospace',fontSize:12,color: data.assemblyType===t?'#00FF88':'#8899BB' }}>{t}</div>
                    <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:11,color:'#4a5568',marginTop:2 }}>
                      {t==='SMT'?'Surface Mount':t==='THT'?'Through-Hole':'Both Types'}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">Component Supply</label>
              <div style={{ display:'flex',gap:10,flexWrap:'wrap' }}>
                {SUPPLY.map(s => (
                  <motion.button key={s} whileHover={{ scale:1.05 }} onClick={() => setData({...data,supply:s})}
                    className={`quote-option-card ${data.supply===s?'selected':''}`}>
                    <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:13,color: data.supply===s?'#00FF88':'#8899BB',fontWeight:600 }}>{s}</div>
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">Number of Unique Components</label>
              <input className="form-input" type="number" value={data.uniqueComps||''} onChange={e=>setData({...data,uniqueComps:e.target.value})} placeholder="e.g. 25" min="1" style={{ maxWidth:200 }} />
            </div>
            <div>
              <label className="form-label">Special Requirements</label>
              <textarea className="form-input" rows={4} value={data.specialReq||''} onChange={e=>setData({...data,specialReq:e.target.value})} placeholder="Conformal coating, lead-free, specific IPC class, etc." style={{ resize:'vertical' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Step3({ data, setData }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/zip':['.zip'],  'application/x-rar-compressed':['.rar'], 'application/octet-stream':['.gbr','.ger'] },
    maxFiles: 5,
    onDrop: files => setData({...data, files: [...(data.files||[]), ...files]})
  })

  return (
    <div style={{ display:'flex',flexDirection:'column',gap:24 }}>
      <div>
        <label className="form-label">Upload Gerber Files</label>
        <div {...getRootProps()} className={`drop-zone ${isDragActive?'active':''}`} style={{ position:'relative',overflow:'hidden' }}>
          <input {...getInputProps()} />
          {/* PCB outline decoration */}
          <svg viewBox="0 0 300 120" style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.08,pointerEvents:'none' }}>
            <rect x="10" y="10" width="280" height="100" rx="4" fill="none" stroke="#00FF88" strokeWidth="1.5" strokeDasharray="8,4"/>
            {[15,25,35].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill="#00FF88"/>)}
          </svg>
          <div style={{ position:'relative',zIndex:1 }}>
            <div style={{ fontSize:40,marginBottom:12 }}>📂</div>
            <div style={{ fontFamily:'Orbitron,monospace',fontSize:13,fontWeight:700,color: isDragActive ? '#00FF88' : '#8899BB',marginBottom:8 }}>
              {isDragActive ? 'DROP FILES HERE' : 'DRAG & DROP GERBER FILES'}
            </div>
            <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:13,color:'#4a5568' }}>Accepts .zip, .rar, .gbr, .ger files</div>
            <motion.button type="button" whileHover={{ scale:1.05 }} className="btn-outline" style={{ marginTop:16,fontSize:12,padding:'8px 20px' }}>Browse Files</motion.button>
          </div>
        </div>
      </div>

      {data.files && data.files.length > 0 && (
        <div>
          <label className="form-label">Uploaded Files</label>
          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
            {data.files.map((f,i) => (
              <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.05 }}
                style={{ display:'flex',alignItems:'center',gap:12,padding:'10px 14px',background:'rgba(0,255,136,0.05)',border:'1px solid rgba(0,255,136,0.2)',borderRadius:6 }}>
                <span style={{ fontSize:18 }}>📄</span>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:14,color:'#F0F4FF',fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{f.name}</div>
                  <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:12,color:'#8899BB' }}>{(f.size/1024).toFixed(1)} KB</div>
                </div>
                <span style={{ color:'#00FF88',fontSize:18 }}>✓</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="form-label">Additional Notes</label>
        <textarea className="form-input" rows={4} value={data.notes||''} onChange={e=>setData({...data,notes:e.target.value})} placeholder="Design revision notes, reference designators, special instructions..." style={{ resize:'vertical' }} />
      </div>
    </div>
  )
}

function Step4({ data, setData }) {
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
        <div>
          <label className="form-label">Full Name *</label>
          <input className="form-input" value={data.name||''} onChange={e=>setData({...data,name:e.target.value})} placeholder="Your full name" required />
        </div>
        <div>
          <label className="form-label">Company</label>
          <input className="form-input" value={data.company||''} onChange={e=>setData({...data,company:e.target.value})} placeholder="Company name" />
        </div>
      </div>
      <div>
        <label className="form-label">Email *</label>
        <input className="form-input" type="email" value={data.email||''} onChange={e=>setData({...data,email:e.target.value})} placeholder="your@email.com" required />
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
        <div>
          <label className="form-label">Phone</label>
          <input className="form-input" value={data.phone||''} onChange={e=>setData({...data,phone:e.target.value})} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div>
          <label className="form-label">Country</label>
          <select className="form-input" value={data.country||'India'} onChange={e=>setData({...data,country:e.target.value})}>
            {['India','USA','UK','Germany','Australia','Singapore','UAE','Other'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      {/* Summary */}
      <div style={{ marginTop:8,padding:20,background:'rgba(0,255,136,0.05)',border:'1px solid rgba(0,255,136,0.15)',borderRadius:10 }}>
        <div style={{ fontFamily:'Orbitron,monospace',fontSize:11,fontWeight:700,color:'#00FF88',letterSpacing:1,marginBottom:12 }}>ORDER SUMMARY</div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8 }}>
          {[
            ['Layers',data.pcb?.layers||'—'],['Size',`${data.pcb?.width||'—'}×${data.pcb?.height||'—'} mm`],
            ['Quantity',data.pcb?.qty||'—'],['Thickness',data.pcb?.thickness||'—'],
            ['Surface',data.pcb?.surface||'—'],['Assembly',data.asm?.assembly?'Yes':'No'],
          ].map(([k,v],i) => (
            <div key={i} style={{ display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #1e2d47' }}>
              <span style={{ fontFamily:'Rajdhani,sans-serif',fontSize:13,color:'#8899BB' }}>{k}</span>
              <span style={{ fontFamily:'Rajdhani,sans-serif',fontSize:13,color:'#F0F4FF',fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step5() {
  return (
    <motion.div initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }} style={{ textAlign:'center',padding:'40px 0' }}>
      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.2,type:'spring',stiffness:200 }}
        style={{ width:100,height:100,borderRadius:'50%',background:'rgba(0,255,136,0.1)',border:'3px solid #00FF88',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',boxShadow:'0 0 40px rgba(0,255,136,0.3)',fontSize:40 }}>
        ✅
      </motion.div>
      <motion.h2 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4 }}
        style={{ fontFamily:'Orbitron,monospace',fontSize:22,fontWeight:800,color:'#00FF88',marginBottom:12 }}>
        Quote Request Received!
      </motion.h2>
      <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.55 }}
        style={{ fontFamily:'Rajdhani,sans-serif',fontSize:16,color:'#8899BB',maxWidth:420,margin:'0 auto 28px',lineHeight:1.7 }}>
        Thank you! Our engineering team will review your specifications and respond within <strong style={{ color:'#00FF88' }}>24 business hours</strong>.
      </motion.p>
      <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.7 }}
        style={{ display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap' }}>
        <a href="/"><button className="btn-outline">← Back to Home</button></a>
        <a href="/contact"><button className="btn-primary">Contact Us</button></a>
      </motion.div>
    </motion.div>
  )
}

export default function Quote() {
  const [step, setStep] = useState(0)
  const [pcb, setPcb] = useState({ layers:'2',width:'',height:'',qty:10,thickness:'1.6mm',surface:'HASL',soldermask:'Green',silkscreen:'White' })
  const [asm, setAsm] = useState({ assembly:false,assemblyType:'SMT',supply:'Customer Supplied',uniqueComps:'',specialReq:'' })
  const [gerber, setGerber] = useState({ files:[],notes:'' })
  const [contact, setContact] = useState({ name:'',company:'',email:'',phone:'',country:'India' })

  const canNext = () => {
    if (step===0) return pcb.layers && pcb.width && pcb.height && pcb.qty
    if (step===3) return contact.name && contact.email
    return true
  }

  const slideVariants = { enter: dir => ({ x: dir>0?80:-80,opacity:0 }), center: { x:0,opacity:1 }, exit: dir => ({ x: dir>0?-80:80,opacity:0 }) }
  const [dir, setDir] = useState(1)

  const next = () => { if(step < steps.length-1) { setDir(1); setStep(s=>s+1) } }
  const back = () => { if(step > 0) { setDir(-1); setStep(s=>s-1) } }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
      {/* Hero */}
      <div className="page-hero" style={{ background:'linear-gradient(135deg,#0A0E1A,#0d1a2a)',minHeight:'30vh',paddingBottom:40 }}>
        <div className="circuit-bg" />
        <div className="container" style={{ position:'relative',zIndex:1 }}>
          <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}>
            <div className="section-eyebrow">Get Started</div>
            <h1 className="section-title" style={{ fontSize:'clamp(28px,4vw,50px)' }}>Request a Quote</h1>
            <p className="section-subtitle">Complete the form below and receive a competitive quote within 24 hours.</p>
          </motion.div>
        </div>
      </div>

      <section className="section" style={{ paddingTop:40 }}>
        <div className="circuit-bg" />
        <div className="container">
          <div style={{ maxWidth:760,margin:'0 auto' }}>
            <ProgressBar step={step} />

            <div style={{ background:'rgba(17,24,39,0.8)',border:'1px solid #1e2d47',borderRadius:16,padding:36,overflow:'hidden',position:'relative' }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={step} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration:0.35,ease:'easeInOut' }}>
                  {step===0 && <Step1 data={pcb} setData={setPcb} />}
                  {step===1 && <Step2 data={asm} setData={setAsm} />}
                  {step===2 && <Step3 data={gerber} setData={setGerber} />}
                  {step===3 && <Step4 data={{ pcb,asm,name:contact.name,company:contact.company,email:contact.email,phone:contact.phone,country:contact.country }} setData={d=>setContact({name:d.name||contact.name,company:d.company||contact.company,email:d.email||contact.email,phone:d.phone||contact.phone,country:d.country||contact.country})} />}
                  {step===4 && <Step5 />}
                </motion.div>
              </AnimatePresence>
            </div>

            {step < steps.length-1 && (
              <div style={{ display:'flex',justifyContent:'space-between',marginTop:24 }}>
                <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} onClick={back} disabled={step===0}
                  className="btn-outline" style={{ opacity:step===0?0.3:1,pointerEvents:step===0?'none':'auto' }}>← Back</motion.button>
                <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} onClick={next} disabled={!canNext()}
                  className="btn-primary" style={{ opacity:canNext()?1:0.5,pointerEvents:canNext()?'auto':'none' }}>
                  {step===steps.length-2 ? 'Submit Quote Request ✓' : 'Continue →'}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
