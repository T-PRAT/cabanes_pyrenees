import SideBar from "./layout/SideBar";
import Map from "./layout/Map";
import { CurrentHutContextProvider } from "./context/currentHutContext";

function App() {
  return (
    <CurrentHutContextProvider>
      <div className="flex">
        <SideBar />
        <Map />
      </div>
    </CurrentHutContextProvider>
  );
}

export default App;
