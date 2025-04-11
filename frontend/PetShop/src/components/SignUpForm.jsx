// eslint-disable-next-line no-unused-vars
import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router";
import signupImage from "../assets/images/login/sleepyheads.jpg";
import { useAlert } from "../hooks/AlertContext";
import accountService from "../services/account.service";

export const SignUpForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const { showAlert } = useAlert();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!usernameError && !confirmPasswordError && !passwordError) {
      const signup = await accountService.signup(username, password, "USER");
      if (signup.statusCode == 200) {
        showAlert(signup.message, "success");
        location.href = "/login";
      } else showAlert(signup.message, "error");
    }
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    if (!event.target.value) {
      setPasswordError("Password cannot be null");
    } else if (event.target.value.length < 8)
      setPasswordError("Password must be at least 8 characters long");
    else {
      setPasswordError(false);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (event.target.value.length < 4)
      setUsernameError("Username must be at least 4 characters long.");
    else if (!/^[a-zA-Z0-9]+$/.test(event.target.value))
      setUsernameError("Username mustn't contain special characters");
    else {
      setUsernameError(false);
    }
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value != password)
      setConfirmPasswordError("Passwords do not match");
    else {
      setConfirmPasswordError(false);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <CardMedia
          component="img"
          sx={{ objectFit: "cover", objectPosition: "top" }}
          image={signupImage}
          alt=""
        />
      </div>
      <div className="text-center m-auto">
        <Typography variant="h3">Join Us Now</Typography>
        <Box
          component="form"
          onSubmit={handleSignUp}
          noValidate
          className="p-6"
        >
          <TextField
            label="Username"
            variant="outlined"
            className="w-full"
            value={username}
            onChange={handleUsernameChange}
            error={usernameError != false}
            helperText={usernameError}
          />
          <br />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            className="w-full"
            value={password}
            onChange={handleChangePassword}
            error={passwordError != false}
            helperText={passwordError}
          />
          <br />
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            className="w-full"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            error={confirmPasswordError != false}
            helperText={confirmPasswordError}
          />
          <br />
          <h6 className="m-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </h6>
          <Button variant="contained" type="submit" className="w-full">
            Sign Up
          </Button>
        </Box>
      </div>
    </div>
  );
};
