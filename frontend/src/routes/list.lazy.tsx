import { createLazyFileRoute } from "@tanstack/react-router";
import { HutList } from "@/components/HutList";

export const Route = createLazyFileRoute("/list")({
  component: List,
});

function List() {
  return (
    <div className="mt-24 container">
      <HutList />
    </div>
  );
}
