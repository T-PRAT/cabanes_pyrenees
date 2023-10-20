import SideBar from "./layout/SideBar";
import Map from "./layout/Map";
import CurrentHutContext from "./context/currentHut";

function App() {
  return (
    <div className="flex ">
      <CurrentHutContext.Provider value={0}>
        <SideBar />
        <Map />
      </CurrentHutContext.Provider>
    </div>
  );
}

export default App;
