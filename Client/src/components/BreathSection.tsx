import "./css/breathsection.scss";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInfoContext } from "../contexts/SearchInfoContext";

export interface BreatheSectionProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BreathSection = (props: BreatheSectionProps) => {
  /** navigation hook */
  const navigate = useNavigate();
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  return (
    <div className="breathe-section-container">
      <p className="breathe-section-top">What is it like to breathe in this city now?</p>
      <button onClick={() => {
        window.scrollTo(0, 0);
        props.setModal(true);
      }}>Breathe</button>
      <p className="breathe-section-bottom"
        onClick={() => {
          setSearchInfo({
            ...searchInfo, datapoint: null
          });
          navigate("/map-route");
        }}>
        Select another city</p>
    </div>
  );
};