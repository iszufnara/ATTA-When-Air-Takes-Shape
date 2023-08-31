// css styles import
import "./css/landing.scss";

// libraries import
import unsplash from "../assets/unsplash.png";
import React from "react";
import { SwipeCard } from "../components/SwipeCard";

export interface LandingPageInterface {}

export function LandingPage(props: LandingPageInterface) {
  return (
    <div className="landing-route-container">
      <img src={unsplash} />
      <SwipeCard />
    </div>
  );
}
