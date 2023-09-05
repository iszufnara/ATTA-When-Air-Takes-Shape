import "./css/pollutantcard.scss";
import info_icon from "../assets/info_icon.svg";

export interface PollutantCardProps {
  name: string;
  concentration: number | null;
  category: string;
  indicator: string;
}

export const PollutantCard = (props: PollutantCardProps) => {
  return (
    <div className="pollutant-card-container">
      <div className="pollutant-card-top">
        <div className="pollutant-card-name-and-unit">
          <p className="pollutant-card-name">{props.name}</p>
          <p className="pollutant-card-unit">(ug/m3)</p>
        </div>
        <img src={info_icon} />
      </div>

      {props.concentration ?
        <div className="pollutant-card-middle">3.4</div>
        :
        <p className="pollutant-card-name-na">Not Available</p>}

      <div style={{ opacity: props.concentration ? 1 : 0 }} className="pollutant-card-classification">{props.category}</div>
      <div style={{
        opacity: props.concentration ? 1 : 0,
        background: props.indicator
      }}
        className="pollutant-card-bottom"></div>
    </div>
  );
};