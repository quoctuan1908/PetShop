// eslint-disable-next-line no-unused-vars
import { Grid2, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router";
import { SpeciesCard } from "./SpeciesCard";

export const SpeciesList = (props) => {
  return (
    <div className="lg:w-[80%] m-auto">
      <Typography variant="h4">
        Choose your pets ! <EmojiNatureIcon fontSize="large" />
      </Typography>
      <Grid2
        container
        sx={{
          padding: "5px",
          border: "none",
          borderRadius: "5px",
          boxShadow: "2px 2px 2px 1px gray",
        }}
      >
        {
          // eslint-disable-next-line react/prop-types
          props.data.map((species) => {
            return (
              <Link key={species.id} to={`/pets/${species.id}`}>
                <SpeciesCard species={species} />
              </Link>
            );
          })
        }
      </Grid2>
    </div>
  );
};
