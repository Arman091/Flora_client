import { Search as SearchIcon } from "lucide-react";
import React from "react";

const Search = () => {
  return (
    <div className="ml-[23px] flex h-[30px] w-1/4 rounded-[3px] bg-white">
      <input
        placeholder="Search Items"
        className="h-full w-full border-0 bg-transparent pl-[15px] outline-none"
      />
      <SearchIcon size={24} className="p-[5px] text-blue" />
    </div>
  );
};
export default Search;
