import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BookOpen, Sun, Moon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup, isLoading } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name.trim()) { setError("Name is required"); return; }
        await signup(name, email, password);
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 transition-colors duration-300">
      <button
        onClick={toggle}
        className="absolute top-4 right-4 p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <Card className="w-full max-w-md animate-scale-in shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-2">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? "Welcome back" : "Create your account"}
          </CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to continue to StudyHub" : "Get started with StudyHub"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2 animate-slide-down">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Alex Thompson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive animate-fade-in">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Please wait...</>
              ) : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
