// css styles import
import "./css/landing.scss";

// libraries import 
import rectange77 from "../assets/Rectangle 77.png";
import React from 'react';
import { SwipeCard } from "../components/SwipeCard";


export interface LandingPageInterface {
}

export function LandingPage(props: LandingPageInterface) {
  return (
    <div className='landing-route-container'>
      <img src={rectange77} />
      <div className="outer-container-on-swipe">
        <SwipeCard />
      </div>
    </div>
  );
}
