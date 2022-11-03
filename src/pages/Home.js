import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/tipodetrabajor">Go to the Tipos de Trabajos</Link>
      <br />
      <Link to="/trabajos">Go to the Trabajos page</Link>
      <br />
      <Link to="/turnos">Go to the Turnos</Link>
      <br />
      <Link to="/empleados">Go to the Empleados page</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <br />
      <br />
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
