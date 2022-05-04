import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={require("../Assets/Images/NukaColaLogo.png")} />
          </Link>
        </div>
        <nav className="navbar">
          <ul>
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="nav-item">Order</li>
            <li className="btn">Login</li>
            <li className="btn btn-outline">Register</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
