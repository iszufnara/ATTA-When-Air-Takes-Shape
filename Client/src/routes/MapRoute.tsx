// import statements 
import "./css/map.scss";
import { useState, useContext, useEffect } from 'react';
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Center, CitiesCountriesPropsInterface } from '../model/interfaces';
import { MapFilter } from '../components/MapFilter';
import { WindowContext } from '../contexts/windowSizeContext';

// google maps API key
const key = "AIzaSyCrqndBV56Fm8dTXCtAIPOyqYkqXQEDbKA";


// MapRoute that is rendered in App.tsx
export const MapRoute: React.FC<CitiesCountriesPropsInterface> = ({ cities, countries, setCities, setCountries }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map {...{ cities, countries, setCities, setCountries }} />;
};

// renders GoogleMap and Markers
function Map({ cities, countries, setCities, setCountries }: CitiesCountriesPropsInterface) {
  /** variables */

  /** STATES */
  const { windowObject, setWindowObject } = useContext(WindowContext);
  const [zoom, setZoom] = useState<number>(3)

  /** LOGIC */
  // updates center of map in response to window width limit of 600px
  useEffect(() => {
    if (windowObject.width < 600) {
      setZoom(2);
    } else {
      setZoom(3);
    }
  }, [windowObject]);


  const oldCenter = useMemo(() => ({ lat: 45.765001, lng: -76.001027 }), []);
  return (
    <div className='map-route-container'>
      <p>{windowObject.width}</p>
      <MapFilter {...{ cities, countries, setCities, setCountries }} />
      <GoogleMap zoom={zoom} center={oldCenter} mapContainerClassName="google-map-container">
        {/* {<MarkerF position={center} />} */}
        {/* {dataHandler.data.map((datapoint) => <MarkerF position={{ lat: datapoint.lat, lng: datapoint.lon }} />)} */}
      </GoogleMap>
    </div>
  );
};
