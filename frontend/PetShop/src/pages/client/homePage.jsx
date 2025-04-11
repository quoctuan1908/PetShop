/* eslint-disable no-unused-vars */
import { Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router";
import carouselImage from "../../assets/images/homepage/carousel.jpeg";
import { SpeciesList } from "../../components/client/SpeciesList";
import speciesService from "../../services/species.service";

function CarouselImage(props) {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper
      sx={{
        height: 700,
        backgroundImage: `url(${carouselImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="text-[30px] text-center text-white backdrop-blur-sm p-3">
        <div>Give love, receive joy </div>
        <div>Pet paradise just for you!</div>
        <Button className="CheckButton">
          <Link to="/pets">Check it out!</Link>
        </Button>
      </div>
    </Paper>
  );
}

export const HomePage = () => {
  const [speciesList, setSpeciesList] = useState([]);
  const fetchSpecies = async () => {
    const getSpecies = await speciesService.findAll();
    setSpeciesList(getSpecies);
  };
  useEffect(() => {
    fetchSpecies();
  }, []);
  return (
    <div>
      <CarouselImage />

      <SpeciesList data={speciesList} />
    </div>
  );
};
