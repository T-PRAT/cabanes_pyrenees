import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useContext } from "react";
import { cabIcon } from "../lib/icons";
import { CurrentHutsContext } from "../context/currentHutsContext";
import { useQuery } from "@tanstack/react-query";
import { getHutss } from "../hooks/getData";

export default function Markers() {
  const { setCurrentHuts } = useContext(CurrentHutsContext);

  const { data: hutss, status } = useQuery({
    queryKey: ["hutss"],
    queryFn: () => getHutss(),
  });

  function changeHutsContext(id: number) {
    setCurrentHuts(id);
  }

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;
  else
    return (
      <MarkerClusterGroup chunkedLoading>
        {hutss?.map((huts) => (
          <Marker
            key={huts.id}
            position={[Number(huts.latitude), Number(huts.longitude)]}
            icon={cabIcon}
            eventHandlers={{ click: () => changeHutsContext(huts.id) }}
          >
            <Popup>
              <h3>{huts.name}</h3>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    );
}
