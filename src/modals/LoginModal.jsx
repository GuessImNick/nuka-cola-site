import React, { useEffect } from "react";
import { useState } from "react";

const LoginModal = ({ show, onClose, setUser }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginEmailOnchange = (e) => {
    setLoginEmail(e.target.value);
  };

  const loginPasswordOnChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const login = async () => {
    if (loginEmail && loginPassword) {
      const res = await fetch("http://localhost:8088/users");
      const res1 = await res.json();
      const users = await res1;
      const foundUser = users.find((user) => {
         return user.email === loginEmail.toLowerCase() && user.password === loginPassword
      })
      if(foundUser){
        localStorage.setItem("nuka_user", JSON.stringify(foundUser))
      setUser(JSON.parse(localStorage.getItem("nuka_user")));
      setLoginEmail("")
      setLoginPassword("")
      onClose();
      } else {
          window.alert('Incorrect email or password')
      }
      
    } else {
        window.alert('Please enter all of your information')
    }
  };

  if (!show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Login</h2>
        </div>
        <div className="modal-body">
          <form>
            <label htmlFor="loginEmail">E-Mail</label>
            <input
              type="email"
              name="loginEmail"
              id="loginEmail"
              placeholder="E-Mail"
              value={loginEmail}
              onChange={loginEmailOnchange}
            />
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              placeholder="Password"
              value={loginPassword}
              onChange={loginPasswordOnChange}
            />
          </form>
          <div className="btn-group-2">
            <button className="btn" onClick={() => login()}>
              Login
            </button>
            <button onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
