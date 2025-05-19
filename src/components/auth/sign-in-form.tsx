"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/services/auth";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle } from "lucide-react";

interface SignInFormProps {
  onSuccess: () => void;
  switchToSignUp: () => void;
}

export function SignInForm({ onSuccess, switchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      onSuccess();
    } catch (err) {
      console.error("Sign in error:", err);
      if (err instanceof Error) {
        // Handle specific Firebase auth errors
        if (err.message.includes("auth/invalid-credential")) {
          setError("Invalid email or password. Please try again.");
        } else if (err.message.includes("auth/user-not-found")) {
          setError("No account found with this email. Please sign up.");
        } else if (err.message.includes("auth/wrong-password")) {
          setError("Incorrect password. Please try again.");
        } else if (err.message.includes("auth/too-many-requests")) {
          setError("Too many failed login attempts. Please try again later.");
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-start gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
          disabled={loading}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={loading}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Spinner size="sm" className="mr-2" /> : null}
        Sign In
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <button
          type="button"
          onClick={switchToSignUp}
          className="text-primary hover:underline focus:outline-none"
          disabled={loading}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
