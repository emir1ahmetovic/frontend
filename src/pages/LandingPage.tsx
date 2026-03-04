import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollImageSequence from "@/components/shared/ScrollImageSequence";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  BookOpen,
  Brain,
  FileText,
  HelpCircle,
  MessageSquare,
  Users,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  Shield,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart File Processing",
    description:
      "Upload PDFs, notes, and presentations. Our AI automatically extracts, chunks, and organizes your study materials.",
  },
  {
    icon: Brain,
    title: "Knowledge Extraction",
    description:
      "Key concepts, summaries, and structured insights pulled from your documents — ready to review instantly.",
  },
  {
    icon: MessageSquare,
    title: "AI Study Assistant",
    description:
      "Ask questions, compare topics, and get sourced answers from your own materials with citation support.",
  },
  {
    icon: HelpCircle,
    title: "Practice Questions",
    description:
      "Auto-generated recall, understanding, and application questions with explanations and source references.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite classmates with role-based access. Share knowledge bases, question sets, and study progress.",
  },
  {
    icon: Shield,
    title: "Organized Workspaces",
    description:
      "Keep every course and project separate. Track progress, manage files, and collaborate — all in one place.",
  },
];

const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "500K+", label: "Questions Generated" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Universities" },
];

const testimonials = [
  {
    quote: "StudyHub completely transformed how I prepare for exams. The AI-generated practice questions are incredibly accurate.",
    name: "Priya M.",
    role: "Computer Science, Stanford",
  },
  {
    quote: "Being able to collaborate with my study group and have AI extract concepts from our shared notes is a game-changer.",
    name: "James K.",
    role: "Pre-Med, Johns Hopkins",
  },
  {
    quote: "I went from spending hours making flashcards to having an AI do it in seconds. My grades have never been better.",
    name: "Sofia L.",
    role: "Engineering, MIT",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Navigation */}
      <nav
        className="absolute top-0 left-0 right-0 z-50 bg-transparent transition-opacity duration-150"
        style={{
          opacity: currentFrame > 50 ? Math.max(0, 1 - (currentFrame - 50) / 20) : 1,
          pointerEvents: currentFrame > 70 ? 'none' : 'auto'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">StudyHub</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="icon" onClick={toggle} className="rounded-xl">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")} className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate("/auth")} className="rounded-xl">
              Get Started <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Sticky Scroll Track */}
      <div ref={heroTrackRef} className="relative h-[500vh]">
        <section className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          {/* Animated Background Sequence */}
          <ScrollImageSequence
            frameCount={188}
            baseUrl="/frames/ezgif-frame-"
            extension=".jpg"
            trackRef={heroTrackRef}
            onFrameChange={setCurrentFrame}
          />

          <div
            className={`max-w-4xl mx-auto text-center relative z-10 px-4 sm:px-6 ${useIsMobile() ? '-mt-32' : '-mt-[24rem] sm:-mt-[38rem]'}`}
            style={{
              opacity: currentFrame > 50 ? Math.max(0, 1 - (currentFrame - 50) / 20) : 1,
              transition: 'opacity 0.15s ease-out'
            }}
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 mt-80">
              Study Smarter,<br />
              <span className="gradient-text">Not Harder</span>
            </h1>
          </div>
        </section>
      </div>

      <div className="relative z-20 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        {/* Stats bar - placed after hero track to be visible when scrolling past */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Features</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Ace Your Studies
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete AI-powered toolkit designed for students who want to learn efficiently and collaborate seamlessly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, i) => (
              <Card
                key={feature.title}
                className="hover-lift border-0 shadow-sm bg-card animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">How It Works</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Three Steps to Better Grades
            </h2>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {[
              {
                step: "01",
                title: "Upload Your Materials",
                desc: "Drop in your PDFs, lecture slides, and notes. Our AI processes them in seconds, extracting text and organizing content by topic.",
                icon: FileText,
              },
              {
                step: "02",
                title: "Learn with AI",
                desc: "Explore auto-generated summaries and key concepts. Chat with the AI about your materials and get answers with page-level citations.",
                icon: Brain,
              },
              {
                step: "03",
                title: "Practice & Collaborate",
                desc: "Generate custom quizzes, share question sets with classmates, and track your understanding across recall, comprehension, and application.",
                icon: Zap,
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="flex gap-5 sm:gap-8 items-start animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="font-display text-xl sm:text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2 flex items-center gap-2">
                    {item.title}
                    <item.icon className="h-5 w-5 text-primary" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Testimonials</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Loved by Students Everywhere
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t, i) => (
              <Card
                key={t.name}
                className="border-0 shadow-sm bg-card animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-5 text-card-foreground/90">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
            <div className="relative bg-card border rounded-3xl p-8 sm:p-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Ready to Transform Your Study Routine?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Join thousands of students who are already studying smarter. Free to get started, no credit card required.
              </p>
              <Button size="lg" onClick={() => navigate("/auth")} className="rounded-xl px-8 text-base">
                Get Started Now <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StudyHub. Built for students, by students.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
