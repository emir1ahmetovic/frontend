import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockProjects } from "@/lib/mock-data";
import { AppHeader } from "@/components/layout/AppHeader";
import { RoleBadge } from "@/components/shared/RoleBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FolderOpen, Clock, Users, Search } from "lucide-react";
import type { Project } from "@/types";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    if (!newProjectName.trim()) return;
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: newProjectName,
      currentUserRole: "owner",
      members: [],
      files: [],
      concepts: [],
      fileSummaries: [],
      chatMessages: [],
      practiceQuestions: [],
      projectSummary: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects((prev) => [newProject, ...prev]);
    setNewProjectName("");
    setDialogOpen(false);
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <AppHeader />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your Projects</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage and access your study workspaces</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> New Project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    placeholder="e.g. Databases Midterm"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full" disabled={!newProjectName.trim()}>
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-5 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-3 w-1/3" />
              </Card>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card className="p-12 text-center animate-fade-in">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold mb-2">{searchQuery ? "No matching projects" : "No projects yet"}</h2>
            <p className="text-muted-foreground text-sm mb-6">{searchQuery ? "Try a different search term" : "Create your first study project to get started"}</p>
            {!searchQuery && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> Create Project
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-slide-up group"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">{project.name}</h3>
                    <RoleBadge role={project.currentUserRole} />
                  </div>
                  {project.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {formatDate(project.updatedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {project.members.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;