import {
  Button,
  Checkbox,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import itemUsageService from "../../../services/item_usage.service";
import petItemService from "../../../services/pet_item.service";
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

export const EditItemForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(props.item);
  const { showAlert } = useAlert();
  const speciesList = props.speciesList;
  const supplierList = props.supplierList;
  const speciesListForItem = props.speciesListForItem;
  const fillerSpeciesForItem = (item_id) => {
    const speciesNamesList = speciesListForItem
      .filter((itemUsage) => itemUsage.PetItemId == item_id)
      .map((filledItem) => filledItem.SpeciesId);
    return speciesNamesList;
  };
  const [speciesNames, setSpeciesNames] = React.useState(
    fillerSpeciesForItem(item.id)
  );

  const handleChangeItem = async () => {
    const ItemUpdateResult = await petItemService.update(item.id, item);
    if (ItemUpdateResult.statusCode == 200) {
      showAlert(ItemUpdateResult.message, "success");
    } else showAlert(ItemUpdateResult.message, "error");
    if (speciesNames.length != speciesListForItem.length) {
      await itemUsageService.delete(item.id);
      speciesNames.forEach(async (name) => {
        await itemUsageService.create(item.id, name);
      });
    }
    console.log(ItemUpdateResult);
    await props.handleRefresh();
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setItem((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const handleOpen = () => {
    setOpen(true);
    console.log(props);
  };
  const handleClose = () => setOpen(false);
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
  const handleIncludeSpecies = (event) => {
    const {
      target: { value },
    } = event;
    setSpeciesNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
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
            <DialogTitle className="text-center">Edit Item</DialogTitle>
            <TextField
              id="name"
              label="Name"
              value={item.item_name}
              variant="outlined"
              onChange={handleChange}
              name="item_name"
            />
            <div className="grid grid-cols-2">
              <FormControl>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={speciesNames}
                  className="overflow-hidden"
                  onChange={handleIncludeSpecies}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {
                    // eslint-disable-next-line react/prop-types
                    speciesList.map((species) => (
                      <MenuItem key={species.id} value={species.id}>
                        <Checkbox
                          checked={speciesListForItem.includes(species.id)}
                        />
                        <ListItemText primary={species.species_name} />
                      </MenuItem>
                    ))
                  }
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
                  {
                    // eslint-disable-next-line react/prop-types
                    supplierList.map((supplier) => (
                      <MenuItem value={supplier.id} key={supplier.id}>
                        {supplier.supplier_name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>
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
            <FormControl>
              <InputLabel id="quantity">Quantity</InputLabel>
              <Input
                id="quantity"
                placeholder="Quantity"
                type="number"
                value={item.quantity}
                onChange={handleChange}
                name="quantity"
              />
            </FormControl>
            <div className="grid grid-cols-2">
              <FormControl>
                <InputLabel id="import_prices">Import Prices</InputLabel>
                <Input
                  id="import_prices"
                  placeholder="Price ($)"
                  type="number"
                  value={item.import_prices}
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
                  value={item.selling_prices}
                  name="selling_prices"
                  disabled
                />
              </FormControl>
            </div>
            <Button
              variant="contained"
              onClick={(e) => {
                handleChangeItem(e);
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

EditItemForm.propTypes = {
  speciesListForItem: PropTypes.array,
  item: PropTypes.object,
  speciesList: PropTypes.array,
  supplierList: PropTypes.array,
  handleRefresh: PropTypes.func,
};
