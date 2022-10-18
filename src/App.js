import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Empleados from "./pages/Empleados";
import Trabajos from "./pages/Trabajos";
import TipoDetrabajos from "./pages/TipoDeTrabajos";
import Turnos from "./pages/Turnos";
import Logout from "./pages/Logout";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/trabajos" element={<Trabajos />} />
          <Route path="/tipoDeTrabajos" element={<TipoDetrabajos />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
