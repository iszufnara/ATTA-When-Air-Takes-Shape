import React, { useState, useMemo } from 'react';
import { CitiesCountriesPropsInterface } from '../model/interfaces';
import SearchBar from './Searchbar';
import "./css/mapfilter.scss";
import { LocationComponent } from './LocationComponent';
import ReactPaginate from 'react-paginate';


export function MapFilter({ cities, countries, setCities, setCountries }: CitiesCountriesPropsInterface) {
  const itemsPerPage = useMemo(() => { return 1; }, []);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = cities.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cities.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % cities.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  return (
    <div className="map-filter-container">
      <SearchBar {...{ cities, countries, setCities, setCountries }} />
      <div className="line"></div>
      <div className="recommended-cities">
        <div className='text-cities'>Recommended Cities</div>
        <LocationComponent />
        <ReactPaginate
          marginPagesDisplayed={1}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
        />
      </div>

    </div>
  );
}
