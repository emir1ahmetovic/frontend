import { useState, useRef, useEffect } from "react";
import type { ChatMessage, UserRole } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Loader2, AlertCircle } from "lucide-react";
import { mockAIResponses } from "@/lib/mock-data";

interface Props {
  messages: ChatMessage[];
  role: UserRole;
  onMessagesChange: (msgs: ChatMessage[]) => void;
}

const suggestions = ["Summarize this file", "Compare topic A vs B", "Generate questions"];

export function AIChat({ messages, role, onMessagesChange }: Props) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    const updated = [...messages, userMsg];
    onMessagesChange(updated);
    setInput("");
    setIsTyping(true);

    const key = text.trim().toLowerCase();
    const response = mockAIResponses[key] ||
      `Based on your study materials, here's what I found:\n\nThe topic you're asking about relates to several key concepts covered in your uploaded documents. The main points include foundational definitions, practical examples, and important distinctions.\n\n**Key Points:**\n1. The core concept builds on prerequisite knowledge\n2. Practical applications demonstrate real-world relevance\n3. Common misconceptions should be addressed early`;

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: response,
        citations: [{ fileName: "Chapter 5 - SQL Queries.pdf", page: 3 }],
        timestamp: new Date().toISOString(),
      };
      onMessagesChange([...updated, aiMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  if (role === "viewer") {
    return (
      <div className="text-center py-12 animate-fade-in">
        <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
        <h3 className="font-medium mb-1">Limited Access</h3>
        <p className="text-sm text-muted-foreground">Viewers have read-only access to the AI chat. Contact the project owner for editor access.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] animate-fade-in">
      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s) => (
            <Button key={s} variant="outline" size="sm" onClick={() => sendMessage(s)} className="text-xs">
              {s}
            </Button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5"
                : "bg-card border rounded-2xl rounded-bl-md px-4 py-2.5"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              {msg.citations && msg.citations.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-border/30">
                  {msg.citations.map((c, i) => (
                    <Badge key={i} variant="secondary" className="text-xs font-normal">
                      📄 {c.fileName} (p.{c.page})
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Bot className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 items-end">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Ask about your study materials..."
          className="min-h-[44px] max-h-32 resize-none"
          rows={1}
        />
        <Button size="icon" onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
