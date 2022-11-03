import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <br />
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <Link to="/empleados">Empleados</Link>
      <Link to="/tipodetrabajos">Tipos de trabajos</Link>
      <Link to="/trabajos">trabajos</Link>
      <Link to="/turnos">Turnos</Link>
    </section>
  );
};

export default LinkPage;
