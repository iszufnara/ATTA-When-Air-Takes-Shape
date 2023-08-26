// import statements 
import "./css/map.scss";
import { useState, useContext, useEffect } from 'react';
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Center, CitiesCountriesPropsInterface } from '../model/interfaces';
import { MapFilter } from '../components/MapFilter';
import { WindowContext } from '../contexts/WindowSizeContext';
import { DataContext } from "../contexts/DataContext";
import { SearchInfoContext } from "../contexts/SearchInfoContext";

// google maps API key
const key = "AIzaSyCrqndBV56Fm8dTXCtAIPOyqYkqXQEDbKA";


// MapRoute that is rendered in App.tsx
export function MapRoute() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

// renders GoogleMap and Markers
function Map() {
  /** STATES */
  const { data, setData } = useContext(DataContext);
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);
  const { windowObject, setWindowObject } = useContext(WindowContext);

  /** LOGIC */
  // updates center of map in response to window width limit of 600px
  useEffect(() => {
    if (windowObject.width < 600) {
      setSearchInfo({ ...searchInfo, zoom: 2 });
    } else {
      setSearchInfo({ ...searchInfo, zoom: 3 });
    }
  }, [windowObject]);

  /**
   * searchFiltered is an array that has been filtered by search term input by user
   */
  const searchFiltered = searchInfo.term == "" ? data.priority_data.filter((datapoint) =>
    datapoint.city_country.toLocaleLowerCase().includes(searchInfo.term.toLocaleLowerCase())
  ) : data.all_data.filter((datapoint) =>
    datapoint.city_country.toLocaleLowerCase().includes(searchInfo.term.toLocaleLowerCase()));



  return (
    <div className='map-route-container'>
      {/* <p>{windowObject.width}</p> */}
      <MapFilter />
      <GoogleMap zoom={searchInfo.zoom} center={searchInfo.center} mapContainerClassName="google-map-container">
        {/* {<MarkerF position={center} />} */}
        {searchFiltered.map((datapoint) => <MarkerF position={{ lat: datapoint.lat, lng: datapoint.lon }} />)}
      </GoogleMap>
    </div>
  );
};
