import { useContext } from "react";
import { CurrentHutContext } from "../context/currentHutContext";
import { useQuery } from "@tanstack/react-query";
import { getHut } from "../hooks/getData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

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
      <Card>
        <CardHeader>
          <CardTitle>{hut?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <p className="py-3 text-md">{hut?.description}</p>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Capacité été:</TableHead>
                <TableCell>{hut?.summer_capacity}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Capacité hiver:</TableHead>
                <TableCell>{hut?.winter_capacity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <table className="text-center border table-auto border-">
            <thead>
              <TableRow>
                <TableHead>Altitude</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
              </TableRow>
            </thead>
            <tbody>
              <TableRow>
                <TableCell>{hut?.altitude}</TableCell>
                <TableCell>{hut?.latitude}</TableCell>
                <TableCell>{hut?.longitude}</TableCell>
              </TableRow>
            </tbody>
          </table> */}
        </CardContent>
      </Card>
    );
}
