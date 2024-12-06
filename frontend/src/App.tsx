import SideBar from "./layout/SideBar";
import Map from "./layout/Map";
import { CurrentHutsContextProvider } from "./context/currentHutsContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentHutsContextProvider>
        <div className="flex text-foreground">
          <SideBar />
          <Map />
        </div>
      </CurrentHutsContextProvider>
    </QueryClientProvider>
  );
}

export default App;
