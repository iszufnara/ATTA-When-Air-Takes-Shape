
import { ContributingFactor } from "./ContributingFactor";
import "./css/pollutant_section.scss";
import { PollutantCard } from "./PollutantCard";
import { useState } from "react";

import coal_mining from "../assets/contributing_factors/coal_mining.png"

export const PollutantSection = () => {
  /** STATES */
  const [pollutantBool, setPollutantBool] = useState<boolean>(true);

  return (
    <div className="pollutant-container">
      <div className="pollutant-section-top">
        <button
          style={{ borderBottom: pollutantBool ? "2px solid black" : "2px solid transparent" }}
          onClick={() => setPollutantBool(true)}>
          Pollutants
        </button>
        <button
          style={{ borderBottom: pollutantBool ? "2px solid transparent" : "2px solid black" }}
          onClick={() => setPollutantBool(false)}>
          Contributing Factors
        </button>
      </div>
      {pollutantBool ?
        <div className="pollutant-section-middle">
          <PollutantCard name={"PM2.5"} concentration={null} category="good" indicator="green" />
          <PollutantCard name={"PM10"} concentration={null} category="good" indicator="green" />
          <PollutantCard name={"O3"} concentration={null} category="good" indicator="green" />
        </div> :
        <div className="contributing-factor-middle">
          <ContributingFactor name="Coal Mining" img={coal_mining} />
          <ContributingFactor name="Coal Mining" img={coal_mining} />
          <ContributingFactor name="Coal Mining" img={coal_mining} />
        </div>}
      {pollutantBool ?
        <div className="pollutant-section-bottom">
          <PollutantCard name={"CO"} concentration={null} category="good" indicator="green" />
          <PollutantCard name={"NO2"} concentration={null} category="good" indicator="green" />
          <PollutantCard name={"SO2"} concentration={3} category="Good" indicator="#A8E05F" />
        </div> :
        <div className="contributing-factor-bottom">
          <ContributingFactor name="Open Burning of Garbage Waste" img={coal_mining}/>
          <ContributingFactor name="Coal Mining" img={coal_mining}/>
          <ContributingFactor name="Coal Mining" img={coal_mining}/>
        </div>}
    </div>
  );
};