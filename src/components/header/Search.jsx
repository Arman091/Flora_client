import { InputBase, styled, Box } from "@mui/material";
import { Search as SearchIcon } from "lucide-react";
import React from "react";

const SearchBarCSS = styled(Box)`
  background: #fff;
  width: 25%;
  height: 30px;
  margin-left: 23px;
  border-radius: 3px;
  display: flex;
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
        <SearchIcon size={24} className="text-[blue] p-[5px]" />
      </Box>
    </SearchBarCSS>
  );
};
export default Search;
