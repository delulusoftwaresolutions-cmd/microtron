import logoImage from '../assets/microtron-logo.png'

export default function BrandLogo({ size = 'nav' }) {
  const logoSizes = {
    nav: 'clamp(128px, 12vw, 186px)',
    footer: 'clamp(128px, 12vw, 186px)',
  }
  const logoWidth = logoSizes[size] || logoSizes.nav

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: logoWidth,
        maxWidth: '100%',
        lineHeight: 0,
      }}
    >
      <img
        src={logoImage}
        alt="Microtron India Technologies Pvt. Ltd."
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 14px rgba(var(--accent-green-rgb), 0.22))',
        }}
      />
    </div>
  )
}
