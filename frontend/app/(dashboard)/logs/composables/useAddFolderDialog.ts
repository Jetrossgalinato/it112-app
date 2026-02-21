import { useState } from "react";
import { useAddLog } from "@/hooks/use-logs";
import { useAlert } from "@/context/alert-context";

interface UseAddFolderDialogProps {
  onOpenChange: (open: boolean) => void;
  onFolderAdded: () => void;
}

export function useAddFolderDialog({
  onOpenChange,
  onFolderAdded,
}: UseAddFolderDialogProps) {
  const [folderName, setFolderName] = useState("");
  const { addLog, loading } = useAddLog();
  const { showAlert } = useAlert();

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
    try {
      await addLog(
        "Folder Created",
        "Initial Log Entry",
        "0m",
        "Completed",
        folderName.trim(),
      );
      onFolderAdded();
      handleOpenChange(false);
      showAlert(`Folder "${folderName}" created successfully!`, "success");
    } catch (error) {
      console.error("Failed to create folder:", error);
      showAlert("Failed to create folder. Please try again.", "destructive");
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
