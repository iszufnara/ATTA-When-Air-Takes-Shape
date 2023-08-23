import * as React from 'react';
import "./css/renderLocations.scss";

export interface RenderLocationsProps {
  locations: Array<String>;
}

export function RenderLocations(props: RenderLocationsProps) {
  return (
    <>
      {props.locations.map((location, index) => {
        return (
          <div key={index} className="location-container">
            {location}
          </div>
        );
      })}
    </>
  );
}
