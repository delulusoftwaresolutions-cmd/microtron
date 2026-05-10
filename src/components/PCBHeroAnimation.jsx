import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const components = [
  { x: 120, y: 80, w: 60, h: 40, type: 'ic', label: 'U1' },
  { x: 220, y: 60, w: 30, h: 20, type: 'cap', label: 'C1' },
  { x: 260, y: 100, w: 50, h: 30, type: 'ic', label: 'U2' },
  { x: 80,  y: 160, w: 20, h: 10, type: 'res', label: 'R1' },
  { x: 110, y: 160, w: 20, h: 10, type: 'res', label: 'R2' },
  { x: 160, y: 150, w: 40, h: 40, type: 'qfp', label: 'MCU' },
  { x: 220, y: 155, w: 25, h: 15, type: 'cap', label: 'C2' },
  { x: 270, y: 160, w: 20, h: 10, type: 'res', label: 'R3' },
  { x: 80,  y: 220, w: 30, h: 20, type: 'conn', label: 'J1' },
  { x: 140, y: 230, w: 15, h: 15, type: 'led', label: 'D1' },
  { x: 170, y: 230, w: 15, h: 15, type: 'led', label: 'D2' },
  { x: 200, y: 230, w: 15, h: 15, type: 'led', label: 'D3' },
  { x: 240, y: 220, w: 50, h: 30, type: 'ic', label: 'U3' },
]

