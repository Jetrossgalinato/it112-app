"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Log } from "@/hooks/use-logs";
import { getStatusColor } from "@/lib/helpers";
import { Card, CardContent } from "@/components/ui/card";

interface LogsTableProps {
  logs: Log[];
  loading: boolean;
  error: string | null;
  onEdit: (log: Log) => void;
  onDelete: (log: Log) => void;
}

export function LogsTable({
  logs,
  loading,
  error,
  onEdit,
  onDelete,
}: LogsTableProps) {
  // Helper to format timestamp into Time and Date
  const formatTime = (timestamp: string) => {
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
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
                <TableHead>Date & Time</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{formatTime(log.timestamp)}</TableCell>
                  <TableCell>{log.title || "-"}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={log.activity}>
                      {log.activity}
                    </div>
                  </TableCell>
                  <TableCell>{log.duration || "-"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(log)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(log)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
