"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Log } from "@/hooks/use-logs";
import { getStatusColor } from "@/lib/helpers";

interface ViewLogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  log: Log | null;
}

export function ViewLogDialog({
  isOpen,
  onOpenChange,
  log,
}: ViewLogDialogProps) {
  if (!log) return null;

  const formatTime = (timestamp: string) => {
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fields: { label: string; value: React.ReactNode }[] = [
    { label: "Date & Time", value: formatTime(log.timestamp) },
    { label: "Folder", value: log.folder || "General" },
    { label: "Title", value: log.title || "-" },
    {
      label: "Activity",
      value: (
        <span className="whitespace-pre-wrap break-words">{log.activity}</span>
      ),
    },
    { label: "Duration", value: log.duration || "-" },
    {
      label: "Status",
      value: <Badge className={getStatusColor(log.status)}>{log.status}</Badge>,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>View Log</DialogTitle>
          <DialogDescription>
            Full details of the selected log entry.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          {fields.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-4 gap-3 items-start">
              <span className="text-sm font-medium text-muted-foreground text-right pt-0.5">
                {label}
              </span>
              <div className="col-span-3 text-sm">{value}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
