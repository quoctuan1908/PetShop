// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PetsList } from "../../components/client/PetsList";
import petService from "../../services/pet.service";

export const PetsPage = () => {
  const params = useParams();
  const [pets, setPets] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      if (params.speciesId)
        setPets(await petService.findPetsWithSpeciesId(params.speciesId));
      else setPets(await petService.findAll("*"));
      setIsLoad(true);
    };
    fetchPets();
  }, [params.speciesId]);

  return <div>{isLoad ? <PetsList data={pets} /> : ""}</div>;
};
