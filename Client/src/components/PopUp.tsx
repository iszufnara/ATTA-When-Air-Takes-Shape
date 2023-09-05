import "./css/popup.scss";

export interface PopUpProps {
  status: string,
  color: string;
}

export const PopUp = ({color, status}: PopUpProps) => {
  return (
    <div style={{ background: `var(--AQI, ${color})` }}
      className="popup-container">{status}</div>

  );
};