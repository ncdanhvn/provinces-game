import paths from "../../data/paths";
import "./Map.css";

const Map = () => {
  return (
    <svg
      width="339"
      height="710"
      viewBox="0 0 339 710"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((p, i) => (
        <path key={i} d={p} className="svg-path" />
      ))}
    </svg>
  );
};

export default Map;
