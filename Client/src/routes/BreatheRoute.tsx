import "./css/breatheroute.scss";
import warning_amber from "../assets/warning_amber.svg";
import breathe_gif from "../assets/breathe.gif";
import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchInfoContext } from "../contexts/SearchInfoContext";

export const BreatheRoute = () => {
  //navigation hook
  const navigate = useNavigate();
  //STATES
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  /** on first render LOGIC */
  useEffect(() => {
    if (searchInfo.datapoint == null) {
      navigate("/map-route");
      alert("no location selected");
    }
  }, []);

  return (
    <div className="breathe-route-container">
      <p className="breathe-route-title">Breathe with the sculpture</p>
      <p className="breathe-route-subtitle">Inhale as it expands, exhale as it contracts...</p>
      <img className="breathe-gif" src={breathe_gif} />
      <div className="breathe-route-bottom">
        <img src={warning_amber} />
        <p>Caution: This activity is for educational purposes only. While enjoyable for most, <br />
          we urge those with underlying  health issues, seniors, pregnant women,
          and <br /> children to participate with caution.
          Prioritize your safety and well-being by <br /> consulting a medical  professional before engaging in this
          activity.
        </p>
      </div>
    </div>
  );
};