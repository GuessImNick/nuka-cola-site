import { useState, useEffect } from "react";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Products from "./Pages/Products.jsx";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Orders from "./Pages/Orders/Orders.jsx";

function Nuka() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("nuka_user")));
  }, []);

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders user={user} />} />
      </Routes>
    </div>
  );
}

export default Nuka;
