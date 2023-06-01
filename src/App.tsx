import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Map from "./components/Map";
import Wrapper from "./components/Wrapper";
import "./App.css";
import MapButtons from "./components/MapButtons";
import QuestionModal from "./components/Modal/QuestionModal";
import { useState } from "react";

function App() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const onProvinceClick = (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  return (
    <>
      <Wrapper>
        <TransformWrapper>
          <TransformComponent>
            <Map onClick={onProvinceClick} />
          </TransformComponent>
          <MapButtons />
          <QuestionModal
            isOpen={isOpenModal}
            id={selectedId!!}
            closeModal={() => setOpenModal(false)}
            getAnswer={(a) => console.log(a)}
          />
        </TransformWrapper>
      </Wrapper>
    </>
  );
}

export default App;
