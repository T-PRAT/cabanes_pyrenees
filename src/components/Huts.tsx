// import { Marker } from "react-leaflet";
// import { supabase } from "../lib/supabaseClient";
// import { useEffect, useState } from "react";

// interface Hut {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
// }

// export default function Huts() {
//   const [huts, setHuts] = useState<Hut[]>([]);

//   useEffect(() => {
//     getHuts();
//   }, []);

//   async function getHuts() {
//     const { data, error } = await supabase.from("hut").select("*");
//     if (error) console.log("error", error);
//     if (data) {
//       setHuts(data);
//     }
//   }

//   return (
//     <>
//       {huts.map((hut) => (
//         <Marker
//           key={hut.id}
//           position={[hut.latitude, hut.longitude]}
//           icon={cabIcon}
//         ></Marker>
//       ))}
//     </>
//   );
// }
