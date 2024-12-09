import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useContext } from "react";
import { cabIcon } from "../lib/icons";
import { CurrentHutContext } from "../context/currentHutContext";
import { useQuery } from "@tanstack/react-query";
import { getHutss } from "../hooks/getData";

export const Markers = () => {
  const { setCurrentHut } = useContext(CurrentHutContext);

  const { data: hutss, status } = useQuery({
    queryKey: ["hutss"],
    queryFn: () => getHutss(),
  });

  function changeHutsContext(id: number) {
    setCurrentHut(id);
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
};
