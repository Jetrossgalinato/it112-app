"use client";

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
import { useEditFolderDialog } from "../composables/useEditFolderDialog";

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
  const { folderName, setFolderName, loading, handleOpenChange, handleSubmit } =
    useEditFolderDialog({ currentFolderName, onOpenChange, onFolderUpdated });

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
