import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react';
import '../styles/Navbar.css'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link to="/">InoxWeld</Link>
        </div>
        <div 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`navbar__links ${isOpen ? 'active' : ''}`}>
        <li><NavLink to="/" end onClick={() => setIsOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/services" onClick={() => setIsOpen(false)}>Services</NavLink></li>
        <li><NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink></li>
        <li><NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink></li>
      </ul>
    </nav>
  )
}
