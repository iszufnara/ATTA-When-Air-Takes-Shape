// import statements 
import { useRef, useState, useEffect } from 'react';
import { DataHandler } from "../model/DataHandler";
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import "./css/map.css";

// google maps API key
const key = "AIzaSyCrqndBV56Fm8dTXCtAIPOyqYkqXQEDbKA";

// Declaring type of props
export interface mapPropsInterface {
}

// MapRoute that is rendered in App.tsx
export function MapRoute() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

// renders GoogleMap and Markers
function Map() {
  const center = useMemo(() => ({ lat: 49.282730, lng: -123.120735 }), []);
  const dataHandler = new DataHandler();
  return (
    <>
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-route-container">
        <MarkerF position={center} />
        {dataHandler.data.map((datapoint) => <MarkerF position={{ lat: datapoint.lat, lng: datapoint.lon }} />)}
      </GoogleMap>
    </>
  );
};
