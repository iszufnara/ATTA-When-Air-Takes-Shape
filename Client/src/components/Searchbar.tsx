// css styles import
import "./css/searchbar.css";

// libraries import 
import { useState, ChangeEvent, useContext } from 'react';
import react from 'react';
import { SearchInfoContext } from "../contexts/searchInfoContext";
import { citiesCountriesPropsInterface } from "../model/interfaces";
import { City, Country } from "../model/DataHandler";

function SearchBar({ cities, countries }: citiesCountriesPropsInterface) {
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  /**
   * filterEmpty is an array of Country or City that has been filtered to exclude empty strings 
   * in the props states (countries or cities)
   */
  const filterEmpty: Array<Country | City> = countries.filter((city: City | Country) => {
    return city != "";
  });

  /**
   * searchFiltered is an array of Country or City that is dynamically filered as searchInfo.term state changes. 
   * searchInfo.term changes according to user input. 
   */
  const searchFiltered = filterEmpty.filter((city) =>
    city?.toLowerCase().includes(searchInfo.term.toLowerCase())
  );

  return (
    <div className="searchbar-container">
      <input type="text" placeholder="Search..." onChange={(event) => {
        setSearchInfo({ ...searchInfo, term: event.target.value });
      }} />
      <button onClick={() => setSearchInfo({ ...searchInfo, byCity: false })}>by country</button>
      <button onClick={() => setSearchInfo({ ...searchInfo, byCity: true })}>by city</button>
      <button>Search</button>
      {searchFiltered.map((city, key) => {
        return (<text>{city}...</text>);
      })}
      <text>{cities.length}</text>
    </div>
  );
}

export default SearchBar;
