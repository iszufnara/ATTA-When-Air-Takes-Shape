// import statements 
import { useRef, useState, useEffect, useContext } from 'react';
import { DataHandler } from "../model/DataHandler";
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { citiesCountriesPropsInterface } from '../model/interfaces';
import { SearchInfoContext } from '../contexts/searchInfoContext';
import "./css/map.css";

// google maps API key
const key = "AIzaSyCrqndBV56Fm8dTXCtAIPOyqYkqXQEDbKA";


// MapRoute that is rendered in App.tsx
export const MapRoute: React.FC<citiesCountriesPropsInterface> = ({ cities, countries, setCities, setCountries }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map {...{ cities, countries, setCities, setCountries }} />;
};

// renders GoogleMap and Markers
function Map({ cities, countries, setCities, setCountries }: citiesCountriesPropsInterface) {
  const center = useMemo(() => ({ lat: 49.282730, lng: -123.120735 }), []);
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);
  return (
    <div>
      <GoogleMap zoom={8} center={center} mapContainerClassName="map-route-container">
        <MarkerF position={center} />
        {/* {dataHandler.data.map((datapoint) => <MarkerF position={{ lat: datapoint.lat, lng: datapoint.lon }} />)} */}
      </GoogleMap>
    </div>
  );
};
