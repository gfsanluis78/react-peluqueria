import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LinkPage from "./pages/LinkPage";
import RequireAuth from "./pages/RequireAuth";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Layout from "./pages/Layout";
import Editor from "./pages/Editor";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Empleados from "./pages/Empleados";
import Trabajos from "./pages/Trabajos";
import TipoDetrabajos from "./pages/TipoDeTrabajos";
import Turnos from "./pages/Turnos";
import Logout from "./pages/Logout";
import Missing from "./pages/Missing";

import Error from "./pages/Error";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5001,
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route exact path="login" element={<Login />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
            <Route exact path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="empleados" element={<Empleados />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="trabajos" element={<Trabajos />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="tipoDeTrabajos" element={<TipoDetrabajos />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="turnos" element={<Turnos />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="logout" element={<Logout />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
