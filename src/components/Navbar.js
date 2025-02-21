import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🎮 The Mystery of University Library</div>
      <div className="navbar-links">
        <Link to="/">Головна</Link>
        <Link to="/about">Про гру</Link>
        <Link to="/gallery">Галерея</Link>
        <Link to="/news">Новини</Link>
      </div>
    </nav>
  );
};

export default Navbar;
