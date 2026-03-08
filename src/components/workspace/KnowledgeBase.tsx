import type { Concept, FileSummary } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, FileText } from "lucide-react";

interface Props {
  concepts: Concept[];
  fileSummaries: FileSummary[];
  projectSummary: string;
}

export function KnowledgeBase({ concepts, fileSummaries, projectSummary }: Props) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Project Summary */}
      {projectSummary && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" /> Project Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{projectSummary}</p>
          </CardContent>
        </Card>
      )}

      {/* File Summaries */}
      {fileSummaries.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" /> File Summaries
          </h3>
          <Accordion type="multiple" className="space-y-2">
            {fileSummaries.map((fs) => (
              <AccordionItem key={fs.fileId} value={fs.fileId} className="border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  {fs.fileName}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-4">{fs.summary}</p>
                  {fs.sections.map((sec, i) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <h4 className="text-sm font-medium mb-1">{sec.heading}</h4>
                      <p className="text-sm text-muted-foreground">{sec.content}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Concepts */}
      {concepts.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" /> Key Concepts
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {concepts.map((c) => (
              <Card key={c.id} className="animate-slide-up">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{c.term}</h4>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{c.explanation}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {concepts.length === 0 && fileSummaries.length === 0 && !projectSummary && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium mb-1">No knowledge extracted yet</h3>
          <p className="text-sm text-muted-foreground">Upload files to automatically extract concepts and summaries</p>
        </div>
      )}
    </div>
  );
}
