// App.js (o donde sea que lo estés utilizando)
import React from 'react';
import './App.css'; // Importa otros estilos CSS locales si es necesario
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Map from './Mapa/Map';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Proyecto from './Pages/proyecto';
import Territorios from './Pages/territorios';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <div className="p-4 border rounded">
          <Map />
        </div>
        <Routes>
          <Route path="/proyecto" element={<Proyecto />} />
          <Route path="/territorios" element={<Territorios />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
