import { RxReset } from "react-icons/rx";
import { BiPlus, BiMinus } from "react-icons/bi";
import { IoInformationSharp } from "react-icons/io5";
import { useControls } from "react-zoom-pan-pinch";
import InfoPopup from "./Modal/InfoPopup";

const MapButtons = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <>
      <div
        className="map-buttons reset-button"
        onClick={() => resetTransform()}
      >
        <RxReset className="map-buttons-icon" />
      </div>
      <div className="map-buttons button-group">
        <div className="zoom-buttons" onClick={() => zoomIn()}>
          <BiPlus className="map-buttons-icon" />
        </div>
        <div className="zoom-buttons" onClick={() => zoomOut()}>
          <BiMinus className="map-buttons-icon" />
        </div>
      </div>
      <div
        className="map-buttons info-button"
        onClick={() => console.log("Click info button")}
      >
        <IoInformationSharp className="map-buttons-icon info-button-icon" />
        <InfoPopup />
      </div>
    </>
  );
};

export default MapButtons;
