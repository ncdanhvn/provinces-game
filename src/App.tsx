import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Map from "./components/Map";

function App() {
  return (
    <div style={{ width: "600px", height: "800px", border: "solid 1px black" }}>
      <TransformWrapper>
        <TransformComponent>
          <Map />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default App;
