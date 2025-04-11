import {
  Button,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import speciesService from "../../../services/species.service";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "50ch",
};

export const EditSpeciesForm = (props) => {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line react/prop-types
  const [species, setSpecies] = React.useState(props.species);
  const { showAlert } = useAlert();

  const handleChangeSupplier = async () => {
    const result = await speciesService.update(species.id, species);
    if (result.statusCode == 200) {
      showAlert(result.message, "success");
    } else showAlert(result.message, "error");
    console.log(result);
    // eslint-disable-next-line react/prop-types
    await props.handleRefresh();
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSpecies((preState) => ({
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
          <FormControl sx={{ width: "100%" }}>
            <DialogTitle className="text-center">Edit Species</DialogTitle>
            <TextField
              id="name"
              label="Name"
              value={species.species_name}
              variant="outlined"
              onChange={handleChange}
              name="species_name"
            />
            <FormControl>
              <InputLabel id="average_age">Average age</InputLabel>
              <Input
                id="average_age"
                placeholder="Average age"
                type="number"
                value={species.average_age}
                onChange={handleChange}
                name="average_age"
              />
            </FormControl>
            <TextareaAutosize
              id="desc"
              placeholder="Description"
              value={species.description}
              variant="outlined"
              onChange={handleChange}
              name="description"
              style={{ height: "50px", padding: "5px" }}
            />
            <Button
              variant="contained"
              onClick={(e) => {
                handleChangeSupplier(e);
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
};
