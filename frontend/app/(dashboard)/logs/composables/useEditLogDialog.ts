import { useState, useEffect } from "react";
import { useLogs, Log } from "@/hooks/use-logs";
import { useAlert } from "@/context/alert-context";

interface UseEditLogDialogProps {
  log: Log | null;
  onOpenChange: (open: boolean) => void;
  onLogUpdated: () => void;
}

export function useEditLogDialog({
  log,
  onOpenChange,
  onLogUpdated,
}: UseEditLogDialogProps) {
  const [activity, setActivity] = useState("");
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [status, setStatus] = useState("");
  const [folder, setFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateLog } = useLogs();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (log) {
      setActivity(log.activity);
      setTitle(log.title || "");
      const match = log.duration ? log.duration.match(/(\d+)h\s*(\d+)m/) : null;
      if (match) {
        setHours(String(Number(match[1])));
        setMinutes(String(Number(match[2])));
      } else {
        setHours("");
        setMinutes("");
      }
      setStatus(log.status);
      setFolder(log.folder || "General");
    }
  }, [log]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!log) return;
    setLoading(true);
    try {
      const duration =
        hours === "" && minutes === ""
          ? null
          : `${Number(hours) || 0}h ${Number(minutes) || 0}m`;
      await updateLog(log.id, {
        title,
        activity,
        duration: duration ?? undefined,
        status,
        folder,
      });
      onLogUpdated();
      onOpenChange(false);
      showAlert("Log updated successfully!", "success");
    } catch {
      showAlert("Failed to update log. Please try again.", "destructive");
    } finally {
      setLoading(false);
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
    handleSubmit,
  };
}
