import { useState } from "react";
import type { PracticeQuestion, UserRole } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Sparkles, HelpCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  questions: PracticeQuestion[];
  role: UserRole;
  onQuestionsChange: (q: PracticeQuestion[]) => void;
}

const typeConfig = {
  recall: { label: "Recall", className: "bg-info/10 text-info border-info/20" },
  understanding: { label: "Understanding", className: "bg-accent/10 text-accent border-accent/20" },
  application: { label: "Application", className: "bg-success/10 text-success border-success/20" },
};

export function PracticeQuestions({ questions, role, onQuestionsChange }: Props) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<string>("all");
  const { toast } = useToast();

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const generateQuiz = () => {
    toast({ title: "Quiz generated", description: "New practice questions have been created" });
  };

  const filtered = filterType === "all" ? questions : questions.filter((q) => q.type === filterType);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="recall">Recall</SelectItem>
              <SelectItem value="understanding">Understanding</SelectItem>
              <SelectItem value="application">Application</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground">{filtered.length} questions</span>
        </div>

        {(role === "owner" || role === "editor") && (
          <Button onClick={generateQuiz} size="sm">
            <Sparkles className="h-4 w-4 mr-1" /> Generate Quiz
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium mb-1">No practice questions</h3>
          <p className="text-sm text-muted-foreground">Generate questions from your study materials</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => {
            const revealed = revealedIds.has(q.id);
            const tc = typeConfig[q.type];
            return (
              <Card key={q.id} className="animate-slide-up">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className={`text-xs flex-shrink-0 mt-0.5 ${tc.className}`}>
                      {tc.label}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-2">{q.question}</p>

                      <button
                        onClick={() => toggleReveal(q.id)}
                        className="text-xs text-primary flex items-center gap-1 hover:underline mb-2"
                      >
                        {revealed ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        {revealed ? "Hide answer" : "Show answer"}
                      </button>

                      {revealed && (
                        <div className="space-y-2 animate-slide-down">
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm font-medium mb-1">Answer:</p>
                            <p className="text-sm text-muted-foreground">{q.answer}</p>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm font-medium mb-1">Explanation:</p>
                            <p className="text-sm text-muted-foreground">{q.explanation}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Source: {q.sourceFile} {q.sourcePage && `(p.${q.sourcePage})`} · v{q.version}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
