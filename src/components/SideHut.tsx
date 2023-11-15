import { useContext } from "react";
import { CurrentHutContext } from "../context/currentHutContext";
import { useQuery } from "@tanstack/react-query";
import { getHut } from "../hooks/getData";

export default function SideHut() {
  const { currentHut } = useContext(CurrentHutContext);

  const { data: hut, status } = useQuery({
    queryKey: ["hut", currentHut],
    queryFn: () => getHut(currentHut),
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;
  else
    return (
      <div className="p-2 my-4 border border-zinc-400">
        <h2 className="text-xl font-semibold text-center">{hut?.name}</h2>
        <p className="py-3 text-md">{hut?.description}</p>
        <table className="my-2 text-left border table-auto border-">
          <tbody>
            <tr>
              <th className="p-2 border border-">Capacité été:</th>
              <td className="p-2 border border-">{hut?.summer_capacity}</td>
            </tr>
            <tr>
              <th className="p-2 border border-">Capacité hiver:</th>
              <td className="p-2 border border-">{hut?.winter_capacity}</td>
            </tr>
          </tbody>
        </table>
        <table className="text-center border table-auto border-">
          <thead>
            <tr>
              <th className="p-2 border border-">Altitude</th>
              <th className="p-2 border border-">Latitude</th>
              <th className="p-2 border border-">Longitude</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-">{hut?.altitude}</td>
              <td className="p-2 border border-">{hut?.latitude}</td>
              <td className="p-2 border border-">{hut?.longitude}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}
