import { useState, useEffect } from "react";
import { useAlert } from "@/context/alert-context";

interface UseEditFolderDialogProps {
  currentFolderName: string | null;
  onOpenChange: (open: boolean) => void;
  onFolderUpdated: (oldName: string, newName: string) => Promise<void>;
}

export function useEditFolderDialog({
  currentFolderName,
  onOpenChange,
  onFolderUpdated,
}: UseEditFolderDialogProps) {
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (currentFolderName) setFolderName(currentFolderName);
  }, [currentFolderName]);

  const handleOpenChange = (open: boolean) => {
    if (!open) setFolderName("");
    onOpenChange(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) {
      showAlert("Folder name cannot be empty.", "destructive");
      return;
    }
    if (!currentFolderName) {
      showAlert("No folder selected for editing.", "destructive");
      return;
    }
    if (folderName.trim() === currentFolderName) {
      showAlert("Please provide a different folder name.", "destructive");
      return;
    }
    setLoading(true);
    try {
      await onFolderUpdated(currentFolderName, folderName.trim());
      handleOpenChange(false);
      showAlert(
        `Folder renamed to "${folderName.trim()}" successfully!`,
        "success",
      );
    } catch (error) {
      console.error("Failed to update folder:", error);
      showAlert("Failed to update folder. Please try again.", "destructive");
    } finally {
      setLoading(false);
    }
  };

  return {
    folderName,
    setFolderName,
    loading,
    handleOpenChange,
    handleSubmit,
  };
}
