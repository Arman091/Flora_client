import { InputBase, styled, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const SearchBarCSS = styled(Box)`
  background: #fff;
  width: 25%;
  height: 30px;
  margin-left: 23px;
  margin-top:23px;
  border-radius: 3px;
  margin-bottom: 7px;
  display: flex;
`;
const SIcon = styled(SearchIcon)`
  /* height: 20px; */
  color: blue;
  padding: 5px;
`;
const InputCSS = styled(InputBase)`
  padding-left: 15px;
  width: 100%; ;
`;

const Search = () => {
  return (
    <SearchBarCSS>
      <InputCSS placeholder="Search Items" />
      <Box>
        <SIcon />
      </Box>
    </SearchBarCSS>
  );
};
export default Search;
