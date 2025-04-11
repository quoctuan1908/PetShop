import {
  Button,
  Checkbox,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import itemUsageService from "../../../services/item_usage.service";
import petItemService from "../../../services/pet_item.service";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AddItemForm = (props) => {
  const [item, setItem] = React.useState({
    seller_id: "",
    item_name: "",
    mfg_date: "",
    exp_date: "",
    origin: "",
    material: "",
    quantity: "",
    selling_prices: "",
    import_prices: "",
    image: "",
  });
  const [image, setImage] = React.useState();
  const [speciesList, setSpeciesList] = React.useState([]);
  const [supplierList, setSupplierList] = React.useState([]);
  const [speciesListForItem, setSpeciesListForItem] = React.useState([]);
  const { showAlert } = useAlert();

  React.useEffect(() => {
    const loadDataList = async () => {
      setSpeciesList(await speciesService.findAll());
      setSupplierList(await supplierService.findAll());
    };
    loadDataList();
  }, []);
  const handleAddItem = async () => {
    console.log(image);
    const result = await petItemService.create(item, image);
    if (result) {
      showAlert(result.message, "success");
      speciesListForItem.map(async (nameTag) => {
        console.log(nameTag);
        await itemUsageService.create(result.id, nameTag);
      });
    } else {
      showAlert(result.message, "error");
    }
    // eslint-disable-next-line react/prop-types
    props.closeModal();
    // eslint-disable-next-line react/prop-types
    await props.handleRefresh();
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setItem((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const handleChangeMfgDate = async (e) => {
    const name = "mfg_date";
    const value = e.$d;
    setItem((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const handleChangeExpDate = async (e) => {
    const name = "exp_date";
    const value = e.$d;
    setItem((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const handleChangeImportPrice = async (e) => {
    const { name, value } = e.target;
    setItem((preState) => ({
      ...preState,
      [name]: value,
      ["selling_prices"]: (value * 1.1).toFixed(3),
    }));
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "50ch" } }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <DialogTitle className="text-center">New Item</DialogTitle>
        <div className="grid grid-cols-3">
          <TextField
            id="name"
            label="Name"
            value={item.item_name}
            variant="outlined"
            onChange={handleChange}
            name="item_name"
          />

          <TextField
            id="material"
            label="Material"
            value={item.material}
            variant="outlined"
            onChange={handleChange}
            name="material"
          />
          <TextField
            id="origin"
            label="Origin"
            value={item.origin}
            variant="outlined"
            onChange={handleChange}
            name="origin"
          />
        </div>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="grid grid-cols-2">
              <DatePicker
                label="Mfg Date"
                defaultValue={dayjs(item.mfg_date)}
                onChange={handleChangeMfgDate}
                disableFuture
                name="mfg_date"
              />
              <DatePicker
                label="Expire Date"
                defaultValue={dayjs(item.exp_date)}
                onChange={handleChangeExpDate}
                disablePast
                name="exp_date"
              />
            </div>
          </LocalizationProvider>
          <FormControl>
            <Input
              id="quantity"
              placeholder="Quantity"
              type="number"
              value={item.quantity}
              onChange={handleChange}
              name="quantity"
            />
          </FormControl>
          <FormControl>
            <Input
              id="import_prices"
              placeholder="Import prices per item ($)"
              type="number"
              value={item.import_prices}
              onChange={handleChangeImportPrice}
              name="import_prices"
            />
          </FormControl>
          <FormControl>
            <Input
              id="selling_prices"
              placeholder="Price per item ($)"
              type="number"
              value={item.selling_prices}
              name="selling_prices"
            />
          </FormControl>
        </FormControl>
        <div className="grid grid-cols-2">
          <FormControl>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={speciesListForItem}
              onChange={(e) => {
                setSpeciesListForItem(e.target.value);
              }}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {speciesList.map((species) => (
                <MenuItem key={species.id} value={species.id}>
                  <Checkbox checked={speciesListForItem.includes(species.id)} />
                  <ListItemText primary={species.species_name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="supplier">Supplier</InputLabel>
            <Select
              labelId="supplier"
              id="supplier"
              value={item.seller_id}
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
        </div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
            name="image"
          />
        </Button>
        <Button variant="outlined" onClick={handleAddItem}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};
