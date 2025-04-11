// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ItemsList } from "../../components/client/itemsList";
import petItemService from "../../services/pet_item.service";

export const ItemsPage = () => {
  const params = useParams();
  const [items, setItems] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    const fetchItems = async () => {
      if (params.speciesId)
        setItems(await petItemService.findItemsWithSpeciesId(params.speciesId));
      else setItems(await petItemService.findAll("*"));
      setIsLoad(true);
    };
    fetchItems();
  }, [params.speciesId]);

  return <div>{isLoad ? <ItemsList data={items} /> : ""}</div>;
};
