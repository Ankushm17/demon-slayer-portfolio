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
            <ChatBox />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
