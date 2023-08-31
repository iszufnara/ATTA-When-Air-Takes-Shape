
/** BROKER CODE
 * I was testing some features with the google maps API, so ignore code for now
 */

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from 'react';

function MyMapComponent() {
  const ref = useRef<HTMLDivElement>();

  const style = { height: "100vh " };

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center: { lat: 45.765001, lng: -76.001027 },
      zoom: 3
    });
  });

  // return <div ref={ref!} style={style} id="map" />;
  return <div></div>
}

export const MapPrototype = () => (
  <Wrapper apiKey={"AIzaSyCrqndBV56Fm8dTXCtAIPOyqYkqXQEDbKA"}>
    <MyMapComponent />
  </Wrapper>
);