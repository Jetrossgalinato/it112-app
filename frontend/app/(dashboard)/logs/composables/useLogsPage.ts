import { useState, useMemo } from "react";
import { useLogs, Log } from "@/hooks/use-logs";
import { useAlert } from "@/context/alert-context";

export function useLogsPage() {
  const {
    logs,
    loading,
    error,
    refreshLogs,
    deleteLog,
    deleteFolder,
    updateFolder,
  } = useLogs();
  const { showAlert } = useAlert();

  // Modal/Dialog States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteFolderOpen, setIsDeleteFolderOpen] = useState(false);
  const [isEditFolderOpen, setIsEditFolderOpen] = useState(false);

  // Selection States
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<string | null>(null);
  const [targetFolder, setTargetFolder] = useState<string>("General");

  // Loading States
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Computed Values
  const uniqueFolders = useMemo(() => {
    const folders = new Set(logs.map((log) => log.folder || "General"));
    return Array.from(folders).sort();
  }, [logs]);

  const filteredLogs = useMemo(() => {
    if (!selectedFolder) return [];
    return logs.filter((log) => (log.folder || "General") === selectedFolder);
  }, [logs, selectedFolder]);

  // Event Handlers
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

  const handleEditFolder = (folder: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFolderToEdit(folder);
    setIsEditFolderOpen(true);
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

  const confirmEditFolder = async (oldName: string, newName: string) => {
    try {
      await updateFolder(oldName, newName);
      await refreshLogs();
      // Update selectedFolder if it was the one being edited
      if (selectedFolder === oldName) {
        setSelectedFolder(newName);
      }
    } catch {
      throw new Error("Failed to update folder");
    }
  };

  return {
    // Data
    logs,
    loading,
    error,
    uniqueFolders,
    filteredLogs,

    // Modal/Dialog States
    isModalOpen,
    setIsModalOpen,
    isFolderOpen,
    setIsFolderOpen,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    isDeleteFolderOpen,
    setIsDeleteFolderOpen,
    isEditFolderOpen,
    setIsEditFolderOpen,

    // Selection States
    selectedLog,
    selectedFolder,
    setSelectedFolder,
    folderToDelete,
    folderToEdit,
    targetFolder,
    setTargetFolder,

    // Loading States
    deleteLoading,

    // Methods
    refreshLogs,
    handleEdit,
    handleDelete,
    handleDeleteFolder,
    handleEditFolder,
    confirmDelete,
    confirmDeleteFolder,
    confirmEditFolder,
  };
}
