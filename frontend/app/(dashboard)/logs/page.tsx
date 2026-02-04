import { TypographyH3, TypographyMuted } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const logs = [
  {
    id: "LOG-001",
    time: "09:00 AM",
    activity: "Daily Standup",
    duration: "15m",
    status: "Completed",
  },
  {
    id: "LOG-002",
    time: "09:15 AM",
    activity: "Email Review",
    duration: "30m",
    status: "Completed",
  },
  {
    id: "LOG-003",
    time: "10:00 AM",
    activity: "Development - Ticket #1234",
    duration: "2h",
    status: "In Progress",
  },
  {
    id: "LOG-004",
    time: "01:00 PM",
    activity: "Lunch Break",
    duration: "1h",
    status: "Completed",
  },
  {
    id: "LOG-005",
    time: "02:00 PM",
    activity: "Client Meeting",
    duration: "1h",
    status: "Scheduled",
  },
];

export default function LogsPage() {
  return (
    <div className="p-4 space-y-4">
      <div>
        <TypographyH3>Logs Page</TypographyH3>
        <TypographyMuted>Write your logs for the day!</TypographyMuted>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.time}</TableCell>
                  <TableCell>{log.activity}</TableCell>
                  <TableCell>{log.duration}</TableCell>
                  <TableCell className="text-right">{log.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
