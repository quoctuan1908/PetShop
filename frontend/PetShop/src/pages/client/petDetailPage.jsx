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
import Rating from "@mui/material/Rating";

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAlert } from "../../hooks/AlertContext";
import petService from "../../services/pet.service";
import supplierService from "../../services/supplier.service";
import { API_IMAGE_PATH } from "../../utils";

export const PetDetailPage = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState({});
  const [sellerName, setSellerName] = useState("");
  const [count, setCount] = useState(1);
  const [isClick, setIsClick] = useState(false);
  const { showAlert } = useAlert();
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petData = await petService.findOne(petId);
        setPet(petData || {});
        const sellerData = await supplierService.findOne(petData?.seller_id);
        setSellerName(sellerData?.supplier_name || "Unknown Seller");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPet();
  }, [petId]);

  const handleAddToCard = () => {
    setIsClick(true);
    if (!localStorage.getItem("token")) {
      showAlert("You have to login first");
      location.href = "/login";
      return;
    }
    const cartItem = {
      seller_id: pet.seller_id,
      buyer_id: JSON.parse(localStorage.getItem("account"))?.id,
      merchandise_id: pet.id,
      quantity: count,
      price: pet.selling_prices,
      image: pet.image,
      name: pet.pet_name,
    };
    const cartKey = cartItem.buyer_id;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    let isInCart = false;
    cart.map((item) => {
      if (item.merchandise_id == cartItem.merchandise_id) {
        item.quantity += cartItem.quantity;
        isInCart = true;
      }
    });
    if (!isInCart) cart.push(cartItem);
    showAlert("Add pet to cart successfully");
    localStorage.setItem(cartKey, JSON.stringify(cart));
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
            image={API_IMAGE_PATH + (pet.image || "")}
            alt={pet.pet_name || "Pet Image"}
          />
        </div>

        {/* Details Section */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            padding: "20px",
            margin: "auto",
          }}
        >
          <Typography variant="h4" gutterBottom fontFamily="sans-serif">
            {pet.pet_name || "Loading..."}
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
            {pet.selling_prices
              ? (pet.selling_prices * 1.5).toFixed(2)
              : "0.00"}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            color="error"
            fontFamily="sans-serif"
          >
            ${pet.selling_prices || "0.00"}
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
                onClick={() => setCount(Math.min(count + 1, pet.quantity || 1))}
                disabled={count === pet.quantity}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCard}
              disabled={!pet.quantity || pet.quantity <= 0 || isClick}
            >
              Add to Cart
            </Button>
          </div>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" paragraph>
            <b>Description:</b>{" "}
            {pet.description ||
              "A premium pet available for adoption or purchase."}
          </Typography>
          <div className="grid grid-cols-2 gap-4 mt-4 font-sans">
            <div>
              <Typography variant="body2">
                <b>Age:</b> {pet.age ? `${pet.age} months` : "N/A"}
              </Typography>
              <Typography variant="body2">
                <b>Sex:</b> {pet.sex ? "Male" : "Female" || "N/A"}
              </Typography>
              <Typography variant="body2">
                <b>Available:</b> {pet.quantity > 0 ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <b>Seller:</b> {sellerName}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                <b>Weight:</b> {pet.weight ? `${pet.weight} kg` : "N/A"}
              </Typography>
              <Typography variant="body2">
                <b>Remain:</b> {pet.quantity || 0}
              </Typography>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
