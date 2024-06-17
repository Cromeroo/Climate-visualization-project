import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./shared/header/Navbar.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Proyecto from "./Pages/proyecto";
import Territorios from "./Pages/territorios";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Espacios from "./Pages/Espacios";
import Footer from "./shared/footer/footer.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/territorios" element={<Territorios />} />
        <Route path="/espacios" element={<Espacios />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
