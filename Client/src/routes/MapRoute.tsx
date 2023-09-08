// import statements 
import "./css/map.scss";
import { useRef, useContext, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, InfoWindow } from '@react-google-maps/api';
import { MapFilter } from '../components/MapFilter';
import { WindowContext } from '../contexts/WindowSizeContext';
import { DataContext } from "../contexts/DataContext";
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import { Datapoint } from "../model/DataHandler";

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
  /** navigate hook */
  const navigate: NavigateFunction = useNavigate();

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
   * on first render of MapRoute, sets properties of searchInfo to default properties,
   * prevents user from navigating to info-page route without selecting a location
   */
  useEffect(() => {
    setSearchInfo(
      {
        term: "",
        zoom: 3,
        center: {
          lat: 45.765001, lng: -76.001027
        },
        activeMarker: null,
        datapoint: null
      }
    );
  }, []);

  /**
   * searchFiltered is an array that has been filtered by search term input by user
   */
  const searchFiltered = searchInfo.term == "" ? data.priority_data.filter((datapoint) =>
    datapoint.city_country.toLocaleLowerCase().includes(searchInfo.term.toLocaleLowerCase())
  ) : data.all_data.filter((datapoint) =>
    datapoint.city_country.toLocaleLowerCase().includes(searchInfo.term.toLocaleLowerCase()));

  /**
   * 
   * @param datapoint object 
   * @returns immediately if selected marker is already the active marker, else it
   * sets the searchInfo state to the properties of the datapoint selected by user
   */
  const handleActiveMarker = (datapoint: Datapoint) => {
    if (datapoint.uid === searchInfo.activeMarker) {
      return;
    }
    setSearchInfo({ ...searchInfo, zoom: 4, center: { lat: datapoint.lat, lng: datapoint.lon }, activeMarker: datapoint.uid });
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
        }}>
        {searchFiltered.map((datapoint) =>
          <MarkerF key={datapoint.uid}
            position={{ lat: datapoint.lat, lng: datapoint.lon }}
            onClick={() => handleActiveMarker(datapoint)}
          >
            {searchInfo.activeMarker === datapoint.uid ?
              <InfoWindowF
                position={{ lat: datapoint.lat, lng: datapoint.lon }}
                onCloseClick={() => setSearchInfo({ ...searchInfo, activeMarker: null })} >
                <div>
                  <p>{datapoint.city_country}</p>
                  <button onClick={() => {
                    setSearchInfo({
                      term: "", zoom: 3,
                      center: { lat: 45.765001, lng: -76.001027 }, activeMarker: null, datapoint: datapoint
                    });
                    navigate("/info-page");
                  }}>Select</button>
                </div>
              </InfoWindowF> : null}
          </MarkerF>
        )}
      </GoogleMap>
    </div >
  );
};
