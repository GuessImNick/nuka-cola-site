import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginModal from "../modals/LoginModal.jsx";
import RegisterModal from "../modals/RegisterModal.jsx";
import { useNavigate } from 'react-router-dom';

const Header = ({ user, setUser }) => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);
  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("nuka_user");
    setUser();
    navigate("/")
  };

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
            <li className="nav-item">
              <Link to="/orders">Order</Link>
            </li>
            {user ? (
              <li
                className="btn"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </li>
            ) : (
              <>
                <li
                  className="btn"
                  onClick={() => {
                    setLoginModalShow(true);
                  }}
                >
                  Login
                </li>
                <li
                  className="btn btn-outline"
                  onClick={() => {
                    setRegisterModalShow(true);
                  }}
                >
                  Register
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <LoginModal
        show={loginModalShow}
        onClose={() => setLoginModalShow(false)}
        setUser={setUser}
      />
      <RegisterModal
        show={registerModalShow}
        onClose={() => setRegisterModalShow(false)}
      />
    </header>
  );
};

export default Header;
