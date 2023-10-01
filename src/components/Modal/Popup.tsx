import { useEffect } from "react";
import checkIcon from "../../assets/check_icon.svg";
import usePlayStateStore from "../../stores/playStateStore";
import "./Modal.css";

const TimeOut = 5; // in second

let setClosePopup: number | undefined = undefined;

const Popup = () => {
    const popupMessage = usePlayStateStore(
        ({ playState }) => playState.popupMessage
    );
    const closePopup = usePlayStateStore((store) => store.closePopup);

    useEffect(() => {
        if (popupMessage !== null) {
            clearTimeout(setClosePopup);
            setClosePopup = setTimeout(closePopup, TimeOut * 1000);
        }
    }, [popupMessage]);

    return (
        <>
            {popupMessage && (
                <div className="animate__animated animate__bounceIn modal--popup__wrapper">
                    <div className="modal modal--popup">
                        <img src={checkIcon} alt="Check_icon" />
                        <span className="modal__popup-message">
                            {popupMessage}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
