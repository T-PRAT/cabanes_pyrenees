import SideBar from "@/components/SideBar";
import Map from "@/components/Map";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex text-foreground">
      <SideBar />
      <Map />
    </div>
  );
}
