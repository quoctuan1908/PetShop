import { MenuItem, Select, TextField } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

export const TableSearchField = (props) => {
  const [searchOption, setSearchOption] = useState("id");

  const handleTableSearch = (e) => {
    // eslint-disable-next-line react/prop-types
    props.handleSearch(e.target.value, searchOption);
  };

  const handleChangeSearchOption = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div>
      <TextField
        id="searchBox"
        placeholder="Search"
        sx={{ width: "60%" }}
        onChange={handleTableSearch}
      />
      <Select value={searchOption} onChange={handleChangeSearchOption}>
        {
          // eslint-disable-next-line react/prop-types
          props.columns.map((column) => {
            return (
              <MenuItem key={column.id} value={column.id}>
                {column.label}
              </MenuItem>
            );
          })
        }
      </Select>
    </div>
  );
};
