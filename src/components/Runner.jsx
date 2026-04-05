import runGif from '../assets/demon-slayer-run.gif'

const Runner = ({ className = '', onClick, label = 'Zenitsu' }) => {
  const runnerClassName = className ? `runner-badge ${className}` : 'runner-badge'

  if (onClick) {
    return (
      <button
        type="button"
        className={`${runnerClassName} runner-badge--interactive`}
        onClick={onClick}
        aria-label={label}
      >
        <img src={runGif} alt="" className="runner-badge__image" />
      </button>
    )
  }

  return (
    <div className={runnerClassName} aria-hidden="true">
      <img src={runGif} alt="" className="runner-badge__image" />
    </div>
  )
}

export default Runner
