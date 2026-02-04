"use client";

import { TypographyH3, TypographyMuted } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLogs } from "@/hooks/use-logs";

export default function LogsPage() {
  const { logs, loading, error } = useLogs();

  // Helper to format timestamp into Time and Date
  const formatTime = (timestamp: string) => {
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <TypographyH3>Logs Page</TypographyH3>
        <TypographyMuted>Write your logs for the day!</TypographyMuted>
      </div>
      <div className="flex justify-end">
        <Button disabled={loading}>Add Log</Button>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <div className="py-4 text-center text-sm text-muted-foreground">
              Loading logs...
            </div>
          ) : error ? (
            <div className="py-4 text-center text-sm text-red-500">{error}</div>
          ) : logs.length === 0 ? (
            <div className="py-4 text-center text-sm text-muted-foreground">
              No logs found.
            </div>
          ) : (
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
                    <TableCell>{formatTime(log.timestamp)}</TableCell>
                    <TableCell>{log.activity}</TableCell>
                    <TableCell>{log.duration}</TableCell>
                    <TableCell className="text-right">{log.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
