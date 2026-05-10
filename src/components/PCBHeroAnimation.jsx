import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const components = [
  { id: 'u2', type: 'ic', label: 'U2', x: 110, y: 118, w: 62, h: 40 },
  { id: 'u3', type: 'ic', label: 'U3', x: 382, y: 118, w: 62, h: 40 },
  { id: 'mcu', type: 'mcu', label: 'MCU-S32K', x: 252, y: 208, w: 116, h: 116 },
  { id: 'u4', type: 'ic', label: 'U4', x: 382, y: 308, w: 62, h: 40 },
  { id: 'j1', type: 'conn', label: 'J1', x: 110, y: 344, w: 96, h: 30 },
  { id: 'j2', type: 'conn', label: 'J2', x: 382, y: 344, w: 96, h: 30 },
  { id: 'r1', type: 'rpack', x: 92, y: 78, w: 26, h: 10, tint: 'cyan' },
  { id: 'r2', type: 'rpack', x: 326, y: 78, w: 26, h: 10, tint: 'amber' },
  { id: 'r3', type: 'rpack', x: 116, y: 306, w: 26, h: 10, tint: 'amber' },
  { id: 'r4', type: 'rpack', x: 176, y: 330, w: 26, h: 10, tint: 'cyan' },
  { id: 'led1', type: 'led', x: 206, y: 78, w: 12, h: 10, tint: 'green' },
  { id: 'led2', type: 'led', x: 288, y: 78, w: 12, h: 10, tint: 'cyan' },
  { id: 'led3', type: 'led', x: 206, y: 330, w: 12, h: 10, tint: 'amber' },
  { id: 'led4', type: 'led', x: 288, y: 330, w: 12, h: 10, tint: 'green' },
  { id: 'c1', type: 'tp', label: 'C1', x: 56, y: 170, w: 20, h: 20 },
  { id: 'c2', type: 'tp', label: 'C2', x: 56, y: 212, w: 20, h: 20 },
  { id: 'c3', type: 'tp', label: 'C3', x: 428, y: 170, w: 20, h: 20 },
  { id: 'c4', type: 'tp', label: 'C4', x: 428, y: 212, w: 20, h: 20 },
]

const traces = [
  { d: 'M56 126 H146 L156 116 V62', w: 2.3 },
  { d: 'M136 136 H210 L220 126 H250', w: 2.3 },
  { d: 'M252 62 V116 L262 126 H336', w: 2.3 },
  { d: 'M336 136 H462', w: 2.3 },
  { d: 'M196 178 H304 L314 188 H382 L390 178 H462', w: 2.3 },
  { d: 'M56 226 H136 L146 218 H196', w: 2.3 },
  { d: 'M304 226 H356', w: 2.3 },
  { d: 'M56 286 H212 L222 296 H252', w: 2.3 },
  { d: 'M252 296 H428', w: 2.3 },
  { d: 'M146 286 V338', w: 2.3 },
  { d: 'M252 296 V338', w: 2.3 },
]

const viaDots = [
  [146, 126], [220, 126], [262, 126], [136, 136], [210, 136], [304, 178], [390, 178],
  [136, 226], [146, 218], [196, 218], [304, 226], [356, 226], [212, 286], [222, 296],
  [252, 296], [428, 296], [146, 338],
]

const matrixDots = []
for (let y = 70; y <= 324; y += 28) {
  for (let x = 64; x <= 456; x += 36) {
    matrixDots.push([x, y])
  }
}

function ledFill(tint) {
  if (tint === 'amber') return '#e2a41a'
  if (tint === 'cyan') return '#30d9ff'
  return '#2aff93'
}

