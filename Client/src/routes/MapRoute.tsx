// import statements 
import mapboxgl from 'mapbox-gl';
import { useRef, useState, useEffect } from 'react';
import { DataHandler } from "../model/DataHandler";

//css styles
import "./css/map.css";
import "mapbox-gl/dist/mapbox-gl.css";


//MAPBOX ACCESS TOKEN
mapboxgl.accessToken = 'pk.eyJ1IjoiZWxld2l0ZXMiLCJhIjoiY2xrbjA1c2YzMG12aTNsczQ0ZGNmZWE4byJ9.epJ0J7vEsTr9rN69yFFm2w';


// Declaring type of props
export interface mapPropsInterface {
}

export function MapRoute(props: mapPropsInterface) {

  // reference to HTML element that will hold the mapbox map object
  const mapContainer = useRef<any>(null);
  // undeclared object that will hold a mapbox object
  const map = useRef<any>(null);
  // longitude of initial map location, set to Vancouver
  const [lng, setLng] = useState<number>(-123.1207);
  // latitude of initial map location, set to Vancouver
  const [lat, setLat] = useState<number>(49.2827);
  // initial zoom
  const [zoom, setZoom] = useState<number>(6);
  // undeclared object that will hold a DataHandler
  const dataHandler = useRef<DataHandler | null>(null);

  // creates a new mapbox object and stores it in map reference if one has not been created.
  // also instantiates a DataHandler and uses the data in the DataHandler to create mapbox markers 
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    // Special marker for Vancouver location
    const marker = new mapboxgl.Marker(
      { color: "#FF0000", }
    )
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Creates new DataHandler, then creates a new marker for each datapoint in the DataHandler
    if (dataHandler.current) return;
    else {
      dataHandler.current = new DataHandler();
      dataHandler.current.data.forEach((datapoint, idx) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([datapoint.lon, datapoint.lat])
          .addTo(map.current);
      });
    }
  });

  // keeps track of scroll movement by user and stores new lng and lat in the appropiate states
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className='map-route-container'>
      <h1>Map Route/Landing Page</h1>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};
