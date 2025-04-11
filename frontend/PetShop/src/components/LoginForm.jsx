// eslint-disable-next-line no-unused-vars
import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router";
import loginImage from "../assets/images/login/img3.jpg";
import { useAlert } from "../hooks/AlertContext";
import accountService from "../services/account.service";

export const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { showAlert } = useAlert();

  const handleLogin = async (event) => {
    event.preventDefault();
    const login = await accountService.login(username, password);
    if (login.statusCode == 200) {
      showAlert(login.message, "success");
      if (localStorage.getItem("role") == "ADMIN") location.href = "/admin";
      else location.href = "/";
    } else showAlert(login.message, "error");
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <CardMedia
          component="img"
          sx={{ objectFit: "cover", objectPosition: "top" }}
          image={loginImage}
          alt=""
        />
      </div>
      <div className="text-center m-auto">
        <Typography variant="h3">Get Started</Typography>
        <Box component="form" onSubmit={handleLogin} className="p-6">
          <TextField
            label="Username"
            variant="outlined"
            className="w-full"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            className="w-full"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <h6 className="m-2">
            Don&#39;t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </h6>
          <Button variant="contained" type="submit" className="w-full">
            Login
          </Button>
        </Box>
      </div>
    </div>
  );
};
