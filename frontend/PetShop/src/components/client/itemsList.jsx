// eslint-disable-next-line no-unused-vars
import {
  Box,
  Grid2,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Typography,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { PetCard } from "./PetCard";

export const ItemsList = (props) => {
  // eslint-disable-next-line react/prop-types
  const [items, setItems] = useState(props.data);
  const [sortOption, setSortOption] = useState(0);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const ITEMS_PER_PAGE = 14;

  useEffect(() => {
    const sortedItems = [...items];
    console.log(page);
    console.log(sortedItems);
    switch (sortOption) {
      case 0:
        sortedItems.sort((a, b) => a.item_name.localeCompare(b.item_name));
        break;
      case 1:
        sortedItems.sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
        break;
      case 2:
        sortedItems.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        break;
      default:
        break;
    }
    setItems(sortedItems);
  }, [sortOption, page]);

  return (
    <div className="text-center">
      <Typography variant="h3" className="text-green-700">
        Choose items for your pets!
      </Typography>
      <Select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <MenuItem value={0}>Sort by name</MenuItem>
        <MenuItem value={1}>Sort from newest to oldest</MenuItem>
        <MenuItem value={2}>Sort from oldest to newest</MenuItem>
      </Select>
      <Paper
        sx={{
          padding: "16px",
          margin: "16px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Grid2
            container
            sx={{
              padding: "5px",
            }}
          >
            {items
              .slice(
                page * ITEMS_PER_PAGE,
                page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
              )
              .map((item) => (
                <Link key={item.id} to={`/items/${item.id}`}>
                  <PetCard pet={item} />
                </Link>
              ))}
          </Grid2>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Pagination
            count={items.length / ITEMS_PER_PAGE}
            page={page}
            onChange={handleChangePage}
            size="large"
          />
        </Box>
      </Paper>
    </div>
  );
};
