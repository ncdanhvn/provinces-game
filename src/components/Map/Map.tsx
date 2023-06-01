import paths from "../../data/paths";
import "./Map.css";

interface Props {
  onClick: (id: number) => void;
  answeredProvinces: number[];
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
            answeredProvinces.find((p) => p === i) !== undefined
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
