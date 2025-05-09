import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../src/components/layout/header/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes";

import { BrowserRouter } from "react-router-dom";
import Footer from "./components/layout/footer/Footer.jsx";

import { AuthProvider } from "./components/login/authcontext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <div className="content">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
