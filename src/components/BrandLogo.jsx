export default function BrandLogo({ size = 'nav' }) {
  const isFooter = size === 'footer'
  const iconSize = isFooter ? 32 : 28
  const textSize = isFooter ? 18 : 16
  const subSize = isFooter ? 9 : 8

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: isFooter ? 10 : 8, userSelect: 'none' }}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* PCB-style circuit icon */}
        <rect x="1" y="1" width="30" height="30" rx="4" stroke="var(--accent-green)" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="4" fill="var(--accent-green)" opacity="0.9" />
        <circle cx="16" cy="16" r="2" fill="var(--bg-primary)" />
        {/* Trace lines */}
        <line x1="16" y1="12" x2="16" y2="5" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="20" x2="16" y2="27" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="16" x2="5" y2="16" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="16" x2="27" y2="16" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Corner pads */}
        <rect x="3" y="3" width="4" height="4" rx="1" fill="var(--accent-green)" opacity="0.5" />
        <rect x="25" y="3" width="4" height="4" rx="1" fill="var(--accent-green)" opacity="0.5" />
        <rect x="3" y="25" width="4" height="4" rx="1" fill="var(--accent-green)" opacity="0.5" />
        <rect x="25" y="25" width="4" height="4" rx="1" fill="var(--accent-green)" opacity="0.5" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 800,
          fontSize: textSize,
          letterSpacing: 2,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
        }}>
          MICROTRON
        </span>
        <span style={{
          fontFamily: 'Source Sans 3, sans-serif',
          fontWeight: 400,
          fontSize: subSize,
          letterSpacing: 1.5,
          color: 'var(--accent-green)',
          textTransform: 'uppercase',
          marginTop: 2,
        }}>
          India Technologies
        </span>
      </div>
    </div>
  )
}
