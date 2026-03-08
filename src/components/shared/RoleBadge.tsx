import type { UserRole } from "@/types";
import { Badge } from "@/components/ui/badge";

const roleConfig: Record<UserRole, { label: string; className: string }> = {
  owner: { label: "Owner", className: "bg-primary/10 text-primary border-primary/20" },
  editor: { label: "Editor", className: "bg-accent/10 text-accent border-accent/20" },
  viewer: { label: "Viewer", className: "bg-muted text-muted-foreground border-border" },
};

export function RoleBadge({ role }: { role: UserRole }) {
  const config = roleConfig[role];
  return (
    <Badge variant="outline" className={`text-xs font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
}