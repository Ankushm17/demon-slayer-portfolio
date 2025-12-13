import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
// import Projects from './pages/Projects'; (Create this file similarly)
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        
        {/* These stay on screen permanently */}
        <Navbar />
        
        {/* Only this part changes when you click links */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/projects" element={<Projects />} /> */}
        </Routes>

        
      </div>
    </HashRouter>
  );
}

export default App;