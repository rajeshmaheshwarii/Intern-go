import React, {useEffect} from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Filter({ course , handleFilterChange }) {
  // Initialize state with a default selected category
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedPrice, setSelectedPrice] = React.useState("Paid");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };
 
  useEffect(() => {
    handleFilterChange(selectedCategory, selectedPrice);
  }, [selectedCategory, selectedPrice, handleFilterChange]);
  

  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      {/* Category Filter */}

      <FormControl sx={{ m: 1, minWidth: 190 }} variant="standard" color="secondary"> 
        <InputLabel sx={{color:'black',fontSize:'22px'}}>Select Course Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{ height: "40px" }}
        >
          <MenuItem value="All">All</MenuItem>
          {course.map((item, index) => (
            <MenuItem value={item.category} key={index}>
              {item.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Fee filter */}

      <FormControl sx={{ m: 1, minWidth: 100,flex:'1'}} variant="standard" color="secondary">
        <InputLabel sx={{color:'black',fontSize:'22px'}}>Price Filter</InputLabel>
        <Select

          value={selectedPrice}
          onChange={handlePriceChange}
          sx={{ height: "40px"}}
          
        >
          <MenuItem value="Free">Free</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
