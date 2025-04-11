import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { API_IMAGE_PATH } from "../../utils";

export const PetCard = (props) => {
  return (
    <Card sx={{ width: 200, fontFamily: "se", height: 400, margin: "2px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: 250, objectFit: "cover", objectPosition: "top" }}
          image={
            // eslint-disable-next-line react/prop-types
            API_IMAGE_PATH + props.pet.image
          }
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
              // eslint-disable-next-line react/prop-types
              props.pet.pet_name
            }
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {
              // eslint-disable-next-line react/prop-types
              props.pet.selling_prices
            }{" "}
            $
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
