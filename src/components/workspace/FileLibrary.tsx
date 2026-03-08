import { useState, useRef } from "react";
import type { ProjectFile, UserRole } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, FileIcon } from "@/components/shared/StatusBadge";
import { Upload, FileUp, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  files: ProjectFile[];
  role: UserRole;
  onFilesChange: (files: ProjectFile[] | ((prev: ProjectFile[]) => ProjectFile[])) => void;
}

export function FileLibrary({ files, role, onFilesChange }: Props) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (name: string, type: ProjectFile["type"]) => {
    const newFile: ProjectFile = {
      id: `file-${Date.now()}`,
      name,
      type,
      size: Math.floor(Math.random() * 5000000),
      uploadedAt: new Date().toISOString(),
      uploadedBy: "user-1",
      status: "uploading",
      progress: 0,
    };
    onFilesChange([...files, newFile]);

    const statuses: ProjectFile["status"][] = ["extracting", "chunking", "completed"];
    statuses.forEach((status, i) => {
      setTimeout(() => {
        onFilesChange((prev: ProjectFile[]) =>
          prev.map((f) => f.id === newFile.id ? { ...f, status, progress: (i + 1) * 33 + 1 } : f)
        );
        if (status === "completed") {
          toast({ title: "File processed", description: `${name} is ready` });
        }
      }, (i + 1) * 1500);
    });
  };

  const handleUpload = () => {
    const names = ["Lecture Notes.pdf", "Study Guide.txt", "Presentation.pptx"];
    const types: ProjectFile["type"][] = ["pdf", "txt", "pptx"];
    const idx = Math.floor(Math.random() * names.length);
    simulateUpload(names[idx], types[idx]);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const canUpload = role === "owner" || role === "editor";

  return (
    <div className="space-y-6 animate-fade-in">
      {canUpload && (
        <div
          onClick={handleUpload}
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
        >
          <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="font-medium mb-1">Drop files here or click to upload</p>
          <p className="text-sm text-muted-foreground">PDF, TXT, PPT, PPTX supported</p>
        </div>
      )}

      {files.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium mb-1">No files yet</h3>
          <p className="text-sm text-muted-foreground">
            {canUpload ? "Upload study materials to get started" : "No files have been uploaded yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {files.map((file) => (
            <Card key={file.id} className="animate-slide-up">
              <CardContent className="p-4 flex items-center gap-4">
                <FileIcon type={file.type} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{formatSize(file.size)}</span>
                    <span>{formatDate(file.uploadedAt)}</span>
                  </div>
                </div>
                <StatusBadge status={file.status} />
                {file.status !== "completed" && (
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
