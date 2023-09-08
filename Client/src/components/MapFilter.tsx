/**
 * MapFilter is the component that overlays over the google map
 */

import React, { useState, useMemo, useContext, useEffect } from 'react';
import { CitiesCountriesPropsInterface } from '../model/interfaces';
import SearchBar from './Searchbar';
import "./css/mapfilter.scss";
import { RenderLocations } from './RenderLocations';
import Draggable from 'react-draggable'; // The default
import { WindowContext } from '../contexts/WindowSizeContext';
import { DataContext } from '../contexts/DataContext';
import { SearchInfoContext } from '../contexts/SearchInfoContext';


export function MapFilter() {
  /** Global States */
  const { windowObject, setWindowObject } = useContext(WindowContext);
  const { data, setData } = useContext(DataContext);
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  /** PAGINATION STATES */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [pageNumberLimit, setPageNumberLimit] = useState<number>(4);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(4);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(1);

  /** Logic to set inititial items per page based on the size of the current window */
  useEffect(() => {
    if (windowObject.width > 900) {
      setItemsPerPage(5);
    } else {
      setItemsPerPage(4);
    }
  }, [windowObject]);

  /**
   * searchFiltered is an array that has been filtered by search term input by user
   */
  const searchFiltered = data.all_data.filter((datapoint) =>
    datapoint.city_country.toLowerCase().includes(searchInfo.term.toLowerCase())
  );

  /** Array that contains pages to be rendered based on length of data */
  type Page = number;
  const pages: Array<Page> = [];
  for (let i = 1; i <= Math.ceil(searchInfo.term == "" ? data.priority_data.length / itemsPerPage :
    searchFiltered.length / itemsPerPage); i++) {
    pages.push(i);
  }

  /** 
   * Slicing data based on pagination states.
   * currentItems is a slice of the given data and holds the items to be rendered per page. 
   * currentItems is passed to RenderLocations components which renders the current locations for the current page.
  */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchInfo.term == "" ? data.priority_data.slice(indexOfFirstItem, indexOfLastItem)
    : searchFiltered.slice(indexOfFirstItem, indexOfLastItem);

  type RenderItems = (JSX.Element | null)[];
  /**
   * returns a button only for pages in range in [minPageNumberLimit, maxPageNumberLimit]
   */
  const renderPageNumbers: RenderItems = pages.map((page) => {
    if (page <= maxPageNumberLimit && page >= minPageNumberLimit) {
      return (
        <button key={page}
          id={page.toString()}
          onClick={(event) => {
            setCurrentPage(Number(event.currentTarget.id));
          }}
          className={currentPage == page ? "current-page" : ""}>
          {page}
        </button>);
    } else { return null; }
  });

  /**
   * increases current page by 1.
   * if increase in current page makes current page exceed maxPageNumberLimit, 
   * maxPageNumberLimit an minPageNumberLimit are updated
   */
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  /**
   * decreases currrent page by 1.
   * if decrease makes current page fall below minPageNumberLimit threshold, 
   * minPageNumberLimit and maxPageNumberLimit are updated.
   */
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  /**
   * increments pages to be displayed in pagination window by pageNumberLimit. 
   * ex. if current pagination window displays pages [1,2,3,4,5],
   * calling incrementByLimit will updated pagination window to [6,7,8,9,10] regardless of the current 
   * selected page.
   */
  const incrementWindowByLimit = () => {
    let newPage = minPageNumberLimit + pageNumberLimit;
    setCurrentPage(newPage);
    setMaxPageNumberLimit(newPage + pageNumberLimit - 1);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  };
  /**
   * window increment button will render only when there is another window to show
   * ex. if there are 12 pages of data, possible windows are [1,2,3,4,5], [6,7,8,9,10] and [11,12].
   * if current window displays [11,12], the window increment button will not render as there are no more possible windows 
   * to the right of [11,12]
   */
  let windowIncrementBtn = null;
  if (pages.length > maxPageNumberLimit && currentPage != pages[pages.length - 1]) {
    windowIncrementBtn = <button className="window-increment" onClick={incrementWindowByLimit}>&hellip;</button>;
  }

  /**
   * decrements pages to be displayed in pagination window by pageNumberLimit. 
   * ex. if current pagination window displays pages [6,7,8,9,10] 
   * calling decrementByLimit will updated pagination window to [1,2,3,4,5] regardless of the current 
   * selected page.
   */
  const decrementWindowByLimit = () => {
    let newPage = currentPage - pageNumberLimit;
    setCurrentPage(newPage);
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  };

  /**
   * window decrement button will render only when there is another window to show.
   * ex. on the first window, this button will never render as there are no possible windows before that 
   */
  let windowDecrementBtn = null;
  if (pages.length > maxPageNumberLimit && currentPage > pageNumberLimit) {
    windowDecrementBtn = <button className="window-increment" onClick={decrementWindowByLimit}>&hellip;</button>;
  }


  return (
    // <Draggable bounds="parent">
      <div className="map-filter-container">
        <SearchBar setCurrentPage={setCurrentPage} />
        <div className="line"></div>
        <div className="recommended-cities">
          <div className='text-cities'>Recommended Cities</div>
          <RenderLocations locations={currentItems} />

          <div className="page-numbers">
            <button className="prev-button" onClick={handlePrevBtn} disabled={(currentPage == pages[0] || pages.length == 0) ? true : false}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11.3691 5.5575L7.93414 9L11.3691 12.4425L10.3116 13.5L5.81164 9L10.3116 4.5L11.3691 5.5575Z" fill="#C4CDD5" />
              </svg>
            </button>

            {windowDecrementBtn}
            {renderPageNumbers}
            {windowIncrementBtn}

            <button className="next-button" onClick={handleNextBtn} disabled={(currentPage == pages[pages.length - 1] || pages.length == 0) ? true : false}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.63086 5.5575L10.0659 9L6.63086 12.4425L7.68836 13.5L12.1884 9L7.68836 4.5L6.63086 5.5575Z" fill="#C4CDD5" />
              </svg>
            </button>
          </div >

        </div>
      </div>
    // </Draggable>
  );
}
