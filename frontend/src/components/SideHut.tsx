import { useContext } from "react";
import { CurrentHutContext } from "../context/currentHutContext";
import { useQuery } from "@tanstack/react-query";
import { getHut } from "../hooks/request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

export const SideHut = () => {
  const { currentHut } = useContext(CurrentHutContext);

  const { data: hut, status } = useQuery({
    queryKey: ["hut", currentHut],
    queryFn: () => getHut(currentHut),
  });

  return (
    <div className={`absolute left-5 top-28 z-10 ${!currentHut ? "hidden" : ""}`}>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>Error :(</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{hut?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="py-3 text-md">{hut?.description}</p>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>Capacité été:</TableHead>
                  <TableCell>{hut?.summerCapacity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Capacité hiver:</TableHead>
                  <TableCell>{hut?.winterCapacity}</TableCell>
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
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
