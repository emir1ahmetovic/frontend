import { useState } from "react";
import type { ProjectMember, UserRole } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RoleBadge } from "@/components/shared/RoleBadge";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: ProjectMember[];
  onMembersChange: (m: ProjectMember[]) => void;
}

export function InviteModal({ open, onOpenChange, members, onMembersChange }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("editor");
  const { toast } = useToast();

  const handleInvite = () => {
    if (!email.trim()) return;
    const name = email.split("@")[0].replace(/[._]/g, " ");
    const newMember: ProjectMember = {
      user: { id: `user-${Date.now()}`, name, email },
      role,
      joinedAt: new Date().toISOString(),
    };
    onMembersChange([...members, newMember]);
    setEmail("");
    toast({ title: "Invitation sent", description: `${email} has been invited as ${role}` });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Collaborators</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite form */}
          <div className="space-y-3">
            <Label>Invite by email</Label>
            <div className="flex gap-2">
              <Input
                placeholder="colleague@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              />
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleInvite} size="sm" disabled={!email.trim()}>
              <UserPlus className="h-4 w-4 mr-1" /> Invite
            </Button>
          </div>

          {/* Members list */}
          <div className="space-y-2">
            <Label>Members ({members.length})</Label>
            {members.map((m) => (
              <div key={m.user.id} className="flex items-center gap-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-secondary">
                    {m.user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{m.user.email}</p>
                </div>
                <RoleBadge role={m.role} />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
