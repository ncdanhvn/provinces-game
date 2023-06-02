import { useState } from "react";
import paths from "../../data/paths";
import "./Map.css";

interface Props {
  onClick: (id: number) => void;
  answeredProvinces: number[];
}

const Map = ({ onClick, answeredProvinces }: Props) => {
  let mousePosition = { x: 0, y: 0 };

  return (
    <svg
      width="768"
      height="868"
      viewBox="-216 -95 768 868"
      xmlns="http://www.w3.org/2000/svg"
      className="vn-map"
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
          onMouseDown={(e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
          }}
          onMouseUp={(e) => {
            if (e.clientX === mousePosition.x && e.clientY === mousePosition.y)
              onClick(i);
          }}
        />
      ))}
    </svg>
  );
};

export default Map;
