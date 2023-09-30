import { MapHeight, MapWidth } from "../data/const";
import useMousePosition from "../hooks/useMousePosition";
import { MousePosition } from "../interfaces";
import "./Modal/Modal.css";

const Tooltip = () => {
    const mousePos = useMousePosition();
    return (
        <div
            id="tooltip"
            className="modal tooltip"
            // style={{
            //     top: `${getMapPos(mousePos).y}px`,
            //     left: `${getMapPos(mousePos).x}px`,
            // }}
        ></div>
    );
};

export default Tooltip;


