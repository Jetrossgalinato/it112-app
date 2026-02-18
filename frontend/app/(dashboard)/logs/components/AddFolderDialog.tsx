"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface AddFolderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFolderAdded: () => void;
}

export function AddFolderDialog({
  isOpen,
  onOpenChange,
  onFolderAdded,
}: AddFolderDialogProps) {
  const [folderName, setFolderName] = useState("");
  const { addLog, loading } = useAddLog();
  const { showAlert } = useAlert();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFolderName("");
    }
    onOpenChange(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName.trim()) {
      showAlert("Folder name cannot be empty.", "destructive");
      return;
    }

    try {
      // Create a placeholder log to initialize the folder
      await addLog(
        "Folder Created", // Placeholder activity
        "0m",            // Placeholder duration
        "Completed",     // Placeholder status
        folderName.trim()
      );

      onFolderAdded();
      handleOpenChange(false);
      showAlert(`Folder "${folderName}" created successfully!`, "success");
    } catch (error) {
      console.error("Failed to create folder:", error);
      showAlert("Failed to create folder. Please try again.", "destructive");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for the new folder. This will create an initial log entry to establish the folder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderName" className="text-right">
                Name
              </Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="col-span-3"
                placeholder="e.g. Project Alpha"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
