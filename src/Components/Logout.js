import { useNavigate, useLocation} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
    Modal,
    Button,
  } from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
    modal: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    iconos: {
      cursor: "pointer",
    },
    inputMaterial: {
      width: "100%",
    },
  }));

const Logout = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const styles = useStyles();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
  
    const logout = async () => {
      // if used in more components, this should be in context
      // axios to /logout endpoint
      setAuth({});
      navigate(from, { replace: true });
    };

    const mantener = async () => {
        abrirCerrarModalLogout()
        navigate("/");
    }

    const [modalLogout, setModalLogout] = useState(true);

    const abrirCerrarModalLogout = () => {
        setModalLogout(!modalLogout);
      };

    const bodyLogout = (
        <div className={styles.modal}>
          <p>
            Estás seguro que deseas desloguerase {" "}
            <b>
            </b>{" "}
            ?{" "}
          </p>
          <div align="right">
            <Button color="secondary" onClick={() => logout()}>
              Sí
            </Button>
            <Button onClick={() => mantener() }>No</Button>
          </div>
        </div>
      );


    return (
      <div>
        <Modal open={modalLogout} onClose={abrirCerrarModalLogout}>
        {bodyLogout}
      </Modal>
      </div>
    )
  }

export default Logout;
