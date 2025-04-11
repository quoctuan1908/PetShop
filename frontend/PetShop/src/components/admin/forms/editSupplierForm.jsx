/* eslint-disable react/prop-types */
import EditIcon from "@mui/icons-material/Edit";
import { DialogTitle, FormControl, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import supplierService from "../../../services/supplier.service";
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

export default function SupplierEditForm(props) {
  const [open, setOpen] = React.useState(false);
  const [supplier, setSupplier] = React.useState(props.supplier);
  const { showAlert } = useAlert();

  const handleChangeSupplier = async (e, id) => {
    const result = await supplierService.update(id, supplier);
    if (result.statusCode == 200) {
      showAlert(result.message, "success");
    } else showAlert(result.message, "error");
    console.log(result);
    // eslint-disable-next-line react/prop-types
    await props.handleRefresh();
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSupplier((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const handleOpen = () => {
    setOpen(true);
    console.log(props);
  };
  const handleClose = () => setOpen(false);

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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <DialogTitle className="text-center">Edit Supplier</DialogTitle>
            <TextField
              id="name"
              label="Name"
              value={supplier.supplier_name}
              variant="outlined"
              onChange={handleChange}
              name="supplier_name"
            />
            <TextField
              id="address"
              label="Address"
              value={supplier.address}
              variant="outlined"
              onChange={handleChange}
              name="address"
            />
            <TextField
              id="contact"
              label="Contact"
              value={supplier.phone_number}
              variant="outlined"
              onChange={handleChange}
              name="phone_number"
            />
            <Button
              variant="outlined"
              onClick={(e) => {
                handleChangeSupplier(e, supplier.id);
                handleClose();
              }}
            >
              Save change
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
