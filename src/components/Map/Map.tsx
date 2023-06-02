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
  let mousePosition = { x: 0, y: 0 };

  const getClassName = (i: number) => {
    const classes = ["svg-path"];

    if (answeredProvinces.find((p) => p === i) !== undefined)
      classes.push("answered");
    else if (isHighlight && i === selectedId) classes.push("highlighted");
    else classes.push("not-answered");

    return classes.join(" ");
  };

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
          className={getClassName(i)}
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
