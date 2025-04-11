import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

import Rating from "@mui/material/Rating"; // For adding rating stars
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAlert } from "../../hooks/AlertContext";
import item_usageService from "../../services/item_usage.service";
import petItemService from "../../services/pet_item.service";
import speciesService from "../../services/species.service";
import { API_IMAGE_PATH } from "../../utils";

export const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [count, setCount] = useState(1);
  const [itemsUsage, setItemsUsage] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const petData = await petItemService.findOne(itemId);
        const fetchItemsUsage = await item_usageService.findAll();
        const fetchSpeciesList = await speciesService.findAll();
        setItem(petData || {});
        setItemsUsage(fetchItemsUsage || []);
        setSpeciesList(fetchSpeciesList || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleAddToCard = () => {
    setIsClick(true);
    if (!localStorage.getItem("token")) {
      showAlert("You have to login first");
      location.href = "/login";
      return;
    }
    const cartItem = {
      seller_id: item.seller_id,
      buyer_id: JSON.parse(localStorage.getItem("account"))?.id,
      merchandise_id: item.id,
      quantity: count,
      price: item.selling_prices,
      image: item.image,
      name: item.item_name,
    };
    const cartKey = cartItem.buyer_id;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    let isInShoppingCart = false;
    cart.map((item) => {
      if (item.merchandise_id == cartItem.merchandise_id) {
        isInShoppingCart = true;
        item.quantity += cartItem.quantity;
      }
    });
    if (!isInShoppingCart) {
      cart.push(cartItem);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    showAlert("Add item to cart successfully", "success");
  };

  const fillerSpeciesForItem = (item_id) => {
    const species_name_per_item = [];
    itemsUsage
      .filter((itemUsage) => itemUsage.PetItemId == item_id)
      .forEach((filledItem) =>
        speciesList.forEach((species) =>
          species.id === filledItem.SpeciesId
            ? species_name_per_item.push(species.species_name)
            : null
        )
      );
    return species_name_per_item;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="lg:grid lg:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="lg:col-span-1">
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              maxWidth: 500,
              height: "auto",
              objectFit: "cover",
              objectPosition: "top",
              margin: "0 auto",
              borderRadius: "5px",
              boxShadow: "2px 2px 5px gray",
            }}
            image={API_IMAGE_PATH + (item.image || "")}
            alt={item.item_name || "Product Image"}
          />
        </div>

        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            padding: "20px",
          }}
        >
          <Typography variant="h4" gutterBottom fontFamily="sans-serif">
            {item.item_name || "Loading..."}
          </Typography>
          <Rating
            name="read-only"
            value={5}
            readOnly
            precision={0.5}
            sx={{ mb: 2 }}
          />
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textDecoration: "line-through", color: "gray" }}
          >
            $
            {item.selling_prices
              ? (item.selling_prices * 1.5).toFixed(2)
              : "0.00"}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            color="error"
            fontFamily="sans-serif"
          >
            ${item.selling_prices || "0.00"}
          </Typography>
          <div className="flex items-center justify-between mt-4">
            <ButtonGroup>
              <Button
                aria-label="reduce"
                onClick={() => setCount(Math.max(count - 1, 1))}
                disabled={count === 1}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Typography variant="h6" sx={{ px: 2 }}>
                {count}
              </Typography>
              <Button
                aria-label="increase"
                onClick={() =>
                  setCount(Math.min(count + 1, item.quantity || 1))
                }
                disabled={count === item.quantity}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCard}
              disabled={!item.quantity || item.quantity <= 0 || isClick}
            >
              Add to Cart
            </Button>
          </div>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" paragraph>
            <b>Description:</b>{" "}
            {item.description ||
              "A premium pet item designed for comfort and durability."}
          </Typography>
          <div className="grid grid-cols-2 gap-4 mt-4 font-sans">
            <div>
              <Typography variant="body2">
                <b>Mfg Date:</b>{" "}
                {new Date(item.mfg_date).toDateString() || "N/A"}
              </Typography>
              <Typography variant="body2">
                <b>Exp Date:</b>{" "}
                {new Date(item.exp_date).toDateString() || "N/A"}
              </Typography>
              <Typography variant="body2">
                <b>Available:</b> {item.quantity > 0 ? "Yes" : "No"}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                <b>Origin:</b> {item.origin || "N/A"}
              </Typography>
              <Typography variant="body2">
                <b>Material:</b> {item.material || "N/A"}
              </Typography>
              <Typography variant="body2">
                <b>Remain:</b> {item.quantity || 0}
              </Typography>
            </div>
          </div>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <b>Suit for:</b>{" "}
            {fillerSpeciesForItem(item.id).join(", ") || "All species"}
          </Typography>
        </Box>
      </div>
    </div>
  );
};
