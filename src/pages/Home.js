import React, { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import LoginIcon from "@mui/icons-material/Login";

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
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log(inputs);
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
              onChange={handleChange}
              name="email"
              value={inputs.email}
              type="email"
              placeholder="johndoe@email.com"
              // pass down to FormLabel as children
              label="Email"
            />
            <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
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
