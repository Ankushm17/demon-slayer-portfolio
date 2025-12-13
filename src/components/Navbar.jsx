import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // ✅ Hide navbar on non-home pages
  if (location.pathname !== '/') return null;

  return (
    <nav className="navbar">
      <NavLink to="/" end>HOME</NavLink>
      <NavLink to="/about">ABOUT</NavLink>
      <NavLink to="/projects">PROJECTS</NavLink>
    </nav>
  );
};

export default Navbar;
