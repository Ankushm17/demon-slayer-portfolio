import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
]

const email = 'ankushmadan17@gmail.com'

const Navbar = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-brand">
          <p className="eyebrow">Upper Moon 3</p>
          <h1 className="site-title">Ankush Madan</h1>
          <a className="site-email" href={`mailto:${email}`}>{email}</a>
        </div>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
