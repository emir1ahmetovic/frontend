import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProjects } from "@/lib/mock-data";
import { AppHeader } from "@/components/layout/AppHeader";
import { RoleBadge } from "@/components/shared/RoleBadge";
import { FileLibrary } from "@/components/workspace/FileLibrary";
import { KnowledgeBase } from "@/components/workspace/KnowledgeBase";
import { AIChat } from "@/components/workspace/AIChat";
import { PracticeQuestions } from "@/components/workspace/PracticeQuestions";
import { InviteModal } from "@/components/workspace/InviteModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Project, ProjectFile, ChatMessage, PracticeQuestion, ProjectMember } from "@/types";
import {
  ArrowLeft,
  FolderOpen,
  BookOpen,
  MessageSquare,
  HelpCircle,
  UserPlus,
  Menu,
  Trash2,
} from "lucide-react";

const ProjectWorkspace = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("files");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    const found = mockProjects.find((p) => p.id === projectId);
    if (found) setProject({ ...found });
    else navigate("/dashboard");
  }, [projectId, navigate]);

  if (!project) return null;

  const role = project.currentUserRole;
  const canInvite = role === "owner";

  const updateFiles = (filesOrFn: ProjectFile[] | ((prev: ProjectFile[]) => ProjectFile[])) => {
    setProject((prev) => {
      if (!prev) return prev;
      const newFiles = typeof filesOrFn === "function" ? filesOrFn(prev.files) : filesOrFn;
      return { ...prev, files: newFiles };
    });
  };

  const updateMessages = (msgs: ChatMessage[]) =>
    setProject((prev) => prev ? { ...prev, chatMessages: msgs } : prev);

  const updateQuestions = (q: PracticeQuestion[]) =>
    setProject((prev) => prev ? { ...prev, practiceQuestions: q } : prev);

  const updateMembers = (m: ProjectMember[]) =>
    setProject((prev) => prev ? { ...prev, members: m } : prev);

  const navItems = [
    { id: "files", label: "File Library", icon: FolderOpen },
    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
    { id: "chat", label: "AI Chat", icon: MessageSquare },
    { id: "questions", label: "Practice Questions", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <AppHeader />

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 ease-in-out
            md:sticky md:top-14 md:h-[calc(100vh-56px)] md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="p-4 space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-sm truncate max-w-[140px] text-foreground">{project.name}</h2>
                <div className="mt-1">
                  <RoleBadge role={role} />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden -mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>

            <nav className="space-y-1 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === item.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t space-y-4">
              {canInvite && (
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-xs h-9" onClick={() => setInviteOpen(true)}>
                    <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Invite
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full text-xs h-9 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30">
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete Project
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[95vw] max-w-md rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{project.name}"?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. All files, chat history, and practice questions will be permanently deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                          onClick={() => navigate("/dashboard")}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}

              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-2 px-1 w-full"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 w-full">
          <div className="px-4 md:px-8 py-4 sm:py-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className={`md:hidden shrink-0 h-9 w-9 rounded-xl ${sidebarOpen ? 'hidden' : 'flex'}`}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold truncate">
                {navItems.find((n) => n.id === activeTab)?.label}
              </h1>
            </div>

            {/* Mobile tabs */}
            <div className="md:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  {navItems.map((item) => (
                    <TabsTrigger key={item.id} value={item.id} className="flex-1 text-xs">
                      <item.icon className="h-3.5 w-3.5" />
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {activeTab === "files" && (
              <FileLibrary files={project.files} role={role} onFilesChange={updateFiles} />
            )}
            {activeTab === "knowledge" && (
              <KnowledgeBase
                concepts={project.concepts}
                fileSummaries={project.fileSummaries}
                projectSummary={project.projectSummary}
              />
            )}
            {activeTab === "chat" && (
              <AIChat messages={project.chatMessages} role={role} onMessagesChange={updateMessages} />
            )}
            {activeTab === "questions" && (
              <PracticeQuestions questions={project.practiceQuestions} role={role} onQuestionsChange={updateQuestions} />
            )}
          </div>
        </main>
      </div>

      <InviteModal
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        members={project.members}
        onMembersChange={updateMembers}
      />
    </div>
  );
};

export default ProjectWorkspace;
