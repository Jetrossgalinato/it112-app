import { useState, useEffect, useCallback } from "react";

export interface Log {
  id: number;
  activity: string;
  duration: string;
  status: string;
  timestamp: string;
}

export function useLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/logs/");
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

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, error, refreshLogs: fetchLogs };
}

export function useAddLog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLog = async (activity: string, duration: string, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/logs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity,
          duration,
          status,
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
