//styles and assets
import "./css/scale.scss";
import unhealthy_for_sensitive from "../assets/scale_assets/unhealthy_for_sensitive.svg";
import good from "../assets/scale_assets/good.svg";
import unhealthy from "../assets/scale_assets/unhealthy.svg";
import hazardous from "../assets/scale_assets/hazardous.svg";
import very_unhealthy from "../assets/scale_assets/very_unhealthy.svg";
import moderate from "../assets/scale_assets/moderate.svg";

//library imports
import { useContext, useMemo, useState, useEffect } from "react";
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import { Popup } from "react-map-gl";
import { PopUp } from "./PopUp";


export function Scale() {
  /** constants */
  const goodRange = useMemo(() => 50, []);
  const moderateRange = useMemo(() => 101, []);
  const unhealthyForSensitiveGroupsRange = useMemo(() => 151, []);
  const unhealthyRange = useMemo(() => 201, []);
  const veryUnhealtyRange = useMemo(() => 300, []);

  /** STATES */
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");

  /** LOGIC */
  /**
   * @returns different color scale according to the range of datapoint aqi chosen by user.
   * if datapoint is null, returns undefined
   */
  const renderScale = (): (JSX.Element | undefined) => {
    if (searchInfo.datapoint) {
      if (searchInfo.datapoint.aqi <= goodRange) {
        return <img src={good} />;
      } else if (searchInfo.datapoint.aqi > goodRange && searchInfo.datapoint.aqi < moderateRange) {
        return <img src={moderate} />;
      } else if (searchInfo.datapoint.aqi >= moderateRange && searchInfo.datapoint.aqi < unhealthyForSensitiveGroupsRange) {
        return <img src={unhealthy_for_sensitive} />;
      } else if (searchInfo.datapoint.aqi >= unhealthyForSensitiveGroupsRange && searchInfo.datapoint.aqi < unhealthyRange) {
        return <img src={unhealthy} />;
      } else if (searchInfo.datapoint.aqi >= unhealthyRange && searchInfo.datapoint.aqi < veryUnhealtyRange) {
        return <img src={very_unhealthy} />;
      } else {
        return <img src={hazardous} />;
      }
    };
  };

  /**
   * sets status and color to appropiate status and color based on chosen location
   */
  const chooseStatusColor = () => {
    if (searchInfo.datapoint) {
      if (searchInfo.datapoint.aqi <= goodRange) {
        setStatus("Good");
        setColor("#A8E05F");
      } else if (searchInfo.datapoint.aqi > goodRange && searchInfo.datapoint.aqi < moderateRange) {
        setStatus("Moderate");
        setColor("#FDD64B");
      } else if (searchInfo.datapoint.aqi >= moderateRange && searchInfo.datapoint.aqi < unhealthyForSensitiveGroupsRange) {
        setStatus("Unhealthy For Sensitive Groups");
        setColor("#FE9B57");
      } else if (searchInfo.datapoint.aqi >= unhealthyForSensitiveGroupsRange && searchInfo.datapoint.aqi < unhealthyRange) {
        setColor("#F55E5F");
        setStatus("Unhealthy");
      } else if (searchInfo.datapoint.aqi >= unhealthyRange && searchInfo.datapoint.aqi < veryUnhealtyRange) {
        setColor("#A070B6");
        setStatus("Very Unhealthy");
      } else {
        setStatus("Hazardous");
        setColor("#A06A7B");
      }
    };
  };

  /**
   * calls choseStatusColor on first render of Scale component 
   */
  useEffect(() => {
    chooseStatusColor();
  }, []);

  return (
    <div className="scale-outer-container">
      <PopUp status={status} color={color} />
      {renderScale()}
      <div className="scale-numbers">
        <p>0</p>
        <p>500</p>
      </div>
    </div>
  );
}



