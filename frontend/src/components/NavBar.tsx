import { Link } from "@tanstack/react-router";
import { AuthDialog } from "@/components/AuthDialog";

export const NavBar = () => {
  return (
    <div className="absolute top-10 z-20 bg-background p-4 space-x-6 rounded-xl shadow-lg flex justify-between left-1/3">
      <Link to="/" className="font-semibold [&.active]:font-extrabold">
        Cabane des Pyrénées
      </Link>{" "}
      <div className="inline-flex space-x-3">
        <Link to="/list" className="font-semibold [&.active]:font-extrabold">
          List
        </Link>{" "}
        <Link to="/about" className="font-semibold [&.active]:font-extrabold">
          About
        </Link>
        <AuthDialog />
      </div>
    </div>
  );
};
