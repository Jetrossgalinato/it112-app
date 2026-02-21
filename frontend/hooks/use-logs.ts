import { useState, useEffect, useCallback } from "react";

export interface Log {
  id: number;
  title?: string;
  activity: string;
  duration: string;
  status: string;
  folder?: string;
  timestamp: string;
}

export function useLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs/`);
      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }
      const data = await response.json();
      setLogs(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError("Failed to load logs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLog = async (id: number, log: Partial<Log>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(log),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update log");
      }
      fetchLogs(); // Refresh logs after update
    } catch (err) {
      console.error("Error updating log:", err);
      throw err;
    }
  };

  const deleteLog = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logs/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete log");
      }
      fetchLogs(); // Refresh logs after delete
    } catch (err) {
      console.error("Error deleting log:", err);
      throw err;
    }
  };

  const deleteFolder = async (folderName: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logs/folder/${encodeURIComponent(folderName)}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete folder");
      }
      fetchLogs(); // Refresh logs after delete
    } catch (err) {
      console.error("Error deleting folder:", err);
      throw err;
    }
  };

  const updateFolder = async (oldFolderName: string, newFolderName: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logs/folder/${encodeURIComponent(oldFolderName)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ new_folder_name: newFolderName }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update folder");
      }
      fetchLogs(); // Refresh logs after update
    } catch (err) {
      console.error("Error updating folder:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    refreshLogs: fetchLogs,
    updateLog,
    deleteLog,
    deleteFolder,
    updateFolder,
  };
}

export function useAddLog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLog = async (
    title: string,
    activity: string,
    duration: string,
    status: string,
    folder: string = "General",
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          activity,
          duration,
          status,
          folder,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add log");
      }

      return true;
    } catch (err) {
      console.error("Error adding log:", err);
      setError("Failed to add log. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addLog, loading, error };
}
