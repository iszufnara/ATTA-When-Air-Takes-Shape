import * as React from 'react';
import "./css/renderLocations.scss";
import { Datapoint } from '../model/DataHandler';
import { SearchInfoContext } from '../contexts/SearchInfoContext';
import { useContext } from 'react';

export interface RenderLocationsProps {
  locations: Array<Datapoint>;
}

export function RenderLocations(props: RenderLocationsProps) {
  /** STATES */
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  /** LOGIC */
  const clickHandler = (datapoint: Datapoint) => {
    setSearchInfo({
      ...searchInfo,
      zoom: 4,
      center: { lat: datapoint.lat, lng: datapoint.lon },
      activeMarker: datapoint.uid
    });
  };

  return (
    <>
      {props.locations.map((datapoint, index) => {
        return (
          <div key={index} className="location-container" onClick={() => { clickHandler(datapoint); }}>
            <p>{datapoint.city_country}</p>
          </div>
        );
      })}
    </>
  );
}
