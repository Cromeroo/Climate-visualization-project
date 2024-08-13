import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./shared/header/Navbar.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Proyecto from "./Pages/proyecto";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Biodiversidad from "./Pages/Biodiversidad/Biodiversidad.jsx";
import Footer from "./shared/footer/footer.jsx";
import Territorios from "././Pages/Territorios/Territorios.jsx";
import Variabilidad from "./Pages/Variabilidad-C/Variabilidad.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/proyecto" element={<Proyecto />} />
            <Route path="/Territorios" element={<Territorios />} />
            <Route path="/biodiversidad" element={<Biodiversidad />} />
            <Route path="/Variabilidad" element={<Variabilidad />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
