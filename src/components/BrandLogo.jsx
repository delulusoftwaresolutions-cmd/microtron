function BrandMark({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="6.7" y="6.7" width="10.6" height="10.6" rx="1.3" stroke="var(--accent-green)" strokeWidth="1.8" />
      <path d="M9.8 6.7V4.2M12 6.7V4.2M14.2 6.7V4.2M9.8 19.8V17.3M12 19.8V17.3M14.2 19.8V17.3" stroke="var(--accent-green)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.7 9.8H4.2M6.7 12H4.2M6.7 14.2H4.2M19.8 9.8H17.3M19.8 12H17.3M19.8 14.2H17.3" stroke="var(--accent-green)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="var(--accent-green)" />
    </svg>
  )
}

export default function BrandLogo({ size = 'nav' }) {
  const isFooter = size === 'footer'
  const titleSize = isFooter ? 29 : 17
  const subtitleSize = isFooter ? 9.8 : 8.3
  const iconSize = isFooter ? 21 : 17

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 0' }}>
      <BrandMark size={iconSize} />
      <div style={{ lineHeight: 1 }}>
        <div
          style={{
            fontFamily: 'Orbitron,sans-serif',
            fontWeight: 700,
            fontSize: titleSize,
            letterSpacing: 2.4,
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
          }}
        >
          MICRO<span style={{ color: 'var(--accent-green)' }}>TRON</span>
        </div>
        <div
          style={{
            marginTop: isFooter ? 5 : 4,
            fontFamily: 'Orbitron,sans-serif',
            fontWeight: 500,
            fontSize: subtitleSize,
            letterSpacing: 3.2,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}
        >
          INDIA TECHNOLOGIES
        </div>
      </div>
    </div>
  )
}
