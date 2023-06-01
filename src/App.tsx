import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "./App.css";
import Map from "./components/Map";
import MapButtons from "./components/MapButtons";
import QuestionModal from "./components/Modal/QuestionModal";
import Wrapper from "./components/Wrapper";

export interface Province {
  id: number;
  name: string;
}

const provinceData: Province[] = [];

function App() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [answeredProvinces, setAnwseredProvinces] = useState<Province[]>([]);

  const onProvinceClick = (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  return (
    <>
      <Wrapper>
        <TransformWrapper>
          <TransformComponent>
            <Map
              onClick={onProvinceClick}
              answeredProvinces={answeredProvinces}
            />
          </TransformComponent>
          <MapButtons />
          <QuestionModal
            isOpen={isOpenModal}
            id={selectedId!!}
            closeModal={() => setOpenModal(false)}
            getAnswer={(a) => {
              setAnwseredProvinces([
                ...answeredProvinces,
                { id: selectedId!!, name: a },
              ]);
              provinceData.push({ id: selectedId!!, name: a });
              console.log(provinceData);
            }}
          />
        </TransformWrapper>
      </Wrapper>
    </>
  );
}

export default App;
