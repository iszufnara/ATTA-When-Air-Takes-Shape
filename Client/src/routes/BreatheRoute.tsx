import "./css/breatheroute.scss";
import warning_amber from "../assets/warning_amber.svg";
import breathe_gif from "../assets/breathe.gif";
import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import axios from "axios";

export const BreatheRoute = () => {
  //navigation hook
  const navigate = useNavigate();
  //STATES
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  /** on first render LOGIC */
  useEffect(() => {
    if (searchInfo.datapoint == null) {
      alert("no location selected");
      navigate("/map-route");
    }
  }, []);

  /**
   * makes post request to server API, sends query to stop installation,
   * alerts error otherwise
   */
  const makeApiRequest = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/command?value=s`);
      console.log(res)
      alert(`request succesful: ` + res.status)
      navigate("/map-route");
    }
    catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

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
      <button
        className="breathe-route-return-home"
        onClick={() => {
          makeApiRequest();
        }}
      >Return Home</button>
    </div>
  );
};