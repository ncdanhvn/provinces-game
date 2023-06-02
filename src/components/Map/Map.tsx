import { useState } from "react";
import paths from "../../data/paths";
import "./Map.css";

interface Props {
  onClick: (id: number) => void;
  answeredProvinces: number[];
  selectedId: number | null;
  isHighlight: boolean;
}

const Map = ({
  onClick,
  answeredProvinces,
  selectedId,
  isHighlight,
}: Props) => {
  const getProvinceClass = (i: number) => {
    if (answeredProvinces.includes(i)) return "answered";
    if (isHighlight && i === selectedId) return "highlighted";
    else return "not-answered";
  };

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
          className={`svg-path ${getProvinceClass(i)}`}
          onMouseDown={(e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
          }}
          onMouseUp={(e) => {
            if (
              getProvinceClass(i) === "not-answered" &&
              e.clientX === mousePosition.x &&
              e.clientY === mousePosition.y
            )
              onClick(i);
          }}
        />
      ))}
    </svg>
  );
};

export default Map;
