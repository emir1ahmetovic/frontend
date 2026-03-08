export type UserRole = "owner" | "editor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ProjectMember {
  user: User;
  role: UserRole;
  joinedAt: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: "pdf" | "txt" | "ppt" | "pptx";
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  status: "uploading" | "extracting" | "chunking" | "completed";
  progress: number;
}

export interface Concept {
  id: string;
  term: string;
  explanation: string;
  tags: string[];
  sourceFile: string;
  sourcePage?: number;
}

export interface FileSummary {
  fileId: string;
  fileName: string;
  summary: string;
  sections: { heading: string; content: string }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: { fileName: string; page: number }[];
  timestamp: string;
}

export interface PracticeQuestion {
  id: string;
  type: "recall" | "understanding" | "application";
  question: string;
  answer: string;
  explanation: string;
  sourceFile: string;
  sourcePage?: number;
  version: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  currentUserRole: UserRole;
  members: ProjectMember[];
  files: ProjectFile[];
  concepts: Concept[];
  fileSummaries: FileSummary[];
  chatMessages: ChatMessage[];
  practiceQuestions: PracticeQuestion[];
  projectSummary: string;
  createdAt: string;
  updatedAt: string;
}