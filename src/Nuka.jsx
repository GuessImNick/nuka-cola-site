import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Products from "./Pages/Products.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Nuka() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default Nuka;
