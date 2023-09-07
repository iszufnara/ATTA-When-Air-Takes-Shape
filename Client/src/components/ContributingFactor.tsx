import "./css/contributingfactor.scss";


export interface ContributingFactorProps {
  name: string;
  img: string;
}

export const ContributingFactor = (props: ContributingFactorProps) => {
  return (
    <div className="contributing-factor-container">
      <img src={props.img} />
      <p>{props.name}</p>
    </div>
  );
};