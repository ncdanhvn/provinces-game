import { MapHeight, MapWidth } from "../data/const";
import useMousePosition from "../hooks/useMousePosition";
import { MousePosition } from "../interfaces";

const Tooltip = () => {
    const mousePos = useMousePosition();
    return (
        <div
            id="tooltip"
            style={{ top: `${getMapPos(mousePos).y}px`, left: `${getMapPos(mousePos).x}px` }}
        ></div>
    );
};

export default Tooltip;

const getMapPos = (windowPos: MousePosition): MousePosition => {
    const { innerWidth: width, innerHeight: height } = window;
    let mapPosX = Math.floor(windowPos.x - (width - MapWidth) / 2);
    if (mapPosX < 0) mapPosX = 0;
    mapPosX += 20
    let mapPosY = Math.floor(windowPos.y - (height - MapHeight) / 2);
    if (mapPosY < 0) mapPosY = 0;
    mapPosY += 20
    return { x: mapPosX, y: mapPosY };
};
