"use client";

import { useState, useMemo } from "react";
import { TypographyH3, TypographyMuted } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus, Folder, ArrowLeft, FolderPlus, Trash } from "lucide-react";
import { useLogs, Log } from "@/hooks/use-logs";
import { AddLogModal } from "@/app/(dashboard)/logs/components/AddLogModal";
import { AddFolderDialog } from "@/app/(dashboard)/logs/components/AddFolderDialog";
import { EditLogDialog } from "@/app/(dashboard)/logs/components/EditDialog";
import { DeleteDialog } from "@/components/delete-dialog";
import { useAlert } from "@/context/alert-context";
import { LogsTable } from "@/app/(dashboard)/logs/components/LogsTable";
import { Export } from "@/app/(dashboard)/logs/components/Export";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LogsPage() {
  const { logs, loading, error, refreshLogs, deleteLog, deleteFolder } =
    useLogs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteFolderOpen, setIsDeleteFolderOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);
  const [targetFolder, setTargetFolder] = useState<string>("General");
  const { showAlert } = useAlert();

  const uniqueFolders = useMemo(() => {
    const folders = new Set(logs.map((log) => log.folder || "General"));
    return Array.from(folders).sort();
  }, [logs]);

  const filteredLogs = useMemo(() => {
    if (!selectedFolder) return [];
    return logs.filter((log) => (log.folder || "General") === selectedFolder);
  }, [logs, selectedFolder]);

  const handleEdit = (log: Log) => {
    setSelectedLog(log);
    setIsEditOpen(true);
  };

  const handleDelete = (log: Log) => {
    setSelectedLog(log);
    setIsDeleteOpen(true);
  };

  const handleDeleteFolder = (folder: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFolderToDelete(folder);
    setIsDeleteFolderOpen(true);
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

  const confirmDeleteFolder = async () => {
    if (!folderToDelete) return;
    setDeleteLoading(true);
    try {
      await deleteFolder(folderToDelete);
      showAlert(`Folder "${folderToDelete}" deleted successfully`, "success");
      setIsDeleteFolderOpen(false);
      setFolderToDelete(null);
    } catch {
      showAlert("Failed to delete folder", "destructive");
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
        defaultFolder={targetFolder}
      />
      <AddFolderDialog
        isOpen={isFolderOpen}
        onOpenChange={setIsFolderOpen}
        onFolderAdded={refreshLogs}
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
      <DeleteDialog
        isOpen={isDeleteFolderOpen}
        onOpenChange={setIsDeleteFolderOpen}
        onConfirm={confirmDeleteFolder}
        title={
          folderToDelete
            ? `Delete Folder "${folderToDelete}"?`
            : "Delete Folder"
        }
        description={
          folderToDelete
            ? `Are you sure you want to delete the folder "${folderToDelete}"? ALL logs within this folder will be permanently deleted. This action cannot be undone.`
            : "Are you sure you want to delete this folder?"
        }
        loading={deleteLoading}
      />

      {!selectedFolder ? (
        // Folder View
        <div className="space-y-6">
          <div>
            <TypographyH3>Logs Folders</TypographyH3>
            <TypographyMuted>Select a folder to view logs.</TypographyMuted>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsFolderOpen(true)}>
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading folders...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueFolders.map((folder) => (
                <Card
                  key={folder}
                  className="cursor-pointer hover:bg-muted/50 transition-colors group relative"
                  onClick={() => setSelectedFolder(folder)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium truncate pr-2 flex-1">
                      {folder}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => handleDeleteFolder(folder, e)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                      <Folder className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        logs.filter((l) => (l.folder || "General") === folder)
                          .length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Total Logs</p>
                  </CardContent>
                </Card>
              ))}
              {uniqueFolders.length === 0 && !loading && (
                <div className="col-span-full text-center text-muted-foreground py-10">
                  No logs found. Create one to get started!
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Logs Table View
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedFolder(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <TypographyH3>{selectedFolder}</TypographyH3>
                <TypographyMuted>
                  Viewing logs in {selectedFolder}
                </TypographyMuted>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Export logs={filteredLogs} />
              <Button
                onClick={() => {
                  setTargetFolder(selectedFolder || "General");
                  setIsModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Log
              </Button>
            </div>
          </div>

          <LogsTable
            logs={filteredLogs}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
