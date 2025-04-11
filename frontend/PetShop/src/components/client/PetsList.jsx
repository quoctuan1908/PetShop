import {
  Box,
  Grid2,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Typography,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { PetCard } from "./PetCard";

export const PetsList = (props) => {
  const { speciesId } = useParams();
  // eslint-disable-next-line react/prop-types
  const [pets, setPets] = useState(props.data);
  const [sortOption, setSortOption] = useState(0);
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const ITEMS_PER_PAGE = 14;

  useEffect(() => {
    const sortedPets = [...pets];
    console.log(page);
    console.log(sortedPets);
    switch (sortOption) {
      case 0:
        sortedPets.sort((a, b) => a.pet_name.localeCompare(b.pet_name));
        break;
      case 1:
        sortedPets.sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
        break;
      case 2:
        sortedPets.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        break;
      default:
        break;
    }
    setPets(sortedPets);
  }, [sortOption, page]);

  return (
    <div className="text-center">
      <Typography variant="h3" className="text-green-700">
        Choose your pet!
      </Typography>
      <Select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <MenuItem value={0}>Sort by name</MenuItem>
        <MenuItem value={1}>Sort from newest to oldest</MenuItem>
        <MenuItem value={2}>Sort from oldest to newest</MenuItem>
      </Select>
      <Paper
        sx={{
          padding: "16px",
          margin: "16px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Grid2
            container
            sx={{
              padding: "5px",
            }}
          >
            {pets
              .slice(
                (page - 1) * ITEMS_PER_PAGE,
                page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
              )
              .map((pet) => (
                <Link key={pet.id} to={`/pets/${speciesId}/${pet.id}`}>
                  <PetCard pet={pet} />
                </Link>
              ))}
          </Grid2>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Pagination
            count={Math.floor(pets.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={handleChangePage}
            size="large"
          />
        </Box>
      </Paper>
    </div>
  );
};
