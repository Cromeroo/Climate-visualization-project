// App.js (o donde sea que lo estés utilizando)
import React from 'react';
import './App.css'; // Importa otros estilos CSS locales si es necesario
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';

import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Proyecto from './Pages/proyecto';
import Territorios from './Pages/territorios';
import HomePage from './Pages/HomePage.jsx';
import Espacios from './Pages/Espacios';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proyecto" element={<Proyecto />} />
          <Route path="/territorios" element={<Territorios />} />
          <Route path="/espacios" element={<Espacios />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
