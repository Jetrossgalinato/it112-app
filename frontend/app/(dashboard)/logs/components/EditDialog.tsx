"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlert } from "@/context/alert-context";
import { useLogs, Log } from "@/hooks/use-logs";
import { ChevronDown } from "lucide-react";
import { getStatusColor } from "@/lib/helpers";

interface EditLogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  log: Log | null;
  onLogUpdated: () => void;
  folders?: string[];
}

export function EditLogDialog({
  isOpen,
  onOpenChange,
  log,
  onLogUpdated,
  folders = [],
}: EditLogDialogProps) {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [folder, setFolder] = useState("");
  const { updateLog } = useLogs();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (log) {
      setActivity(log.activity);
      setDuration(log.duration);
      setStatus(log.status);
      setFolder(log.folder || "General");
    }
  }, [log]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!log) return;

    setLoading(true);
    try {
      await updateLog(log.id, { activity, duration, status, folder });
      onLogUpdated();
      onOpenChange(false);
      showAlert("Log updated successfully!", "success");
    } catch {
      showAlert("Failed to update log. Please try again.", "destructive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Log</DialogTitle>
          <DialogDescription>
            Make changes to your log here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-folder" className="text-right">
                Folder
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-between"
                  >
                    {folder || "Select Folder"}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="start">
                  {folders.length > 0 ? (
                    folders.map((f) => (
                      <DropdownMenuItem key={f} onSelect={() => setFolder(f)}>
                        {f}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      No folders available
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-activity" className="text-right">
                Activity
              </Label>
              <Input
                id="edit-activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-duration" className="text-right">
                Duration
              </Label>
              <Input
                id="edit-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="col-span-3"
                placeholder="e.g. 1h 30m"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-between"
                  >
                    {status ? (
                      <div className="flex items-center">
                        <span
                          className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(
                            status,
                          )}`}
                        />
                        {status}
                      </div>
                    ) : (
                      "Select Status"
                    )}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="start">
                  {["Not Started", "Pending", "In Progress", "Completed"].map(
                    (s) => (
                      <DropdownMenuItem key={s} onSelect={() => setStatus(s)}>
                        <span
                          className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(
                            s,
                          )}`}
                        />
                        {s}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
