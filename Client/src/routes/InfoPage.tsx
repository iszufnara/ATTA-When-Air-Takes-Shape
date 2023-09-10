// css styles import
import "./css/info.scss";
import logo from "../assets/atta_logo.webp";
import smile from "../assets/emoji_assets/smile.png";
import neutral from "../assets/emoji_assets/neutral.png";
import sad_face from "../assets/emoji_assets/sad_face.png";
import info_icon from "../assets/info_icon.svg";
import disappointed from "../assets/emoji_assets/disappointed.png";
import dead_skin from "../assets/emoji_assets/dead-skin.png";
import warning from "../assets/warning.svg";

// libraries import 
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import { Scale } from "../components/Scale";
import { PollutantSection } from "../components/PollutantSection";
import { HealthSection } from "../components/HealthSection";
import { DidYouKnow } from "../components/DidYouKnow";
import { BreathSection } from "../components/BreathSection";
import axios from 'axios';


export function InfoPage() {
  /** constants */
  const goodRange = useMemo(() => 50, []);
  const moderateRange = useMemo(() => 101, []);
  const unhealthyForSensitiveGroupsRange = useMemo(() => 151, []);
  const unhealthyRange = useMemo(() => 201, []);
  const veryUnhealtyRange = useMemo(() => 300, []);

  /** navigation hook */
  const navigate = useNavigate();
  /** STATES */
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  // state used to determine if model over info page is active or not
  const [modalIsActive, setModal] = useState<boolean>(false);

  /** on first render LOGIC */
  useEffect(() => {
    if (searchInfo.datapoint == null) {
      navigate("/map-route");
      alert("no location selected");
    }
  }, []);

  /**
   * @returns smile, nuetral, or sad_face emoji based on datapoint.aqi range
   */
  const renderEmoji = (): (JSX.Element | undefined) => {
    if (searchInfo.datapoint) {
      if (searchInfo.datapoint.aqi <= goodRange) {
        return <img src={smile} />;
      } else if (searchInfo.datapoint.aqi > goodRange && searchInfo.datapoint.aqi < moderateRange) {
        return <img src={neutral} />;
      } else if (searchInfo.datapoint.aqi >= moderateRange && searchInfo.datapoint.aqi < unhealthyRange) {
        return <img src={sad_face} />;
      } else if (searchInfo.datapoint.aqi >= unhealthyRange && searchInfo.datapoint.aqi < veryUnhealtyRange) {
        return <img src={disappointed} />;
      } else {
        return <img src={dead_skin} />;
      }
    }
  };

  /**
   * makes request to server API, sends value of chosen aqi and navigates to breathe page if request is succesful.
   * alerts error message otherwise
   */
  const makeApiRequest = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/aqi?value=${searchInfo.datapoint?.aqi}`);
      console.log(res);
      alert(`request succesful: ` + res.status)
      navigate("/breathe-page");
    }
    catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

  if (searchInfo.datapoint) {
    return (
      <div className="info-page-container-outer">
        <div className="info-page-header">
          <div className="info-page-logo">
            <img src={logo} />
          </div>
          <p>When Air Takes Shape</p>
        </div>
        <div className="info-page-blocks" style={{ opacity: modalIsActive ? 0.5 : 1 }}>
          <div className="info-page-block-01">{searchInfo.datapoint?.city_country}</div>
          <div className="info-page-block-02">
            <div className="info-page-block-02-section-01">{renderEmoji()}</div>
            <div className="into-page-block-02-section-02">
              <div className="info-page-block-02-section-02-us-aqi">
                <p>US AQI</p>
                <img src={info_icon} />
              </div>
              <p className="aqi-number">{searchInfo.datapoint?.aqi}</p>
            </div>
            <Scale />
            <div className="info-page-block-02-section-04">
              <p className="first">Income Group</p>
              <p className="second">Static <br />Income</p>
            </div>
          </div>
          <PollutantSection />
          <HealthSection />
          <DidYouKnow />
          <BreathSection modal={modalIsActive} setModal={setModal} />

        </div>

        {modalIsActive ?
          <div className="info-page-modal">
            <div className="info-page-modal-top" style={{ opacity: 1 }}>
              <img src={warning} />
            </div>
            <div className="info-page-modal-middle">
              <p className="p-01">You have selected</p>
              <p className="p-02">{searchInfo.datapoint.city_country}</p>
              <p className="p-03">for the structure to simulate breathing</p>
              <p className="p-04">
                Warning: By  continuing with your current selection, <br />
                you will be unable to change it while the structure is <br />
                in motion for approximately 1 minute
              </p>
            </div>
            <div className="info-page-modal-bottom">
              <button className="modal-cancel-button" onClick={() => setModal(false)}>Cancel</button>
              <button className="modal-continue-button" onClick={() => {
                makeApiRequest();
              }}>Continue</button>
            </div>
          </div> : null}

      </div>
    );
  } else {
    return (
      <div>Loading...</div>
    );
  }
}
