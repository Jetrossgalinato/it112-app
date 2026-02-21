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
  folders?: string[];
}

export function AddLogModal({
  isOpen,
  onOpenChange,
  onLogAdded,
  defaultFolder = "General",
  folders = [],
}: AddLogModalProps) {
  const [activity, setActivity] = useState("");
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
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
      // Ensure folder is not empty, default to "General" if user cleared it
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
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Short title for this activity"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="activity" className="text-right pt-2">
                Activity
              </Label>
              <textarea
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="col-span-3 min-h-[100px] max-h-[200px] resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-y-auto"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Duration</Label>
              <div className="col-span-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={hours}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setHours("");
                        return;
                      }
                      setHours(String(Math.max(0, Math.min(23, Number(val)))));
                    }}
                    className="w-16 rounded-md border border-input bg-background px-2 py-1.5 text-sm text-center shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <span className="text-sm text-muted-foreground">h</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={minutes}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setMinutes("");
                        return;
                      }
                      setMinutes(
                        String(Math.max(0, Math.min(59, Number(val)))),
                      );
                    }}
                    className="w-16 rounded-md border border-input bg-background px-2 py-1.5 text-sm text-center shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <span className="text-sm text-muted-foreground">m</span>
                </div>
              </div>
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
