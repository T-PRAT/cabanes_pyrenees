import SideBar from "./layout/SideBar";
import Map from "./layout/Map";
import { CurrentHutContextProvider } from "./context/currentHutContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentHutContextProvider>
        <div className="flex">
          <SideBar />
          <Map />
        </div>
      </CurrentHutContextProvider>
    </QueryClientProvider>
  );
}

export default App;
