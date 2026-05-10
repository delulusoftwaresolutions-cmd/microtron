import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { addQuoteRequest } from '../utils/adminStore'

const steps = ['PCB SPECS', 'ASSEMBLY', 'FILES', 'CONTACT', 'DONE']

const LAYERS = ['1', '2', '4', '6', '8', '10+']
const THICKNESS = ['0.8mm', '1.0mm', '1.6mm', '2.0mm']
const SURFACE = ['HASL', 'ENIG', 'OSP', 'Immersion Silver']
const SOLDERMASK = [
  { color: '#1a6a2a', label: 'Green' },
  { color: '#8b0000', label: 'Red' },
  { color: '#00008b', label: 'Blue' },
  { color: '#111111', label: 'Black' },
  { color: '#eaeaea', label: 'White' },
  { color: '#ccaa00', label: 'Yellow' },
]
const SILKSCREEN = [
  { color: '#ffffff', label: 'White' },
  { color: '#111111', label: 'Black' },
]
const ASSEMBLY_TYPE = ['SMT', 'THT', 'Mixed']
const SUPPLY = ['Customer Supplied', 'Microtron Sourced', 'Mixed']
const QTY_PRESETS = [10, 50, 100, 500, 1000]
const BOARD_MIN_MM = 10
const BOARD_MAX_MM = 500
const PREVIEW_MIN_W = 130
const PREVIEW_MAX_W = 260
const PREVIEW_MIN_H = 92
const PREVIEW_MAX_H = 190

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function parseBoardDimension(rawValue, fallback) {
  const parsed = Number(rawValue)
  if (!Number.isFinite(parsed)) return fallback
  return clamp(parsed, BOARD_MIN_MM, BOARD_MAX_MM)
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const ratio = (value - inMin) / (inMax - inMin)
  return outMin + ratio * (outMax - outMin)
}

