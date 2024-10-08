import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const categories = ["All Categories", "Men", "Women", "Kids"];

const Category = ({ onFilterChange }) => {
  const handleCategoryChange = (event) => {
    onFilterChange(
      event.target.value === "All Categories" ? "all" : event.target.value
    );
  };

  return (
    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
      <InputLabel>Category</InputLabel>
      <Select label="Category" onChange={handleCategoryChange} defaultValue="">
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;
