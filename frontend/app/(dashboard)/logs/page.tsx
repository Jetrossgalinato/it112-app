"use client";

import { useState } from "react";
import { TypographyH3, TypographyMuted } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLogs, Log } from "@/hooks/use-logs";
import { AddLogModal } from "@/app/(dashboard)/logs/components/AddLogModal";
import { EditLogDialog } from "@/app/(dashboard)/logs/components/EditDialog";
import { DeleteDialog } from "@/components/delete-dialog";
import { useAlert } from "@/context/alert-context";
import { LogsTable } from "@/app/(dashboard)/logs/components/LogsTable";
import { Export } from "@/app/(dashboard)/logs/components/Export";

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
        <div className="flex justify-end gap-2">
          <Export logs={logs} />
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Log
          </Button>
        </div>
      </div>

      <LogsTable
        logs={logs}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}