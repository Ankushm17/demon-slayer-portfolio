import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); 

  return (
    <nav className="navbar">
      {/* Button 1 */}
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Home
      </Link>

      {/* Button 2 */}
      <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
        About
      </Link>

      {/* Button 3 */}
      <Link to="/projects" className={location.pathname === "/projects" ? "active" : ""}>
        Projects
      </Link>
    </nav>
  );
};

export default Navbar;