import { useContext } from "react";
import { CurrentHutsContext } from "../context/currentHutsContext";
import { useQuery } from "@tanstack/react-query";
import { getHuts } from "../hooks/getData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

export default function SideHuts() {
  const { currentHuts } = useContext(CurrentHutsContext);

  const { data: huts, status } = useQuery({
    queryKey: ["huts", currentHuts],
    queryFn: () => getHuts(currentHuts),
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;
  else
    return (
      <Card>
        <CardHeader>
          <CardTitle>{huts?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <p className="py-3 text-md">{huts?.description}</p>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Capacité été:</TableHead>
                <TableCell>{huts?.summer_capacity}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Capacité hiver:</TableHead>
                <TableCell>{huts?.winter_capacity}</TableCell>
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
                <TableCell>{huts?.altitude}</TableCell>
                <TableCell>{huts?.latitude}</TableCell>
                <TableCell>{huts?.longitude}</TableCell>
              </TableRow>
            </tbody>
          </table> */}
        </CardContent>
      </Card>
    );
}
