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
import { useAddLog } from "@/hooks/use-logs";
import { ChevronDown } from "lucide-react";
import { getStatusColor } from "@/lib/helpers";

interface AddLogModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLogAdded: () => void;
  defaultFolder?: string;
}

export function AddLogModal({
  isOpen,
  onOpenChange,
  onLogAdded,
  defaultFolder = "General",
}: AddLogModalProps) {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [folder, setFolder] = useState(defaultFolder);
  const { addLog, loading } = useAddLog();
  const { showAlert } = useAlert();

  // Update folder when defaultFolder changes
  useEffect(() => {
    setFolder(defaultFolder);
  }, [defaultFolder]);

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setActivity("");
      setDuration("");
      setStatus("");
    }
    onOpenChange(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Ensure folder is not empty, default to "General" if user cleared it
      const folderToSave = folder.trim() === "" ? "General" : folder;

      await addLog(activity, duration, status, folderToSave);

      onLogAdded();
      handleOpenChange(false);
      showAlert("Log added successfully!", "success");
    } catch (error) {
      console.error("Failed to add log:", error);
      showAlert("Failed to add log. Please try again.", "destructive");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Daily Log</DialogTitle>
          <DialogDescription>
            Enter the details of your activity here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folder" className="text-right">
                Folder
              </Label>
              <Input
                id="folder"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activity" className="text-right">
                Activity
              </Label>
              <Input
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="col-span-3"
                placeholder="e.g. 1h 30m"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
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
