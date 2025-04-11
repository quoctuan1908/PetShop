import { Button, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import supplierService from "../../../services/supplier.service";
export const AddSupplierForm = (props) => {
  const [supplier, setSupplier] = React.useState({
    supplier_name: "",
    address: "",
    contact: "",
  });
  const { showAlert } = useAlert();

  const handleAddSupplier = async () => {
    const result = await supplierService.create(supplier);
    console.log(result);
    if (result.statusCode == 200) {
      showAlert(result.message, "success");
    } else showAlert(result.message, "error");
    // eslint-disable-next-line react/prop-types
    props.closeModal();
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

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      <DialogTitle className="text-center">New Supplier</DialogTitle>
      <div className="grid grid-cols-3">
        <TextField
          id="name"
          label="Name"
          value={supplier.name}
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
          label="Phone number"
          value={supplier.phone_number}
          variant="outlined"
          onChange={handleChange}
          name="phone_number"
        />
      </div>
      <div className="text-center">
        <Button variant="contained" onClick={handleAddSupplier}>
          Submit
        </Button>
      </div>
    </Box>
  );
};
