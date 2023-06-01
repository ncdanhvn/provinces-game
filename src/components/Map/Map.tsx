import { Province } from "../../App";
import paths from "../../data/paths";
import QuestionModal from "../Modal/QuestionModal";
import "./Map.css";

interface Props {
  onClick: (id: number) => void;
  answeredProvinces: Province[];
}

const Map = ({ onClick, answeredProvinces }: Props) => {
  return (
    <svg
      width="768"
      height="868"
      viewBox="-216 -95 768 868"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p}
          className={
            answeredProvinces.find((p) => p.id === i)
              ? "svg-path answered"
              : "svg-path"
          }
          onClick={() => onClick(i)}
        />
      ))}
    </svg>
  );
};

export default Map;
