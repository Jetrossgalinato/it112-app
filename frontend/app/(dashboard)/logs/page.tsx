"use client";

import { TypographyH3, TypographyMuted } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, FolderPlus, Trash, Pencil } from "lucide-react";
import { AddLogModal } from "@/app/(dashboard)/logs/components/AddLogModal";
import { AddFolderDialog } from "@/app/(dashboard)/logs/components/AddFolderDialog";
import { EditLogDialog } from "@/app/(dashboard)/logs/components/EditDialog";
import { EditFolderDialog } from "@/app/(dashboard)/logs/components/EditFolderDialog";
import { DeleteDialog } from "@/components/delete-dialog";
import { LogsTable } from "@/app/(dashboard)/logs/components/LogsTable";
import { Export } from "@/app/(dashboard)/logs/components/Export";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLogsPage } from "@/app/(dashboard)/logs/composables/useLogsPage";

export default function LogsPage() {
  const {
    logs,
    loading,
    error,
    uniqueFolders,
    filteredLogs,
    isModalOpen,
    setIsModalOpen,
    isFolderOpen,
    setIsFolderOpen,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    isDeleteFolderOpen,
    setIsDeleteFolderOpen,
    isEditFolderOpen,
    setIsEditFolderOpen,
    selectedLog,
    selectedFolder,
    setSelectedFolder,
    folderToDelete,
    folderToEdit,
    targetFolder,
    setTargetFolder,
    deleteLoading,
    refreshLogs,
    handleEdit,
    handleDelete,
    handleDeleteFolder,
    handleEditFolder,
    confirmDelete,
    confirmDeleteFolder,
    confirmEditFolder,
  } = useLogsPage();

  return (
    <div className="p-4 space-y-4">
      <AddLogModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onLogAdded={refreshLogs}
        defaultFolder={targetFolder}
        folders={uniqueFolders}
      />
      <AddFolderDialog
        isOpen={isFolderOpen}
        onOpenChange={setIsFolderOpen}
        onFolderAdded={refreshLogs}
      />
      <EditLogDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        log={selectedLog}
        onLogUpdated={refreshLogs}
        folders={uniqueFolders}
      />
      <DeleteDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        title="Delete Log"
        description="Are you sure you want to delete this log? This action cannot be undone."
        loading={deleteLoading}
      />
      <DeleteDialog
        isOpen={isDeleteFolderOpen}
        onOpenChange={setIsDeleteFolderOpen}
        onConfirm={confirmDeleteFolder}
        title={
          folderToDelete
            ? `Delete Folder "${folderToDelete}"?`
            : "Delete Folder"
        }
        description={
          folderToDelete
            ? `Are you sure you want to delete the folder "${folderToDelete}"? ALL logs within this folder will be permanently deleted. This action cannot be undone.`
            : "Are you sure you want to delete this folder?"
        }
        loading={deleteLoading}
      />
      <EditFolderDialog
        isOpen={isEditFolderOpen}
        onOpenChange={setIsEditFolderOpen}
        currentFolderName={folderToEdit}
        onFolderUpdated={confirmEditFolder}
      />

      {!selectedFolder ? (
        // Folder View
        <div className="space-y-6">
          <div>
            <TypographyH3>Logs Folders</TypographyH3>
            <TypographyMuted>Select a folder to view logs.</TypographyMuted>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsFolderOpen(true)}>
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading folders...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueFolders.map((folder) => (
                <Card
                  key={folder}
                  className="cursor-pointer hover:bg-muted/50 transition-colors group relative"
                  onClick={() => setSelectedFolder(folder)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium truncate pr-2 flex-1">
                      {folder}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={(e) => handleEditFolder(folder, e)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => handleDeleteFolder(folder, e)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        logs.filter((l) => (l.folder || "General") === folder)
                          .length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Total Logs</p>
                  </CardContent>
                </Card>
              ))}
              {uniqueFolders.length === 0 && !loading && (
                <div className="col-span-full text-center text-muted-foreground py-10">
                  No logs found. Create one to get started!
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Logs Table View
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedFolder(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <TypographyH3>{selectedFolder}</TypographyH3>
                <TypographyMuted>
                  Viewing logs in {selectedFolder}
                </TypographyMuted>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Export logs={filteredLogs} />
              <Button
                onClick={() => {
                  setTargetFolder(selectedFolder || "General");
                  setIsModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Log
              </Button>
            </div>
          </div>

          <LogsTable
            logs={filteredLogs}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