function ProgressBar({ step }) {
  return (
    <div className="quote-stepper">
      {steps.map((label, i) => {
        const isDone = i < step
        const isActive = i === step
        return (
          <div key={label} className="quote-step-item">
            <div className={`quote-step-box ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
              {i + 1}
            </div>
            <div className={`quote-step-label ${isActive ? 'active' : ''}`}>{label}</div>
          </div>
        )
      })}
    </div>
  )
}

function Step1({ data, setData }) {
  const width = parseBoardDimension(data.width, 100)
  const height = parseBoardDimension(data.height, 80)
  const previewW = mapRange(width, BOARD_MIN_MM, BOARD_MAX_MM, PREVIEW_MIN_W, PREVIEW_MAX_W)
  const previewH = mapRange(height, BOARD_MIN_MM, BOARD_MAX_MM, PREVIEW_MIN_H, PREVIEW_MAX_H)
  const maskTheme = {
    Green: { board: '#0d5428', border: '#00ff9d', inner: 'rgba(163,220,192,0.25)', holeStroke: '#7fa0d1' },
    Red: { board: '#5e1010', border: '#ff7070', inner: 'rgba(255,188,188,0.25)', holeStroke: '#ffb2b2' },
    Blue: { board: '#10356a', border: '#4dc6ff', inner: 'rgba(182,221,255,0.24)', holeStroke: '#96c9ff' },
    Black: { board: '#12161f', border: '#8aa3c3', inner: 'rgba(186,200,220,0.2)', holeStroke: '#9fb3cc' },
    White: { board: '#e8ecef', border: '#6f859c', inner: 'rgba(111,133,156,0.22)', holeStroke: '#54667b' },
    Yellow: { board: '#9b7d12', border: '#ffd95b', inner: 'rgba(255,238,176,0.25)', holeStroke: '#ffe8a1' },
  }
  const finishTone = {
    HASL: '#d5b272',
    ENIG: '#e6bf65',
    OSP: '#bf7a35',
    'Immersion Silver': '#cfd6e1',
  }
  const activeMask = maskTheme[data.soldermask] || maskTheme.Green
  const activeSilk = data.silkscreen === 'Black' ? '#12161f' : '#f6fbff'
  const activeTrace = finishTone[data.surface] || finishTone.HASL
  const centerAccent = data.silkscreen === 'Black' ? '#1fe7b1' : '#00eec4'

  return (
    <div className="quote-step1-grid">
      <div>
        <h2 className="quote-panel-title">PCB Specifications</h2>

        <div className="quote-grid-2">
          <div>
            <label className="quote-field-label">Layers</label>
            <select
              className="quote-input quote-select"
              value={data.layers}
              onChange={(e) => setData({ ...data, layers: e.target.value })}
            >
              {LAYERS.map((l) => (
                <option key={l} value={l}>
                  {l === '10+' ? '10+ Layer' : `${l}-Layer`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="quote-field-label">Quantity</label>
            <div className="quote-qty-group">
              <button
                type="button"
                className="quote-qty-btn"
                onClick={() => setData({ ...data, qty: Math.max(1, Number(data.qty || 1) - 1) })}
              >
                -
              </button>
              <input
                className="quote-input quote-qty-input"
                type="number"
                value={data.qty || ''}
                onChange={(e) => setData({ ...data, qty: parseInt(e.target.value, 10) || 1 })}
                min="1"
              />
              <button
                type="button"
                className="quote-qty-btn"
                onClick={() => setData({ ...data, qty: Number(data.qty || 1) + 1 })}
              >
                +
              </button>
            </div>
            <div className="quote-preset-row">
              {QTY_PRESETS.map((q) => (
                <button
                  key={q}
                  type="button"
                  className={`quote-mini-btn ${Number(data.qty) === q ? 'active' : ''}`}
                  onClick={() => setData({ ...data, qty: q })}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="quote-grid-2">
          <div>
            <label className="quote-field-label">Width (mm)</label>
            <input
              className="quote-input"
              type="number"
              value={data.width}
              onChange={(e) => setData({ ...data, width: e.target.value })}
              min="10"
              max="500"
            />
          </div>
          <div>
            <label className="quote-field-label">Height (mm)</label>
            <input
              className="quote-input"
              type="number"
              value={data.height}
              onChange={(e) => setData({ ...data, height: e.target.value })}
              min="10"
              max="500"
            />
          </div>
        </div>

        <div>
          <label className="quote-field-label">Board Thickness</label>
          <div className="quote-chip-row">
            {THICKNESS.map((t) => (
              <button
                key={t}
                type="button"
                className={`quote-chip ${data.thickness === t ? 'active' : ''}`}
                onClick={() => setData({ ...data, thickness: t })}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="quote-field-label">Surface Finish</label>
          <div className="quote-chip-row">
            {SURFACE.map((s) => (
              <button
                key={s}
                type="button"
                className={`quote-chip ${data.surface === s ? 'active' : ''}`}
                onClick={() => setData({ ...data, surface: s })}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="quote-grid-2">
          <div>
            <label className="quote-field-label">Solder Mask Color</label>
            <div className="quote-swatch-row">
              {SOLDERMASK.map((sm) => (
                <button
                  key={sm.label}
                  type="button"
                  title={sm.label}
                  className={`quote-swatch ${data.soldermask === sm.label ? 'active' : ''}`}
                  style={{ background: sm.color }}
                  onClick={() => setData({ ...data, soldermask: sm.label })}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="quote-field-label">Silkscreen Color</label>
            <div className="quote-swatch-row">
              {SILKSCREEN.map((ss) => (
                <button
                  key={ss.label}
                  type="button"
                  title={ss.label}
                  className={`quote-swatch ${data.silkscreen === ss.label ? 'active' : ''}`}
                  style={{ background: ss.color }}
                  onClick={() => setData({ ...data, silkscreen: ss.label })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="quote-preview-card">
        <div className="quote-preview-label">LIVE PREVIEW</div>
        <div className="quote-preview-board-wrap">
          <motion.svg
            viewBox="0 0 280 200"
            className="quote-preview-board"
            preserveAspectRatio="none"
            animate={{ width: previewW, height: previewH, opacity: 1 }}
            transition={{
              width: { type: 'spring', stiffness: 170, damping: 20, mass: 0.75 },
              height: { type: 'spring', stiffness: 170, damping: 20, mass: 0.75 },
              opacity: { duration: 0.2 },
            }}
          >
            <rect x="22" y="18" width="236" height="164" rx="6" fill={activeMask.board} stroke={activeMask.border} strokeWidth="1.5" />
            <rect x="28" y="24" width="224" height="152" rx="4" fill="none" stroke={activeMask.inner} strokeDasharray="4 5" />
            <path d="M34 82 H116 L130 70 H152 L166 82 H246" stroke={activeTrace} strokeWidth="2.2" fill="none" />
            <path d="M34 118 H84 L98 130 H166 L180 118 H246" stroke={activeTrace} strokeWidth="2.2" fill="none" />
            <g opacity="0.9">
              {[
                [34, 30],
                [246, 30],
                [34, 170],
                [246, 170],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="6" fill="#071025" stroke={activeMask.holeStroke} />
                  <circle cx={cx} cy={cy} r="3.4" fill="#020814" />
                </g>
              ))}
            </g>
            <circle cx="140" cy="100" r="5.5" fill="#082035" stroke={centerAccent} />
            <path d="M140 72 V130 M114 100 H166" stroke={centerAccent} strokeWidth="1.1" opacity="0.85" />
            <text x="140" y="176" textAnchor="middle" fill={activeSilk} opacity="0.85" fontSize="12" fontFamily="Orbitron,monospace">
              {`${width} x ${height} mm - ${data.layers}L`}
            </text>
          </motion.svg>
        </div>
        <div className="quote-preview-meta">
          <div>
            Layers: <span>{data.layers}</span>
          </div>
          <div>
            Thickness: <span>{data.thickness}</span>
          </div>
          <div>
            Finish: <span>{data.surface}</span>
          </div>
          <div>
            Mask / Silk: <span>{`${data.soldermask} / ${data.silkscreen}`}</span>
          </div>
          <div>
            Quantity: <span>{data.qty}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step2({ data, setData }) {
  return (
    <div className="quote-step-basic">
      <h2 className="quote-panel-title">Assembly Options</h2>

      <div>
        <label className="quote-field-label">Assembly Required?</label>
        <div className="quote-toggle-row">
          <div className={`toggle ${data.assembly ? 'on' : ''}`} onClick={() => setData({ ...data, assembly: !data.assembly })}>
            <div className="toggle-thumb" />
          </div>
          <span className="quote-toggle-text">{data.assembly ? 'Yes - Include assembly' : 'No - PCB only'}</span>
        </div>
      </div>

      <AnimatePresence>
        {data.assembly && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 22 }}
          >
            <div>
              <label className="quote-field-label">Assembly Type</label>
              <div className="quote-chip-row">
                {ASSEMBLY_TYPE.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`quote-chip ${data.assemblyType === t ? 'active' : ''}`}
                    onClick={() => setData({ ...data, assemblyType: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="quote-field-label">Component Supply</label>
              <div className="quote-chip-row">
                {SUPPLY.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`quote-chip ${data.supply === s ? 'active' : ''}`}
                    onClick={() => setData({ ...data, supply: s })}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="quote-field-label">Number of Unique Components</label>
              <input
                className="quote-input"
                type="number"
                value={data.uniqueComps || ''}
                onChange={(e) => setData({ ...data, uniqueComps: e.target.value })}
                placeholder="e.g. 25"
                min="1"
                style={{ maxWidth: 220 }}
              />
            </div>

            <div>
              <label className="quote-field-label">Special Requirements</label>
              <textarea
                className="quote-input"
                rows={4}
                value={data.specialReq || ''}
                onChange={(e) => setData({ ...data, specialReq: e.target.value })}
                placeholder="Conformal coating, lead-free, IPC class, etc."
                style={{ resize: 'vertical' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Step3({ data, setData }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar'],
      'application/octet-stream': ['.gbr', '.ger'],
    },
    maxFiles: 5,
    onDrop: (files) => setData({ ...data, files: [...(data.files || []), ...files] }),
  })

  return (
    <div className="quote-step-basic">
      <h2 className="quote-panel-title">Gerber Files</h2>
      <div>
        <label className="quote-field-label">Upload Files</label>
        <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'active' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
          <input {...getInputProps()} />
          <svg viewBox="0 0 300 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
            <rect x="10" y="10" width="280" height="100" rx="4" fill="none" stroke="#00FF88" strokeWidth="1.5" strokeDasharray="8,4" />
            {[15, 25, 35].map((x, i) => (
              <circle key={i} cx={x} cy="20" r="3" fill="#00FF88" />
            ))}
          </svg>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>FILES</div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 13, fontWeight: 700, color: isDragActive ? '#00FF88' : '#A4BCD5', marginBottom: 8 }}>
              {isDragActive ? 'DROP FILES HERE' : 'DRAG AND DROP GERBER FILES'}
            </div>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: '#5e6f8f' }}>Accepts .zip, .rar, .gbr, .ger</div>
          </div>
        </div>
      </div>

      {data.files && data.files.length > 0 && (
        <div>
          <label className="quote-field-label">Uploaded Files</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.files.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: 'rgba(0,255,136,0.05)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  borderRadius: 6,
                }}
              >
                <span style={{ fontSize: 16, color: '#00ff88' }}>OK</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14, color: '#F0F4FF', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: '#8899BB' }}>{(f.size / 1024).toFixed(1)} KB</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="quote-field-label">Additional Notes</label>
        <textarea
          className="quote-input"
          rows={4}
          value={data.notes || ''}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
          placeholder="Any reference notes or special instructions..."
          style={{ resize: 'vertical' }}
        />
      </div>
    </div>
  )
}

function Step4({ contact, setContact, pcb, asm }) {
  return (
    <div className="quote-step-basic">
      <h2 className="quote-panel-title">Contact Details</h2>

      <div className="quote-grid-2">
        <div>
          <label className="quote-field-label">Full Name *</label>
          <input className="quote-input" value={contact.name || ''} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Your full name" required />
        </div>
        <div>
          <label className="quote-field-label">Company</label>
          <input className="quote-input" value={contact.company || ''} onChange={(e) => setContact({ ...contact, company: e.target.value })} placeholder="Company name" />
        </div>
      </div>

      <div>
        <label className="quote-field-label">Email *</label>
        <input className="quote-input" type="email" value={contact.email || ''} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="name@company.com" required />
      </div>

      <div className="quote-grid-2">
        <div>
          <label className="quote-field-label">Phone</label>
          <input className="quote-input" value={contact.phone || ''} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div>
          <label className="quote-field-label">Country</label>
          <select className="quote-input quote-select" value={contact.country || 'India'} onChange={(e) => setContact({ ...contact, country: e.target.value })}>
            {['India', 'USA', 'UK', 'Germany', 'Australia', 'Singapore', 'UAE', 'Other'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="quote-summary">
        <div className="quote-summary-title">ORDER SUMMARY</div>
        <div className="quote-summary-grid">
          {[
            ['Layers', pcb.layers || '-'],
            ['Size', `${pcb.width || '-'} x ${pcb.height || '-'} mm`],
            ['Quantity', pcb.qty || '-'],
            ['Thickness', pcb.thickness || '-'],
            ['Surface', pcb.surface || '-'],
            ['Assembly', asm.assembly ? 'Yes' : 'No'],
          ].map(([k, v], i) => (
            <div key={i} className="quote-summary-row">
              <span>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step5({ quoteId }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="quote-done">
      <div className="quote-done-check">OK</div>
      <h2>Quote Request Received</h2>
      <p>Our engineering team will review your details and get back within 24 business hours.</p>
      {quoteId && (
        <p style={{ marginTop: 4, marginBottom: 20 }}>
          Reference ID: <strong>{quoteId}</strong>
        </p>
      )}
      <div className="quote-done-actions">
        <a href="/">
          <button className="btn-outline">Back to Home</button>
        </a>
        <a href="/contact">
          <button className="btn-primary">Contact Us</button>
        </a>
      </div>
    </motion.div>
  )
}

export default function Quote() {
  const [step, setStep] = useState(0)
  const [pcb, setPcb] = useState({
    layers: '2',
    width: '100',
    height: '80',
    qty: 50,
    thickness: '1.6mm',
    surface: 'HASL',
    soldermask: 'Green',
    silkscreen: 'White',
  })
  const [asm, setAsm] = useState({
    assembly: false,
    assemblyType: 'SMT',
    supply: 'Customer Supplied',
    uniqueComps: '',
    specialReq: '',
  })
  const [gerber, setGerber] = useState({ files: [], notes: '' })
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', country: 'India' })
  const [submittedQuoteId, setSubmittedQuoteId] = useState('')

  const canNext = useMemo(() => {
    if (step === 0) return pcb.layers && pcb.width && pcb.height && pcb.qty
    if (step === 3) return contact.name && contact.email
    return true
  }, [step, pcb, contact])

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 70 : -70, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -70 : 70, opacity: 0 }),
  }
  const [dir, setDir] = useState(1)

  const next = () => {
    if (step < steps.length - 1) {
      if (step === steps.length - 2) {
        const saved = addQuoteRequest({ pcb, asm, gerber, contact })
        setSubmittedQuoteId(saved?.id || '')
      }
      setDir(1)
      setStep((s) => s + 1)
    }
  }
  const back = () => {
    if (step > 0) {
      setDir(-1)
      setStep((s) => s - 1)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg,#060B17,#09142b)', minHeight: '28vh', paddingBottom: 30 }}>
        <div className="circuit-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="section-eyebrow">Get Started</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(28px,4vw,50px)' }}>
              Request a Quote
            </h1>
            <p className="section-subtitle">Complete this form and receive a response in 24 hours.</p>
          </motion.div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="circuit-bg" />
        <div className="container">
          <div className="quote-shell">
            <ProgressBar step={step} />

            <div className="quote-main-panel">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={step} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                  {step === 0 && <Step1 data={pcb} setData={setPcb} />}
                  {step === 1 && <Step2 data={asm} setData={setAsm} />}
                  {step === 2 && <Step3 data={gerber} setData={setGerber} />}
                  {step === 3 && <Step4 contact={contact} setContact={setContact} pcb={pcb} asm={asm} />}
                  {step === 4 && <Step5 quoteId={submittedQuoteId} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {step < steps.length - 1 && (
              <div className="quote-nav">
                <button className="btn-outline" onClick={back} disabled={step === 0} style={{ opacity: step === 0 ? 0.4 : 1, pointerEvents: step === 0 ? 'none' : 'auto' }}>
                  Back
                </button>
                <button className="btn-primary" onClick={next} disabled={!canNext} style={{ opacity: canNext ? 1 : 0.55, pointerEvents: canNext ? 'auto' : 'none' }}>
                  {step === steps.length - 2 ? 'Submit Quote Request' : 'Continue'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .quote-shell {
          max-width: 1320px;
          margin: 0 auto;
        }
        .quote-stepper {
          display: grid;
          grid-template-columns: repeat(5, minmax(84px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }
        .quote-step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .quote-step-box {
          width: 40px;
          height: 40px;
          border: 1px solid #2a3555;
          background: rgba(8, 14, 31, 0.8);
          color: #6d7da2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Orbitron', monospace;
          font-size: 19px;
          line-height: 1;
        }
        .quote-step-box.active,
        .quote-step-box.done {
          border-color: #00ff9b;
          color: #00ff9b;
          box-shadow: 0 0 16px rgba(0, 255, 155, 0.2);
        }
        .quote-step-label {
          font-family: 'Orbitron', monospace;
          letter-spacing: 2px;
          font-size: 10px;
          color: #7e8eae;
        }
        .quote-step-label.active {
          color: #00ff9b;
        }
        .quote-main-panel {
          border: 1px solid #1f2a4a;
          background: rgba(7, 15, 38, 0.84);
          padding: 28px 30px;
          min-height: 500px;
        }
        .quote-panel-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(20px, 2.5vw, 34px);
          line-height: 1.1;
          color: #f0f4ff;
          margin: 0 0 20px;
        }
        .quote-step1-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: 24px;
          align-items: start;
        }
        .quote-step-basic {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .quote-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 16px;
        }
        .quote-field-label {
          display: block;
          font-family: 'Orbitron', monospace;
          font-size: 12px;
          letter-spacing: 2px;
          color: #90a5c8;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .quote-input {
          width: 100%;
          height: 48px;
          background: #070f26;
          border: 1px solid #253358;
          border-radius: 0;
          color: #f0f4ff;
          font-size: 16px;
          font-weight: 600;
          padding: 0 14px;
          font-family: 'Rajdhani', sans-serif;
        }
        .quote-input:focus {
          outline: none;
          border-color: #00ff9b;
          box-shadow: 0 0 14px rgba(0, 255, 155, 0.18);
        }
        .quote-input::placeholder {
          color: #5f7499;
        }
        .quote-select {
          font-size: 16px;
        }
        .quote-qty-group {
          display: grid;
          grid-template-columns: 52px 1fr 52px;
          gap: 0;
          border: 1px solid #253358;
          background: #070f26;
        }
        .quote-qty-btn {
          border: 0;
          border-right: 1px solid #253358;
          background: transparent;
          color: #00ff9b;
          font-size: 28px;
          cursor: pointer;
          font-family: 'Orbitron', monospace;
        }
        .quote-qty-btn:last-child {
          border-right: 0;
          border-left: 1px solid #253358;
        }
        .quote-qty-input {
          border: 0;
          text-align: center;
          background: transparent;
        }
        .quote-preset-row {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }
        .quote-mini-btn {
          min-width: 46px;
          height: 28px;
          border: 1px solid #253358;
          background: #070f26;
          color: #88a1c8;
          font-family: 'Orbitron', monospace;
          font-size: 11px;
          cursor: pointer;
        }
        .quote-mini-btn.active {
          color: #00ff9b;
          border-color: #00ff9b;
        }
        .quote-chip-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .quote-chip {
          height: 40px;
          padding: 0 16px;
          border: 1px solid #253358;
          background: #070f26;
          color: #96add1;
          font-family: 'Orbitron', monospace;
          font-size: 12px;
          letter-spacing: 0.8px;
          cursor: pointer;
        }
        .quote-chip.active {
          border-color: #00ff9b;
          background: #0df59a;
          color: #03231a;
          box-shadow: 0 0 18px rgba(0, 255, 155, 0.3);
        }
        .quote-swatch-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .quote-swatch {
          width: 30px;
          height: 30px;
          border: 2px solid #344769;
          border-radius: 3px;
          cursor: pointer;
        }
        .quote-swatch.active {
          border-color: #00ff9b;
          box-shadow: 0 0 14px rgba(0, 255, 155, 0.25);
        }
        .quote-preview-card {
          border: 1px solid #1f2d4f;
          background: #070f26;
          min-height: 100%;
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
        }
        .quote-preview-label {
          font-family: 'Orbitron', monospace;
          color: #00ff9b;
          letter-spacing: 2px;
          font-size: 12px;
          margin-bottom: 12px;
        }
        .quote-preview-board-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 12px;
          min-height: 200px;
        }
        .quote-preview-board {
          display: block;
          max-width: 100%;
          border-radius: 4px;
          will-change: width, height;
          filter: drop-shadow(0 0 22px rgba(0, 255, 155, 0.2));
        }
        .quote-preview-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-family: 'Rajdhani', sans-serif;
          color: #95a7c6;
          font-size: 15px;
          line-height: 1.55;
        }
        .quote-preview-meta span {
          color: #00ff9b;
          font-weight: 700;
        }
        .quote-toggle-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 8px;
        }
        .quote-toggle-text {
          font-family: 'Rajdhani', sans-serif;
          color: #a7bad7;
          font-size: 16px;
          letter-spacing: 0.2px;
        }
        .quote-summary {
          margin-top: 6px;
          border: 1px solid rgba(0, 255, 155, 0.2);
          background: rgba(0, 255, 155, 0.05);
          padding: 12px 14px;
        }
        .quote-summary-title {
          font-family: 'Orbitron', monospace;
          letter-spacing: 1.2px;
          font-size: 11px;
          color: #00ff9b;
          margin-bottom: 8px;
        }
        .quote-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
        }
        .quote-summary-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(42, 64, 99, 0.6);
          padding-bottom: 4px;
          font-family: 'Rajdhani', sans-serif;
          color: #93a7c7;
          font-size: 14px;
        }
        .quote-summary-row strong {
          color: #f0f4ff;
        }
        .quote-done {
          text-align: center;
          padding: 22px 0 8px;
        }
        .quote-done-check {
          width: 76px;
          height: 76px;
          margin: 0 auto 14px;
          border-radius: 50%;
          border: 2px solid #00ff9b;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00ff9b;
          box-shadow: 0 0 26px rgba(0, 255, 155, 0.3);
          font-family: 'Orbitron', monospace;
          font-size: 15px;
          font-weight: 700;
        }
        .quote-done h2 {
          margin: 0 0 8px;
          font-family: 'Orbitron', monospace;
          color: #00ff9b;
          font-size: 23px;
        }
        .quote-done p {
          margin: 0 auto 20px;
          max-width: 560px;
          color: #95a7c6;
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          line-height: 1.6;
        }
        .quote-done-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .quote-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
        }
        @media (max-width: 1160px) {
          .quote-step1-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 980px) {
          .quote-main-panel {
            padding: 18px 14px;
          }
          .quote-panel-title {
            font-size: clamp(18px, 5.6vw, 30px);
            margin-bottom: 12px;
          }
          .quote-grid-2 {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .quote-input {
            font-size: 15px;
            height: 44px;
          }
          .quote-stepper {
            grid-template-columns: repeat(5, minmax(56px, 1fr));
          }
          .quote-step-label {
            font-size: 9px;
            letter-spacing: 1.2px;
          }
          .quote-step-box {
            width: 34px;
            height: 34px;
            font-size: 16px;
          }
          .quote-preview-meta {
            font-size: 14px;
          }
          .quote-summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  )
}