export default function PCBHeroAnimation() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const ctx = gsap.context(() => {
      const board = gsap.utils.toArray('.pcb-board')
      const compEls = gsap.utils.toArray('.pcb-comp')
      const tracesEls = gsap.utils.toArray('.trace-line')
      const flashes = gsap.utils.toArray('.solder-flash')
      const ledCores = gsap.utils.toArray('.board-led-core')
      const ledHalos = gsap.utils.toArray('.board-led-halo')

      tracesEls.forEach((trace) => {
        const len = trace.getTotalLength()
        gsap.set(trace, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 0.26,
        })
      })

      gsap.set(compEls, {
        opacity: 0,
        y: -24,
        scale: 0.96,
        transformOrigin: '50% 50%',
      })
      gsap.set(flashes, { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' })
      gsap.set(ledCores, { opacity: 0.35 })
      gsap.set(ledHalos, { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.15 })

      tl.fromTo(
        board,
        { x: 88, opacity: 0, rotation: 0.6, transformOrigin: '50% 50%' },
        { x: 0, opacity: 1, rotation: 0, duration: 1.15, ease: 'power3.out' }
      )

      compEls.forEach((el, i) => {
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: 'power2.out',
          },
          i === 0 ? '-=0.24' : '<0.08'
        )
          .to(el, { y: -1.6, duration: 0.08, ease: 'power1.out' }, '<+0.05')
          .to(el, { y: 0, duration: 0.12, ease: 'power1.inOut' }, '<')

        if (flashes[i]) {
          tl.fromTo(
            flashes[i],
            { opacity: 0.9, scale: 0.2 },
            { opacity: 0, scale: 1.8, duration: 0.2, ease: 'power2.out' },
            '<+0.02'
          )
        }
      })

      tl.to(
        tracesEls,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.46,
          ease: 'power2.inOut',
          stagger: 0.06,
        },
        '-=0.1'
      )

      ledCores.forEach((led, i) => {
        gsap.to(led, {
          opacity: 0.95,
          duration: 1.05 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.9 + i * 0.14,
        })
      })

      ledHalos.forEach((halo, i) => {
        gsap.to(halo, {
          opacity: 0.46,
          scale: 1.14,
          duration: 1.05 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '50% 50%',
          delay: 1.9 + i * 0.14,
        })
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ width: '100%', maxWidth: 560, minHeight: 430, position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 520 380"
        width="100%"
        style={{ display: 'block', filter: 'drop-shadow(0 0 56px rgba(0,236,175,0.18))' }}
      >
        <defs>
          <linearGradient id="boardFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b4b2a" />
            <stop offset="100%" stopColor="#063a22" />
          </linearGradient>
          <linearGradient id="traceCopper" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0a316" />
            <stop offset="100%" stopColor="#ffbf3f" />
          </linearGradient>
          <linearGradient id="chipBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e1122" />
            <stop offset="100%" stopColor="#050814" />
          </linearGradient>
          <radialGradient id="ledGlow">
            <stop offset="0%" stopColor="#9dffe1" stopOpacity="0.74" />
            <stop offset="100%" stopColor="#26ff93" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flashGrad">
            <stop offset="0%" stopColor="#ffe7a2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f0aa20" stopOpacity="0" />
          </radialGradient>
        </defs>

        <text x="16" y="16" fill="#07f7a6" fontSize="14" fontFamily="Orbitron,monospace" fontWeight="700">o SMT - LINE 02 - ACTIVE</text>
        <text x="16" y="32" fill="#6aaab0" fontSize="11" fontFamily="Rajdhani,sans-serif">P1</text>

        <g className="pcb-board">
          <rect x="20" y="22" width="480" height="340" rx="8" fill="url(#boardFill)" stroke="#18f0ad" strokeWidth="1.1" />
          <rect x="30" y="30" width="460" height="324" rx="2" fill="none" stroke="#7ce9ca" strokeOpacity="0.2" strokeDasharray="4 6" />

          <g>
            {[[34, 34], [486, 34], [34, 348], [486, 348]].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="6.8" fill="#001127" stroke="#2decb3" strokeWidth="1" />
                <circle cx={cx} cy={cy} r="3.7" fill="#020918" />
              </g>
            ))}
          </g>

          <text x="38" y="52" fill="#7ea7a7" opacity="0.85" fontSize="7.6" fontFamily="Orbitron,monospace" fontWeight="700">
            MICROTRON - REV 2.4 - 4-LAYER
          </text>
          <text x="356" y="52" fill="#86afaf" opacity="0.85" fontSize="7.6" fontFamily="Orbitron,monospace" fontWeight="700">
            SN: MT-2025-0814
          </text>
          <text x="414" y="370" fill="#7aaeb3" opacity="0.9" fontSize="13" fontFamily="Orbitron,monospace">IPC-A-610 CLASS 3</text>
        </g>

        <g fill="#f0aa20" opacity="0.9">
          {matrixDots.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.55" />
          ))}
        </g>

        <g fill="none">
          {traces.map((t, i) => (
            <path key={i} className="trace-line" d={t.d} stroke="url(#traceCopper)" strokeWidth={t.w} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </g>

        <g>
          {viaDots.map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="3.9" fill="#0d2432" stroke="#f0aa20" strokeWidth="1.05" />
              <circle cx={cx} cy={cy} r="1.4" fill="#132d3d" />
            </g>
          ))}
        </g>

        {components.map((c) => (
          <g key={c.id} transform={`translate(${c.x},${c.y})`}>
            <g className="pcb-comp">
              {c.type === 'ic' && (
                <>
                  <rect x={-c.w / 2} y={-c.h / 2} width={c.w} height={c.h} rx="2" fill="url(#chipBody)" stroke="#2a3555" strokeWidth="1" />
                  {Array.from({ length: 7 }).map((_, pi) => {
                    const px = -c.w / 2 + 6 + pi * ((c.w - 12) / 6)
                    return (
                      <g key={`${c.id}-pin-${pi}`}>
                        <rect x={px - 1.6} y={-c.h / 2 - 4} width="3.2" height="4" fill="#bfc9d8" rx="0.4" />
                        <rect x={px - 1.6} y={c.h / 2} width="3.2" height="4" fill="#bfc9d8" rx="0.4" />
                      </g>
                    )
                  })}
                  <text x="0" y="4" textAnchor="middle" fontSize="9" fill="#73ffda" fontFamily="Orbitron,monospace" fontWeight="700">
                    {c.label}
                  </text>
                </>
              )}

              {c.type === 'mcu' && (
                <>
                  <rect x={-c.w / 2} y={-c.h / 2} width={c.w} height={c.h} rx="0" fill="#0a0d1a" stroke="#1e2742" strokeWidth="1.2" />
                  {Array.from({ length: 13 }).map((_, pi) => {
                    const sx = -c.w / 2 + 8 + pi * ((c.w - 16) / 12)
                    const sy = -c.h / 2 + 8 + pi * ((c.h - 16) / 12)
                    return (
                      <g key={`mcu-pin-${pi}`}>
                        <rect x={sx - 1.8} y={-c.h / 2 - 6} width="3.6" height="6" fill="#bfc9d8" />
                        <rect x={sx - 1.8} y={c.h / 2} width="3.6" height="6" fill="#bfc9d8" />
                        <rect x={-c.w / 2 - 6} y={sy - 1.8} width="6" height="3.6" fill="#bfc9d8" />
                        <rect x={c.w / 2} y={sy - 1.8} width="6" height="3.6" fill="#bfc9d8" />
                      </g>
                    )
                  })}
                  <circle cx={-c.w / 2 + 12} cy={-c.h / 2 + 12} r="2.8" fill="#353d59" />
                  <text x="0" y="6" textAnchor="middle" fontSize="14" fill="#9dd9c3" fontFamily="Orbitron,monospace" fontWeight="700">
                    {c.label}
                  </text>
                </>
              )}

              {c.type === 'conn' && (
                <>
                  <rect x={-c.w / 2} y={-c.h / 2} width={c.w} height={c.h} rx="0" fill="#1a1c2b" stroke="#2e3650" />
                  {Array.from({ length: 8 }).map((_, pi) => (
                    <rect key={`${c.id}-slot-${pi}`} x={-c.w / 2 + 8 + pi * 10} y={-10} width="6" height="20" fill="#959cae" rx="0.6" />
                  ))}
                </>
              )}

              {c.type === 'rpack' && (
                <>
                  <rect x={-c.w / 2} y={-c.h / 2} width={c.w} height={c.h} rx="0.8" fill="#10162c" />
                  <rect x={-c.w / 2 + 4} y={-c.h / 2} width="5" height={c.h} fill={c.tint === 'amber' ? '#f0a61d' : '#2cd9ff'} />
                  <rect x={c.w / 2 - 9} y={-c.h / 2} width="5" height={c.h} fill={c.tint === 'amber' ? '#f0a61d' : '#2cd9ff'} />
                </>
              )}

              {c.type === 'led' && (
                <>
                  <rect x={-c.w / 2} y={-c.h / 2} width={c.w} height={c.h} fill="#1a2432" stroke={ledFill(c.tint)} strokeWidth="0.8" />
                  <circle className="board-led-halo" cx="0" cy="0" r="8" fill="url(#ledGlow)" />
                  <circle className="board-led-core" cx="0" cy="0" r="3.4" fill={ledFill(c.tint)} />
                </>
              )}

              {c.type === 'tp' && (
                <>
                  <circle cx="0" cy="0" r="10" fill="#0e1931" stroke="#2f3d66" strokeWidth="1" />
                  <circle cx="0" cy="0" r="7.8" fill="none" stroke="#1f3056" strokeWidth="1" />
                  <text x="0" y="3.4" textAnchor="middle" fontSize="7.2" fill="#78a8d4" fontFamily="Orbitron,monospace" fontWeight="700">
                    {c.label}
                  </text>
                </>
              )}
            </g>
          </g>
        ))}

        {components.map((c) => (
          <circle key={`${c.id}-flash`} className="solder-flash" cx={c.x} cy={c.y} r="10" fill="url(#flashGrad)" />
        ))}
      </svg>
    </div>
  )
}
