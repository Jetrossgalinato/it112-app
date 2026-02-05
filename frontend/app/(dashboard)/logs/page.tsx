"use client";

import { useState } from "react";
import { TypographyH3, TypographyMuted } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLogs, Log } from "@/hooks/use-logs";
import { AddLogModal } from "@/app/(dashboard)/logs/components/AddLogModal";
import { EditLogDialog } from "@/app/(dashboard)/logs/components/EditDialog";
import { DeleteDialog } from "@/components/delete-dialog";
import { getStatusColor } from "@/lib/helpers";
import { useAlert } from "@/context/alert-context";

export default function LogsPage() {
  const { logs, loading, error, refreshLogs, deleteLog } = useLogs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleEdit = (log: Log) => {
    setSelectedLog(log);
    setIsEditOpen(true);
  };

  const handleDelete = (log: Log) => {
    setSelectedLog(log);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLog) return;
    setDeleteLoading(true);
    try {
      await deleteLog(selectedLog.id);
      showAlert("Log deleted successfully", "success");
      setIsDeleteOpen(false);
    } catch {
      showAlert("Failed to delete log", "destructive");
    } finally {
      setDeleteLoading(false);
    }
  };

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
      <AddLogModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onLogAdded={refreshLogs}
      />
      <EditLogDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        log={selectedLog}
        onLogUpdated={refreshLogs}
      />
      <DeleteDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        title="Delete Log"
        description="Are you sure you want to delete this log? This action cannot be undone."
        loading={deleteLoading}
      />
      <div>
        <TypographyH3>Logs Page</TypographyH3>
        <TypographyMuted>Write your logs for the day!</TypographyMuted>
        <div className="flex justify-end">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className=" h-4 w-4" />
            Add Log
          </Button>
        </div>
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
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.id}</TableCell>
                    <TableCell>{formatTime(log.timestamp)}</TableCell>
                    <TableCell>{log.activity}</TableCell>
                    <TableCell>{log.duration}</TableCell>
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
                          onClick={() => handleEdit(log)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(log)}
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
    </div>
  );
}
