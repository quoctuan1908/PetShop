// eslint-disable-next-line no-unused-vars
import { CardMedia, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import sadImage from "../../assets/images/admin/sadasf.jpg";

export const NoPage = () => {
  return (
    <div className="border text-center">
      <CardMedia
        component="img"
        sx={{
          objectFit: "cover",
          objectPosition: "top",
          width: "600px",
          margin: "auto",
        }}
        image={sadImage}
      />
      <Typography variant="h2" fontFamily={"fantasy"}>
        Sorry. There are nothing like that!
      </Typography>
    </div>
  );
};
