import { useState, useEffect } from "react";
import { useAddLog } from "@/hooks/use-logs";
import { useAlert } from "@/context/alert-context";

interface UseAddLogModalProps {
  defaultFolder?: string;
  onOpenChange: (open: boolean) => void;
  onLogAdded: () => void;
}

export function useAddLogModal({
  defaultFolder = "General",
  onOpenChange,
  onLogAdded,
}: UseAddLogModalProps) {
  const [activity, setActivity] = useState("");
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [status, setStatus] = useState("");
  const [folder, setFolder] = useState(defaultFolder);
  const { addLog, loading } = useAddLog();
  const { showAlert } = useAlert();

  useEffect(() => {
    setFolder(defaultFolder);
  }, [defaultFolder]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setActivity("");
      setTitle("");
      setHours("");
      setMinutes("");
      setStatus("");
    }
    onOpenChange(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const folderToSave = folder.trim() === "" ? "General" : folder;
      const duration =
        hours === "" && minutes === ""
          ? ""
          : `${Number(hours) || 0}h ${Number(minutes) || 0}m`;
      await addLog(title, activity, duration, status, folderToSave);
      onLogAdded();
      handleOpenChange(false);
      showAlert("Log added successfully!", "success");
    } catch (error) {
      console.error("Failed to add log:", error);
      showAlert("Failed to add log. Please try again.", "destructive");
    }
  };

  return {
    activity,
    setActivity,
    title,
    setTitle,
    hours,
    setHours,
    minutes,
    setMinutes,
    status,
    setStatus,
    folder,
    setFolder,
    loading,
    handleOpenChange,
    handleSubmit,
  };
}