export default function PCBHeroAnimation() {
  const svgRef = useRef(null)
  const tl = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const compEls = svg.querySelectorAll('.pcb-comp')
    const traces = svg.querySelectorAll('.trace-line')
    const flashes = svg.querySelectorAll('.solder-flash')
    const leds = svg.querySelectorAll('.led-glow')

    gsap.set(compEls, { opacity: 0, y: -30 })
    gsap.set(traces, { strokeDashoffset: 500, opacity: 0 })
    gsap.set(flashes, { opacity: 0, scale: 0 })

    tl.current = gsap.timeline({ delay: 0.5 })

    // Board slide in
    tl.current.from(svg, { x: 150, opacity: 0, duration: 1.0, ease: 'power3.out' })

    // Place components one by one
    compEls.forEach((el, i) => {
      tl.current.to(el, { opacity: 1, y: 0, duration: 0.35, ease: 'bounce.out' }, `+=0.05`)
      const flash = flashes[i]
      if (flash) {
        tl.current.to(flash, { opacity: 1, scale: 1.5, duration: 0.15, ease: 'power2.out' }, '<+0.1')
        tl.current.to(flash, { opacity: 0, scale: 0.5, duration: 0.2, ease: 'power2.in' }, '<+0.15')
      }
    })

    // Light up traces
    traces.forEach((trace, i) => {
      tl.current.to(trace, { strokeDashoffset: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' }, `<+0.08`)
    })

    // Pulse LEDs
    leds.forEach((led, i) => {
      gsap.to(led, { opacity: 0.3, duration: 0.8 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5 })
    })

    return () => { if (tl.current) tl.current.kill() }
  }, [])

  return (
    <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
      <svg ref={svgRef} viewBox="0 0 380 310" width="100%" style={{ filter: 'drop-shadow(0 0 40px rgba(0,255,136,0.2))' }}>
        {/* PCB Board */}
        <rect x="60" y="30" width="260" height="250" rx="8" fill="#0d2a1a" stroke="#1a4a2a" strokeWidth="2"/>
        {/* Mounting holes */}
        {[[70,40],[310,40],[70,270],[310,270]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#0A0E1A" stroke="#2a5a3a" strokeWidth="1.5"/>
        ))}
        {/* Board edge highlight */}
        <rect x="60" y="30" width="260" height="250" rx="8" fill="none" stroke="#00aa55" strokeWidth="0.5" opacity="0.4"/>

        {/* Background trace grid */}
        <g opacity="0.12" stroke="#00FF88" strokeWidth="0.5">
          <line x1="80" y1="30" x2="80" y2="280"/><line x1="120" y1="30" x2="120" y2="280"/>
          <line x1="160" y1="30" x2="160" y2="280"/><line x1="200" y1="30" x2="200" y2="280"/>
          <line x1="240" y1="30" x2="240" y2="280"/><line x1="280" y1="30" x2="280" y2="280"/>
          <line x1="60" y1="70" x2="320" y2="70"/><line x1="60" y1="110" x2="320" y2="110"/>
          <line x1="60" y1="150" x2="320" y2="150"/><line x1="60" y1="190" x2="320" y2="190"/>
          <line x1="60" y1="230" x2="320" y2="230"/>
        </g>

        {/* Copper traces - animated */}
        <g fill="none">
          <path className="trace-line" d="M150 100 L190 100 L190 130 L200 130" stroke="#D4860A" strokeWidth="2" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
          <path className="trace-line" d="M180 170 L220 170 L220 160" stroke="#D4860A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
          <path className="trace-line" d="M100 180 L140 180 L140 160" stroke="#D4860A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
          <path className="trace-line" d="M155 238 L185 238" stroke="#00FF88" strokeWidth="1" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
          <path className="trace-line" d="M215 238 L245 238 L245 220" stroke="#00FF88" strokeWidth="1" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
          <path className="trace-line" d="M80 100 L110 100 L110 160" stroke="#D4860A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
          <path className="trace-line" d="M250 85 L310 85 L310 155" stroke="#D4860A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
          <path className="trace-line" d="M100 240 L140 240" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500"/>
        </g>

        {/* Solder points */}
        <g fill="#D4860A" opacity="0.7">
          {[[150,100],[190,130],[180,170],[100,180],[155,170],[245,220],[310,155]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="3"/>
          ))}
        </g>

        {/* Components */}
        {components.map((c, i) => (
          <g key={i} className="pcb-comp" transform={`translate(${c.x},${c.y})`}>
            {c.type === 'ic' && (
              <>
                <rect x={-c.w/2} y={-c.h/2} width={c.w} height={c.h} rx="2" fill="#1a1a2e" stroke="#334"/>
                <rect x={-c.w/2+4} y={-c.h/2+4} width={c.w-8} height={c.h-8} rx="1" fill="#0d0d1a" stroke="#555" strokeWidth="0.5"/>
                {/* Pins left */}
                {[0.3,0.5,0.7].map((t,pi) => <rect key={pi} x={-c.w/2-4} y={-c.h/2+c.h*t-2} width="5" height="3" fill="#aaa" rx="0.5"/>)}
                {[0.3,0.5,0.7].map((t,pi) => <rect key={pi} x={c.w/2} y={-c.h/2+c.h*t-2} width="5" height="3" fill="#aaa" rx="0.5"/>)}
                <text x="0" y="4" textAnchor="middle" fontSize="7" fill="#00FF88" fontFamily="Orbitron,monospace">{c.label}</text>
              </>
            )}
            {c.type === 'cap' && (
              <>
                <ellipse cx="0" cy="0" rx={c.w/2} ry={c.h/2} fill="#2a1a0a" stroke="#D4860A" strokeWidth="1"/>
                <line x1="-4" y1="0" x2="4" y2="0" stroke="#D4860A" strokeWidth="1.5"/>
                <text x="0" y={c.h/2+8} textAnchor="middle" fontSize="5" fill="#8899BB" fontFamily="Rajdhani,sans-serif">{c.label}</text>
              </>
            )}
            {c.type === 'res' && (
              <>
                <rect x={-c.w/2} y={-c.h/2} width={c.w} height={c.h} rx="3" fill="#c4501a"/>
                <rect x={-c.w/2+2} y={-c.h/2} width="3" height={c.h} fill="#c8960a"/>
                <rect x={-c.w/2+8} y={-c.h/2} width="3" height={c.h} fill="#1a1aaa"/>
                <text x="0" y={c.h/2+7} textAnchor="middle" fontSize="5" fill="#8899BB" fontFamily="Rajdhani,sans-serif">{c.label}</text>
              </>
            )}
            {c.type === 'qfp' && (
              <>
                <rect x={-c.w/2} y={-c.h/2} width={c.w} height={c.h} rx="2" fill="#111" stroke="#333"/>
                <rect x={-c.w/2+3} y={-c.h/2+3} width={c.w-6} height={c.h-6} rx="1" fill="#0a0a0a" stroke="#222" strokeWidth="0.5"/>
                {[0.2,0.35,0.5,0.65,0.8].map((t,pi) => [
                  <rect key={`l${pi}`} x={-c.w/2-4} y={-c.h/2+c.h*t-1.5} width="5" height="2.5" fill="#aaa" rx="0.5"/>,
                  <rect key={`r${pi}`} x={c.w/2} y={-c.h/2+c.h*t-1.5} width="5" height="2.5" fill="#aaa" rx="0.5"/>,
                  <rect key={`t${pi}`} x={-c.w/2+c.w*t-1.5} y={-c.h/2-4} width="2.5" height="5" fill="#aaa" rx="0.5"/>,
                  <rect key={`b${pi}`} x={-c.w/2+c.w*t-1.5} y={c.h/2} width="2.5" height="5" fill="#aaa" rx="0.5"/>,
                ])}
                <circle cx="-c.w/4" cy="-c.h/4" r="3" fill="none" stroke="#00FF88" strokeWidth="0.5" opacity="0.5"/>
                <text x="0" y="4" textAnchor="middle" fontSize="6" fill="#00FF88" fontFamily="Orbitron,monospace">{c.label}</text>
              </>
            )}
            {c.type === 'conn' && (
              <>
                <rect x={-c.w/2} y={-c.h/2} width={c.w} height={c.h} rx="1" fill="#222" stroke="#444"/>
                {[0,1,2].map(pi => <rect key={pi} x={-c.w/2+4+pi*8} y={-c.h/2+4} width="5" height={c.h-8} rx="0.5" fill="#666"/>)}
                <text x="0" y={c.h/2+8} textAnchor="middle" fontSize="5" fill="#8899BB" fontFamily="Rajdhani,sans-serif">{c.label}</text>
              </>
            )}
            {c.type === 'led' && (
              <>
                <rect x={-c.w/2} y={-c.h/2} width={c.w} height={c.h} rx="2" fill="#0a2a0a" stroke="#00FF88" strokeWidth="0.5"/>
                <circle className="led-glow" cx="0" cy="0" r="4" fill="#00FF88" opacity="0.9"/>
                <text x="0" y={c.h/2+8} textAnchor="middle" fontSize="5" fill="#8899BB" fontFamily="Rajdhani,sans-serif">{c.label}</text>
              </>
            )}
          </g>
        ))}

        {/* Solder flash effects */}
        {components.map((c, i) => (
          <circle key={i} className="solder-flash" cx={c.x} cy={c.y} r="12" fill="none" stroke="#fff" strokeWidth="2" opacity="0"/>
        ))}

        {/* Silkscreen labels */}
        <text x="75" y="42" fontSize="6" fill="#aaa" fontFamily="Rajdhani,sans-serif" opacity="0.6">MICROTRON</text>
        <text x="200" y="285" fontSize="5" fill="#aaa" fontFamily="Rajdhani,sans-serif" opacity="0.5" textAnchor="middle">REV 2.1 - PCB-MT-001</text>

        {/* Corner brackets */}
        <g stroke="#00FF88" strokeWidth="1.5" fill="none" opacity="0.6">
          <path d="M64 50 L64 34 L78 34"/><path d="M316 50 L316 34 L302 34"/>
          <path d="M64 260 L64 276 L78 276"/><path d="M316 260 L316 276 L302 276"/>
        </g>
      </svg>

      {/* Scan line effect */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 8 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(transparent, rgba(0,255,136,0.15), transparent)', animation: 'scanLine 3s linear infinite' }} />
      </div>
      <style>{`@keyframes scanLine { 0%{top:-10%} 100%{top:110%} }`}</style>
    </div>
  )
}
