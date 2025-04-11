import {
  Button,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import petService from "../../../services/pet.service";
import speciesService from "../../../services/species.service";
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

export const EditPetForm = (props) => {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line react/prop-types
  const [pet, setPet] = React.useState(props.pet);
  const [speciesList, setSpeciesList] = React.useState([]);
  const [supplierList, setSupplierList] = React.useState([]);
  const { showAlert } = useAlert();
  React.useEffect(() => {
    const loadDataList = async () => {
      setSpeciesList(await speciesService.findAll());
      setSupplierList(await supplierService.findAll());
    };
    loadDataList();
  }, []);
  const handleChangePet = async () => {
    const result = await petService.update(pet.id, pet);
    if (result.statusCode == 200) {
      showAlert(result.message, "success");
    } else showAlert(result.message, "error");
    console.log(result);
    // eslint-disable-next-line react/prop-types
    await props.handleRefresh();
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setPet((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleChangeImportPrice = async (e) => {
    const { name, value } = e.target;
    setPet((preState) => ({
      ...preState,
      [name]: value,
      ["selling_prices"]: (value * 1.1).toFixed(3),
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
        <Box sx={style} component="form" noValidate autoComplete="off">
          <FormControl>
            <DialogTitle className="text-center">Edit Pet</DialogTitle>
            <div className="grid grid-cols-2">
              <FormControl>
                <InputLabel id="demo-simple-select-label">Species</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pet.species_id}
                  name="species_id"
                  label="Species"
                  onChange={handleChange}
                >
                  {speciesList.map((species) => (
                    <MenuItem value={species.id} key={species.id}>
                      {species.species_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="supplier">Supplier</InputLabel>
                <Select
                  labelId="supplier"
                  id="supplier"
                  value={pet.seller_id}
                  label="Supplier"
                  name="seller_id"
                  onChange={handleChange}
                >
                  {supplierList.map((supplier) => (
                    <MenuItem value={supplier.id} key={supplier.id}>
                      {supplier.supplier_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="name"
                label="Name"
                value={pet.pet_name}
                variant="outlined"
                onChange={handleChange}
                name="pet_name"
              />
              <FormControl>
                <InputLabel id="Sex">Sex</InputLabel>
                <Select
                  labelId="sex"
                  id="sex"
                  value={pet.sex}
                  label="Sex"
                  name="sex"
                  onChange={handleChange}
                >
                  <MenuItem key={1} value={true}>
                    Male
                  </MenuItem>
                  <MenuItem key={0} value={false}>
                    Female
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="grid grid-cols-2">
              <FormControl>
                <InputLabel id="weight">Weight</InputLabel>
                <Input
                  id="weight"
                  placeholder="Weight (kilogram)"
                  type="number"
                  value={pet.weight}
                  onChange={handleChange}
                  name="weight"
                />
              </FormControl>
              <FormControl>
                <InputLabel id="age">Age</InputLabel>
                <Input
                  id="age"
                  placeholder="Age (year)"
                  type="number"
                  value={pet.age}
                  onChange={handleChange}
                  name="age"
                />
              </FormControl>
              <FormControl>
                <InputLabel id="import_prices">Import Prices</InputLabel>
                <Input
                  id="import_prices"
                  placeholder="Price ($)"
                  type="number"
                  value={pet.import_prices}
                  onChange={handleChangeImportPrice}
                  name="import_prices"
                />
              </FormControl>
              <FormControl>
                <InputLabel id="selling_prices">Selling Prices</InputLabel>
                <Input
                  id="selling_prices"
                  placeholder="Price ($)"
                  type="number"
                  value={pet.selling_prices}
                  name="selling_prices"
                  disabled
                />
              </FormControl>
              <FormControl>
                <InputLabel id="quantity">Quantity</InputLabel>
                <Input
                  id="quantity"
                  placeholder="Quantity"
                  type="number"
                  value={pet.quantity}
                  onChange={handleChange}
                  name="quantity"
                />
              </FormControl>
            </div>
            <FormControl>
              <TextareaAutosize
                id="desc"
                placeholder="Description"
                value={pet.description}
                variant="outlined"
                onChange={handleChange}
                name="description"
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={(e) => {
                handleChangePet(e);
                handleClose();
              }}
            >
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};
