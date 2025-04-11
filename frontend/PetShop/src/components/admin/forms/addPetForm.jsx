import {
  Button,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextareaAutosize,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import petService from "../../../services/pet.service";
import speciesService from "../../../services/species.service";
import supplierService from "../../../services/supplier.service";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const AddPetForm = (props) => {
  const [pet, setPet] = React.useState({
    species_id: "",
    seller_id: "",
    pet_name: "",
    weight: "",
    age: "",
    sex: "",
    selling_prices: "",
    import_prices: "",
    quantity: "",
    description: "",
  });
  const [image, setImage] = React.useState();
  const [speciesList, setSpeciesList] = React.useState([]);
  const [supplierList, setSupplierList] = React.useState([]);
  const { showAlert } = useAlert();

  const handleAddPet = async () => {
    const result = await petService.create(pet, image);
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

  React.useEffect(() => {
    const loadDataList = async () => {
      setSpeciesList(await speciesService.findAll());
      setSupplierList(await supplierService.findAll());
    };
    loadDataList();
  }, []);

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      <DialogTitle className="text-center">New Pet</DialogTitle>
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
          <InputLabel id="import_prices">Import prices</InputLabel>
          <Input
            id="import_prices"
            placeholder="Import prices ($)"
            type="number"
            value={pet.price}
            onChange={handleChangeImportPrice}
            name="import_prices"
          />
        </FormControl>
        <FormControl>
          <InputLabel id="selling_prices">
            Selling prices (110% of import prices)
          </InputLabel>
          <Input
            id="selling_prices"
            placeholder="Selling prices ($)"
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
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
          name="image"
        />
      </Button>
      <Button variant="contained" onClick={handleAddPet}>
        Submit
      </Button>
    </Box>
  );
};
