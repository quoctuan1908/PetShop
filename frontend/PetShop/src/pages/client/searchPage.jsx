// eslint-disable-next-line no-unused-vars
import { CardMedia, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import sadImage from "../../assets/images/admin/sadasf.jpg";
import { PetsList } from "../../components/client/PetsList";
import { ItemsList } from "../../components/client/itemsList";
import petService from "../../services/pet.service";
import petItemService from "../../services/pet_item.service";

export const SearchPage = () => {
  const { type, id } = useParams();
  const [items, setItems] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const fetchData = async () => {
    if (type) {
      setItems(await petService.findAll(id));
    } else {
      setItems(await petItemService.findAll(id));
    }
    setIsLoad(true);
  };

  useEffect(() => {
    fetchData();
    console.log("hello");
  }, [type, id]);

  return (
    <div>
      {items.length == 0 ? (
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
      ) : (
        <div>
          {isLoad ? (
            type ? (
              <PetsList data={items} />
            ) : (
              <ItemsList data={items} />
            )
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
