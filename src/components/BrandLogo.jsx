export default function BrandLogo({ size = 'nav' }) {
  const isNav = size === 'nav'
  const iconSize = isNav ? 28 : 24
  const fontSize = isNav ? 18 : 15
  const subtitleSize = isNav ? 8 : 7

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: isNav ? 10 : 8, userSelect: 'none' }}>
      <svg
        width={iconSize}
        height={Math.round(iconSize * 0.958)}
        viewBox="0 0 48 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
          fill="var(--accent-green, #00ff88)"
        />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 800,
            fontSize: fontSize,
            letterSpacing: 2,
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
          }}
        >
          Microtron
        </span>
        <span
          style={{
            fontFamily: 'Source Sans 3, sans-serif',
            fontWeight: 500,
            fontSize: subtitleSize,
            letterSpacing: 1.5,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            marginTop: 2,
          }}
        >
          India Technologies
        </span>
      </div>
    </div>
  )
}
