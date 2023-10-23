import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { supabase } from "../lib/supabaseClient";
import { useContext, useEffect, useState } from "react";
import { cabIcon } from "../lib/icons";
import { CurrentHutContext } from "../context/currentHutContext";

export interface Hut {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  description: string;
  city: string;
  summer_capacity: number;
  winter_capacity: number;
}

export default function Markers() {
  const { setCurrentHut } = useContext(CurrentHutContext);
  const [huts, setHuts] = useState<Hut[]>([]);
  useEffect(() => {
    getHuts();
  }, []);

  async function getHuts() {
    const { data, error } = await supabase.from("hut").select("*");
    if (error) console.log("error", error);
    if (data) {
      setHuts(data);
    }
  }
  function changeHutContext(id: number) {
    setCurrentHut(id);
  }

  return (
    <MarkerClusterGroup chunkedLoading>
      {huts.map((hut) => (
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
