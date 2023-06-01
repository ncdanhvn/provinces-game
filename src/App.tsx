import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Map from "./components/Map";
import Wrapper from "./components/Wrapper";
import "./App.css";
import MapButtons from "./components/MapButtons";

function App() {
  return (
    <>
      <Wrapper>
        <TransformWrapper>
          <TransformComponent>
            <Map />
          </TransformComponent>
          <MapButtons />
        </TransformWrapper>
      </Wrapper>
    </>
  );
}

export default App;
