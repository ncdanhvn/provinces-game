import { useState } from "react";
import { MousePosition } from "../interfaces";

export default function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
    });

    window.addEventListener("mousemove", (e) =>
        setMousePosition({ x: e.clientX, y: e.clientY })
    );

    return mousePosition;
}
