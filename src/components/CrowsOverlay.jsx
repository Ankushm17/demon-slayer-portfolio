const crows = [
  { top: '10%', size: '0.95rem', duration: '18s', delay: '0s' },
  { top: '22%', size: '1.15rem', duration: '24s', delay: '-6s' },
  { top: '34%', size: '0.8rem', duration: '20s', delay: '-11s' },
  { top: '48%', size: '1.25rem', duration: '26s', delay: '-4s' },
  { top: '58%', size: '0.9rem', duration: '19s', delay: '-14s' },
  { top: '72%', size: '1.05rem', duration: '23s', delay: '-8s' },
]

const CrowsOverlay = () => {
  return (
    <div className="crows-overlay" aria-hidden="true">
      {crows.map((crow, index) => (
        <span
          key={`${crow.top}-${index}`}
          className="crow"
          style={{
            '--crow-top': crow.top,
            '--crow-size': crow.size,
            '--crow-duration': crow.duration,
            '--crow-delay': crow.delay,
          }}
        >
          <span className="crow__wing crow__wing--left" />
          <span className="crow__wing crow__wing--right" />
          <span className="crow__body" />
        </span>
      ))}
    </div>
  )
}

export default CrowsOverlay
