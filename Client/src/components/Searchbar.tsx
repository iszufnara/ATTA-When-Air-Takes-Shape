// css styles import
import "./css/searchbar.css"

// libraries import 
import React from 'react';

export interface searchBarPropsInterface {
  
}

function SearchBar(props: searchBarPropsInterface) {
  return (
    <div className="searchbar-container">
      <input type="text" placeholder="Search..." />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;
