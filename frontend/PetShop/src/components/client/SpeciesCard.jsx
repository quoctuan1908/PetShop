import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { CardMedia } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import * as React from "react";

import { API_IMAGE_PATH } from "../../utils";

export const SpeciesCard = (props) => {
  return (
    <Card sx={{ width: 200, height: 400, overflow: "clip", margin: "2px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: 250, objectFit: "cover", objectPosition: "top" }}
          image={
            // eslint-disable-next-line react/prop-types
            API_IMAGE_PATH + props.species.image
          }
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
              // eslint-disable-next-line react/prop-types
              props.species.species_name
            }
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {
              // eslint-disable-next-line react/prop-types
              (props.species.average_age * 0.85).toFixed(1)
            }
            -
            {
              // eslint-disable-next-line react/prop-types
              (props.species.average_age * 1.15).toFixed(1)
            }{" "}
            years
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {
              // eslint-disable-next-line react/prop-types
              props.species.description
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
