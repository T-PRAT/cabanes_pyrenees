import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="absolute top-10 z-20 bg-background p-4 rounded-xl shadow-lg flex justify-between left-1/3">
        <Link to="/" className="[&.active]:font-bold">
          Cabane des Pyrénées
        </Link>{" "}
        <div className="space-x-3">
          <Link to="/list" className="[&.active]:font-bold">
            List
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
