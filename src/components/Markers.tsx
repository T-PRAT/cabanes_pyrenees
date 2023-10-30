import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useContext } from "react";
import { cabIcon } from "../lib/icons";
import { CurrentHutContext } from "../context/currentHutContext";
import { useQuery } from "@tanstack/react-query";
import { getHuts } from "../hooks/getData";

export default function Markers() {
  const { setCurrentHut } = useContext(CurrentHutContext);

  const { data: huts, status } = useQuery({
    queryKey: ["huts"],
    queryFn: () => getHuts(),
  });

  function changeHutContext(id: number) {
    setCurrentHut(id);
  }

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;
  else
    return (
      <MarkerClusterGroup chunkedLoading>
        {huts?.map((hut) => (
          <Marker
            key={hut.id}
            position={[hut.latitude, hut.longitude]}
            icon={cabIcon}
            eventHandlers={{ click: () => changeHutContext(hut.id) }}
          >
            <Popup>
              <h3>{hut.name}</h3>
              <p>{hut.city}</p>
              <p>{hut.altitude}m</p>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    );
}
