import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Map from "./components/Map";
import Wrapper from "./components/Wrapper";
import "./App.css";

function App() {
  return (
    <Wrapper>
      <TransformWrapper>
        <TransformComponent>
          <Map />
        </TransformComponent>
      </TransformWrapper>
    </Wrapper>
  );
}

export default App;
