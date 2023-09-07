import "./css/didyouknow.scss";

export const DidYouKnow = () => {
  return (
    <div className="did-you-know-container">
      <p className="did-you-know-top">Did you know?</p>
      <p className="did-you-know-middle">
        Air pollution is responsible for 6.7 million premature deaths every year.
      </p>
      <a href="https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants">
        Source: https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants
      </a>
    </div>
  );
};