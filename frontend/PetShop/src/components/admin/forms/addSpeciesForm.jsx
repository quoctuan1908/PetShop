import {
  Button,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  styled,
  TextareaAutosize,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as React from "react";
import { useAlert } from "../../../hooks/AlertContext";
import speciesService from "../../../services/species.service";
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

export const AddSpeciesForm = (props) => {
  const [species, setSpecies] = React.useState({
    species_name: "",
    average_age: 0,
    description: "",
  });
  const [image, setImage] = React.useState();
  const { showAlert } = useAlert();

  const handleAddSpecies = async () => {
    const result = await speciesService.create(species, image);
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
    setSpecies((preState) => ({
      ...preState,
      [name]: value,
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
        <DialogTitle className="text-center">New Species</DialogTitle>
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
        <FormControl>
          <TextareaAutosize
            style={{ height: "50px" }}
            id="desc"
            placeholder="Description"
            value={species.description}
            variant="outlined"
            onChange={handleChange}
            name="description"
          />
        </FormControl>
        <div className="grid grid-cols-2">
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
          <Button variant="contained" onClick={handleAddSpecies}>
            Submit
          </Button>
        </div>
      </FormControl>
    </Box>
  );
};
