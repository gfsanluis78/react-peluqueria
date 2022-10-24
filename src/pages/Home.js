import React, { useState, useRef } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import LoginIcon from "@mui/icons-material/Login";
import API from "../components/api";

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

function Home() {
  const [isLogin, setisLogin] = useState(false);
  const [inputs, setInputs] = useState({
    password: "",
    email: "",
  });

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(LOGIN_URL, inputs).then((response) => {
        console.log(response.data)
        
      });;
      // TODO: remove console.logs before deployment
      //console.log(JSON.stringify(response))
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        console.log("No server");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
        console.log("User name Taken");
      } else {
        setErrMsg("Registration Failed");
        console.log("Fallo login: " + err);
      }
    console.log("Los datos son " + inputs.Email + " " + inputs.Password);

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
            <Typography level="h4" component="h1">
              Bienvenido!
            </Typography>
            <Typography level="body2">Registrese para continuar.</Typography>
          </div>
          <form onSubmit={handleForm}>
            <TextField
              // html input attribute
              onChange = {handleChange}
              name="email"
              value={inputs.email}
              autoComplete="off"
              required
              type="email"
              placeholder="johndoe@email.com"
              // pass down to FormLabel as children
              label="Email"
            />
            <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              autoComplete="off"
              required
              type="password"
              placeholder="password"
              label="Password"
            />
          </form>

          <Button
            endDecorator={<LoginIcon />}
            onClick={handleForm}
            sx={{ mt: 1 /* margin top */ }}
          >
            Log in
          </Button>
          <Typography
            //endDecorator={<Link href="/sign-up">Sign up</Link>}
            //fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Peluqueria Ariel
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </>
  );
}

export default Home;
