// css styles import
import "./css/searchbar.css";

// libraries import 
import { useState, ChangeEvent, useContext } from 'react';
import react from 'react';
import { SearchTermContext } from "../contexts/searchTermContext";


export interface searchBarPropsInterface {

}

function SearchBar(props: searchBarPropsInterface) {

  const { searchTerm, setSearchTerm } = useContext(SearchTermContext);

  return (
    <div className="searchbar-container">
      <input type="text" placeholder="Search..." onChange={(event) => {
        setSearchTerm(event.target.value);
      }} />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;
