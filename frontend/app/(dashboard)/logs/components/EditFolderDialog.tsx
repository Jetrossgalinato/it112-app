"use client";

import { useState, useEffect } from "react";
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

interface EditFolderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentFolderName: string | null;
  onFolderUpdated: (oldName: string, newName: string) => Promise<void>;
}

export function EditFolderDialog({
  isOpen,
  onOpenChange,
  currentFolderName,
  onFolderUpdated,
}: EditFolderDialogProps) {
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (currentFolderName) {
      setFolderName(currentFolderName);
    }
  }, [currentFolderName]);

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

    if (!currentFolderName) {
      showAlert("No folder selected for editing.", "destructive");
      return;
    }

    if (folderName.trim() === currentFolderName) {
      showAlert("Please provide a different folder name.", "destructive");
      return;
    }

    setLoading(true);
    try {
      await onFolderUpdated(currentFolderName, folderName.trim());
      handleOpenChange(false);
      showAlert(
        `Folder renamed to "${folderName.trim()}" successfully!`,
        "success",
      );
    } catch (error) {
      console.error("Failed to update folder:", error);
      showAlert("Failed to update folder. Please try again.", "destructive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Folder</DialogTitle>
          <DialogDescription>
            Rename the folder. All logs within this folder will be updated.
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
              {loading ? "Updating..." : "Update Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
