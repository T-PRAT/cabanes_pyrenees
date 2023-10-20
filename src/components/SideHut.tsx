import CurrentHutContext from "../context/currentHut";
import { useContext } from "react";

export default function SideHut() {
  const currentHut = useContext(CurrentHutContext);
  console.log(currentHut);
  return <div>SideHut</div>;
}
