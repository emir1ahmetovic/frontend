import React, { createContext, useContext, useState, useCallback } from "react";
import type { User } from "@/types";
import { currentUser } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    if (!email.includes("@")) throw new Error("Invalid email address");
    setUser({ ...currentUser, email });
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    if (!email.includes("@")) throw new Error("Invalid email address");
    setUser({ ...currentUser, name, email });
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
