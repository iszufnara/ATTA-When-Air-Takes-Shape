// import statements 
import "./css/map.scss";
import { useRef, useContext, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, InfoWindow } from '@react-google-maps/api';
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

  /** reference to Google Map Object */
  const mapRef = useRef<google.maps.Map | null>(null);

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

  /**
   * 
   * @param marker is id of Marker object that has been selected by user
   * @returns immediately if selected marker is already the active marker 
   */
  const handleActiveMarker = (marker: number) => {
    if (marker === searchInfo.activeMarker) {
      return;
    }
    setSearchInfo({ ...searchInfo, activeMarker: marker });
  };


  return (
    <div className='map-route-container'>
      {/* <p>{windowObject.width}</p> */}
      <MapFilter />
      <GoogleMap zoom={searchInfo.zoom} center={searchInfo.center} mapContainerClassName="google-map-container"
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onZoomChanged={() => {
          if (mapRef.current != null) {
            setSearchInfo({ ...searchInfo, zoom: mapRef.current.getZoom() });
          }
          console.log(mapRef);
        }}>
        {searchFiltered.map((datapoint) =>
          <MarkerF key={datapoint.uid}
            position={{ lat: datapoint.lat, lng: datapoint.lon }}
            onClick={() => handleActiveMarker(datapoint.uid)}
          >
            {searchInfo.activeMarker === datapoint.uid ?
              <InfoWindowF
                position={{ lat: datapoint.lat, lng: datapoint.lon }}
                onCloseClick={() => setSearchInfo({ ...searchInfo, activeMarker: null })} >
                <div>
                  <p>{datapoint.city_country}</p>
                  <button>Select</button>
                </div>
              </InfoWindowF> : null}
          </MarkerF>
        )}
      </GoogleMap>
    </div >
  );
};
