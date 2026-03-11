import type { ProjectFile } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, FileText, Presentation } from "lucide-react";

const statusConfig = {
  uploading: { label: "Uploading", className: "bg-warning/10 text-warning border-warning/20" },
  extracting: { label: "Extracting", className: "bg-info/10 text-info border-info/20" },
  chunking: { label: "Chunking", className: "bg-accent/10 text-accent border-accent/20" },
  completed: { label: "Completed", className: "bg-success/10 text-success border-success/20" },
};

const fileIcons: Record<ProjectFile["type"], React.ReactNode> = {
  pdf: <FileText className="h-5 w-5 text-destructive" />,
  txt: <FileText className="h-5 w-5 text-muted-foreground" />,
  ppt: <Presentation className="h-5 w-5 text-warning" />,
  pptx: <Presentation className="h-5 w-5 text-warning" />,
};

export function StatusBadge({ status }: { status: ProjectFile["status"] }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={`text-xs gap-1 ${config.className}`}>
      {status !== "completed" && <Loader2 className="h-3 w-3 animate-spin" />}
      {status === "completed" && <CheckCircle2 className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
}

export function FileIcon({ type }: { type: ProjectFile["type"] }) {
  return <>{fileIcons[type]}</>;
}
