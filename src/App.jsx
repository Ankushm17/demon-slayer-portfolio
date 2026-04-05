import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import CrowsOverlay from './components/CrowsOverlay'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import './App.css'

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <div className="app-shell__backdrop" />
        <div className="app-shell__texture" />
        <CrowsOverlay />
        <div className="app-shell__content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
