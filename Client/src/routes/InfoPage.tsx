// css styles import
import "./css/info.scss";
import logo from "../assets/atta_logo.webp";
import smile from "../assets/emoji_assets/smile.png";
import neutral from "../assets/emoji_assets/neutral.png";
import sad_face from "../assets/emoji_assets/sad_face.png";
import info_icon from "../assets/info_icon.svg";
import disappointed from "../assets/emoji_assets/disappointed.png";
import dead_skin from "../assets/emoji_assets/dead-skin.png";


// libraries import 
import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import { Scale } from "../components/Scale";
import { PollutantSection } from "../components/PollutantSection";
import { HealthSection } from "../components/HealthSection";
import { DidYouKnow } from "../components/DidYouKnow";
import { BreathSection } from "../components/BreathSection";


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

  if (searchInfo.datapoint) {
    return (
      <div className="info-page-container-outer">
        <div className="info-page-header">
          <div className="info-page-logo">
            <img src={logo} />
          </div>
          <p>When Air Takes Shape</p>
        </div>
        <div className="info-page-blocks">
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
          <BreathSection />
          <div className="info-page-block-06">
            <button>Breathe</button>
            B</div>
        </div>

      </div>
    );
  } else {
    return (
      <div>Loading...</div>
    );
  }
}
