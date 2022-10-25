import React, { useState, useRef, useContext, useEffect } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import LoginIcon from "@mui/icons-material/Login";
import API from "../components/api";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation, useSubmit } from "react-router-dom";

const LOGIN_URL = "Administradores/loginweb";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    console.log(email);
    console.log(password);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      const response = await API.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true
        }
      ).then((response) => {
        console.log("La respuesta es " + JSON.stringify(response?.data));
        setEmail("");
        setPassword("");
      });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Email o password incorrecto");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      console.log("Los datos son " + { email, password });
      
    }
  };

  return (
    <>
      <CssVarsProvider>
        <ModeToggle />
        <Sheet
          sx={{
            width: 300,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
        >
          <div>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <Typography level="h4" component="h1">
              Bienvenido!
            </Typography>
            <Typography level="body2">Registrese para continuar.</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="johndoe@email.com"
              label="email"
            />
            <TextField
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="password"
              label="Password"
            />
            <div>
              <Button
                endDecorator={<LoginIcon />}
                type="submit"
                value="Submit"
                sx={{ mt: 3 /* margin top */, display: "flex", mx: "auto" }}
              >
                Log in
              </Button>
            </div>
          </form>

          <Typography sx={{ alignSelf: "center" }}>Peluqueria Ariel</Typography>
        </Sheet>
      </CssVarsProvider>
    </>
  );
}

export default Login;
