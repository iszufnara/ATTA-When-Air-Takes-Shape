// css styles import
import "./css/introduction.scss";

// libraries import
import React from "react";
import select from "../assets/Select icon.png";
import breathe from "../assets/Breathe icon.png";
import { useNavigate } from "react-router-dom";

export interface takeActionPropsInterface {}

export function Introduction(props: takeActionPropsInterface) {
  const navigate = useNavigate();
  return (
    <div className="introduction-container">
      <div className="head-title">
        <div className="logo">
          <div className="row1">
            <div className="A">A</div>
            <div className="A">T</div>
          </div>
          <div className="row2">
            <div className="A">T</div>
            <div className="A">A</div>
          </div>
        </div>
        <div className="title-text">When Air Takes Shape</div>
      </div>

      <div className="how-it-works-section">
        <h1>How it works</h1>
        <div className="details">
          <div className="left">
            <img src={select} alt="select icon" />
            <div className="details-title">
              <h2>
                <span>01</span>
                <span className="middle"> Select</span>
                <span> a city</span>
              </h2>
              <p>
                Our structure will simulate the breathing experience of someone
                from that region.
              </p>
            </div>
          </div>

          <div className="right">
            <img src={breathe} alt="breathe icon" />
            <div className="details-title">
              <h2>
                <span>02</span>
                <span className="middle"> Breathe</span>
                <span> with the structure</span>
              </h2>
              <p>
                Inhale as it expands, exhale as it contracts, connecting you to
                their breathing experience.
              </p>
            </div>
          </div>
        </div>
        <button onClick={() => navigate("/map-route")}>
          <p>Begin my journey</p>
        </button>
      </div>

      <div className="about-section">
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          <br /> do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim
        </p>
      </div>
    </div>
  );
}
