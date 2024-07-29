"use client"

import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";


const SearchBar = ({ className = '', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ml-[20px] mr-[30px] mt-2 items-center bg-gray-100 rounded-lg shadow-sm p-2 ${className}`}
    >
      <input

        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        className="flex-grow p-2 text-gray-700 text-xl rounded-lg focus:outline-none"
      />
      {/* <button
        type="submit"
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        <IoSearch size={25}/>
      </button> */}
    </form>
  );
};

export default SearchBar;
