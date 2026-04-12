import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVisitors } from "@/hooks/use-visitors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PreviousVisits() {
  const { visitors } = useVisitors();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVisits = visitors.filter(visitor => 
    visitor.phone.includes(searchTerm) || 
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Visit History</h2>
        <p className="text-muted-foreground">Search and view records of past visitors.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Records</CardTitle>
          <CardDescription>Find past visits by name or mobile number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone (e.g. 555-0101)"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search-history"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisits.length > 0 ? (
                  filteredVisits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">
                        {visit.date} <span className="text-muted-foreground text-xs ml-1">{visit.time}</span>
                      </TableCell>
                      <TableCell>{visit.name}</TableCell>
                      <TableCell className="text-muted-foreground">{visit.phone}</TableCell>
                      <TableCell>{visit.meetWith}</TableCell>
                      <TableCell>{visit.purpose}</TableCell>
                      <TableCell>
                        {visit.status === "Pending" && (
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pending</Badge>
                        )}
                        {visit.status === "Approved" && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">Approved</Badge>
                        )}
                        {visit.status === "Rejected" && (
                          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">Rejected</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No matching records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}