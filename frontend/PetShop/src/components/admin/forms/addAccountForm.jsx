import {
  Button,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import accountService from "../../../services/account.service";

export const AddAccountForm = (props) => {
  const { showAlert } = useAlert();
  const [account, setAccount] = React.useState({
    username: "",
    password: "",
    role: "",
  });
  const [isError, setIsError] = React.useState(false);
  const handleAddAccount = async () => {
    if (
      isError ||
      account.username == "" ||
      account.password == "" ||
      account.role == ""
    )
      return;
    const result = await accountService.signup(
      account.username,
      account.password,
      account.role
    );
    console.log(result);
    if (result.statusCode != 200) {
      showAlert(result.message, "error");
    }
    // eslint-disable-next-line react/prop-types
    props.closeModal();
    // eslint-disable-next-line react/prop-types
    await props.handleRefresh();
  };

  const handleError = (event) => {
    setIsError(event.target.value);
    if (!event.target.value) {
      setIsError("This field cannot be null");
    } else if (event.target.value.length < 4)
      setIsError("Must be at least 4 characters long");
    else {
      setIsError(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    handleError(e);
    setAccount((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <DialogTitle className="text-center">New Account</DialogTitle>
        <TextField
          id="username"
          label="Username"
          value={account.username}
          variant="outlined"
          onChange={handleChange}
          name="username"
        />
        <TextField
          id="password"
          label="Password"
          value={account.password}
          variant="outlined"
          onChange={handleChange}
          name="password"
        />
        <FormControl>
          <InputLabel id="role">Role</InputLabel>
          <Select
            id="role"
            name="role"
            value={account.role}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"USER"}>USER</MenuItem>
            <MenuItem value={"STAFF"}>STAFF</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddAccount}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};
