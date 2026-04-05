import { useRef } from 'react'
import backgroundImage from '../assets/background.jpeg'
import zenitsuAudio from '../assets/nezuko-chan-zenitsu.mp3'
import ChatBox from '../components/ChatBox'
import Runner from '../components/Runner'

const Home = () => {
  const audioRef = useRef(null)

  const handleZenitsuClick = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    void audioRef.current.play()
  }

  return (
    <main className="page-shell">
      <audio ref={audioRef} src={zenitsuAudio} preload="auto" />

      <section className="hero-runner-strip">
        <Runner
          className="runner-badge--banner"
          onClick={handleZenitsuClick}
          label="Play Zenitsu audio"
        />
      </section>

      <section className="hero-showcase hero-showcase--home">
        <div className="hero-showcase__media hero-showcase__media--home">
          <img
            src={backgroundImage}
            alt="Demon Slayer inspired castle backdrop"
            className="hero-showcase__image"
          />
          <div className="hero-showcase__veil" />
          <div className="hero-showcase__spotlight" />
          <div className="hero-showcase__frame" aria-hidden="true" />

          <div className="home-chat-stage">
            <div className="home-chat-stage__intro">
              <p className="eyebrow">Crow Messenger</p>
              <h2 className="hero-showcase__title">Step into the castle and leave a message.</h2>
            </div>

            <article className="info-card chat-panel home-chat-panel">
              <div className="section-heading">
                <p className="section-label">Incoming Crows</p>
                <h3 className="section-title">Crow Messenger</h3>
              </div>
              <ChatBox />
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
