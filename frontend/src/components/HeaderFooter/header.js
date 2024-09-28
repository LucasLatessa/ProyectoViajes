import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    loginWithRedirect();
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header-principal">
      <div className="logo">
        <Link to="/">CarShare</Link>
      </div>
      <nav className={`nav-bar ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <button onClick={handleProfileClick}>Profile</button>
        ) : (
          <button onClick={handleLoginClick}>Login</button>
        )}
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};
