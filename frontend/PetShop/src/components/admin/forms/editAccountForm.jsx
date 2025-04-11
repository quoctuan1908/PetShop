/* eslint-disable react/prop-types */
import EditIcon from "@mui/icons-material/Edit";
import {
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import accountService from "../../../services/account.service";
import userService from "../../../services/user.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AccountEditForm(props) {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState(props.account.role);
  const [user, setUser] = React.useState({});
  const { showAlert } = useAlert();

  const handleOpen = async () => {
    setOpen(true);
    if (props.account.role !== "ADMIN") {
      const user = await userService.findOne(props.account.id);
      setUser(user);
    }
    console.log(props);
  };
  const handleClose = () => setOpen(false);
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const handleChangeAccountForm = async (event) => {
    event.preventDefault();
    const result = await accountService.changeRole(props.account.id, role);
    if (result.statusCode == 200) {
      showAlert(result.message, "success");
    } else showAlert(result.message, "error");
    await props.handleRefresh();
    console.log(result);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        <EditIcon sx={{ color: "blue" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className={props.account.role !== "ADMIN" ? "grid grid-cols-2" : ""}
          >
            {props.account.role !== "ADMIN" && (
              <Box>
                <Typography>
                  <strong>ID:</strong> {user.id}
                </Typography>
                <Typography>
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {user.gender ? "Male" : "Female"}
                </Typography>
                <Typography>
                  <strong>Birthday:</strong>{" "}
                  {user.birthday
                    ? new Date(user.birthday).toLocaleDateString()
                    : "N/A"}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {user.address || "N/A"}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {user.email || "N/A"}
                </Typography>
                <Typography>
                  <strong>Phone Number:</strong> {user.phone_number || "N/A"}
                </Typography>
              </Box>
            )}
            <FormControl sx={{ m: 1, minWidth: 120, margin: "auto" }}>
              <DialogTitle className="text-center">Change Role</DialogTitle>
              <Select
                value={role}
                onChange={handleChangeRole}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                <MenuItem value={"USER"}>USER</MenuItem>
                <MenuItem value={"STAFF"}>STAFF</MenuItem>
              </Select>
              <Button
                variant="contained"
                onClick={(e) => {
                  handleChangeAccountForm(e);
                  handleClose();
                }}
              >
                Save change
              </Button>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
