export default function BrandLogo({ size = 'nav' }) {
  const isFooter = size === 'footer'
  const iconSize = isFooter ? 32 : 28

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: isFooter ? 10 : 8 }}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* PCB board outline */}
        <rect x="2" y="2" width="28" height="28" rx="3" stroke="var(--accent-green)" strokeWidth="1.5" fill="none" />
        {/* IC chip body */}
        <rect x="9" y="9" width="14" height="14" rx="1.5" fill="var(--accent-green)" fillOpacity="0.15" stroke="var(--accent-green)" strokeWidth="1.5" />
        {/* Chip pins - left */}
        <line x1="2" y1="12" x2="9" y2="12" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="20" x2="9" y2="20" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Chip pins - right */}
        <line x1="23" y1="12" x2="30" y2="12" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="23" y1="20" x2="30" y2="20" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Chip pins - top */}
        <line x1="12" y1="2" x2="12" y2="9" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="2" x2="20" y2="9" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Chip pins - bottom */}
        <line x1="12" y1="23" x2="12" y2="30" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="23" x2="20" y2="30" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="16" cy="16" r="2.5" fill="var(--accent-green)" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 800,
          fontSize: isFooter ? 18 : 16,
          letterSpacing: isFooter ? 3 : 2,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
        }}>
          MICROTRON
        </span>
        {isFooter && (
          <span style={{
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: 10,
            letterSpacing: 2,
            color: 'var(--accent-green)',
            textTransform: 'uppercase',
            marginTop: 3,
          }}>
            India Technologies
          </span>
        )}
      </div>
    </div>
  )
}
