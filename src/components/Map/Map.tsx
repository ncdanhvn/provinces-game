import { MouseEvent } from "react";
import paths from "../../data/paths";
import Provinces from "../../data/provinces";
import { MousePosition } from "../../interfaces";
import usePlayStateStore from "../../stores/playStateStore";
import useResultStore from "../../stores/resultStore";
import "./Map.css";
import { MapHeight, MapWidth } from "../../data/const";

const Map = () => {
    const answeredProvinces = useResultStore(
        ({ result }) => result.answeredProvinces
    );
    const selectedId = usePlayStateStore(
        ({ playState }) => playState.selectedId
    );
    const select = usePlayStateStore(({ select }) => select);

    const getProvinceClass = (i: number) => {
        if (answeredProvinces.includes(i)) return "answered";
        if (i === selectedId) return "highlighted";
        else return "not-answered";
    };

    let MouseDownPosition: MousePosition = { x: 0, y: 0 };
    const checkTheSamePosition = (
        oldPosition: MousePosition,
        newPosition: MousePosition
    ): boolean =>
        oldPosition.x === newPosition.x && oldPosition.y === newPosition.y;

    const onMouseOver = (i: number, e: MouseEvent<SVGPathElement>): void => {
        // Set text then visible
        if (answeredProvinces.includes(i)) {
            const text = Provinces.find((p) => p.id === i)?.name!;
            setTooltipOn(text, { x: e.clientX, y: e.clientY });
        }
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
                    className={`svg-path ${getProvinceClass(i)}`}
                    onMouseDown={(e) => {
                        MouseDownPosition.x = e.clientX;
                        MouseDownPosition.y = e.clientY;
                    }}
                    onMouseUp={(e) => {
                        if (
                            getProvinceClass(i) === "not-answered" &&
                            checkTheSamePosition(MouseDownPosition, {
                                x: e.clientX,
                                y: e.clientY,
                            })
                        )
                            select(i, MouseDownPosition);
                    }}
                    onMouseOver={(e) => onMouseOver(i, e)}
                    onMouseLeave={() => setTooltipOff()}
                ></path>
            ))}
        </svg>
    );
};

export default Map;

const setTooltipOn = (text: string, mousePos: MousePosition): void => {
    const tooltip = document.getElementById("tooltip")!;
    tooltip.innerHTML = text;
    tooltip.style.visibility = "visible";
    tooltip.style.top = `${getMapPos(mousePos).y}px`;
    tooltip.style.left = `${getMapPos(mousePos).x}px`;
};

const setTooltipOff = (): void => {
    const tooltip = document.getElementById("tooltip")!;
    tooltip.style.visibility = "hidden";
};

const getMapPos = (windowPos: MousePosition): MousePosition => {
    const { innerWidth: width, innerHeight: height } = window;
    let mapPosX = Math.floor(windowPos.x - (width - MapWidth) / 2);
    if (mapPosX < 0) mapPosX = 0;
    mapPosX += 8;
    let mapPosY = Math.floor(windowPos.y - (height - MapHeight) / 2);
    if (mapPosY < 0) mapPosY = 0;
    mapPosY += 8;
    return { x: mapPosX, y: mapPosY };
};