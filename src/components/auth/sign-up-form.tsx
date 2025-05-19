"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/services/auth";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle } from "lucide-react";

interface SignUpFormProps {
  onSuccess: () => void;
  switchToSignIn: () => void;
}

export function SignUpForm({ onSuccess, switchToSignIn }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password);
      onSuccess();
    } catch (err) {
      console.error("Sign up error:", err);
      if (err instanceof Error) {
        // Handle specific Firebase auth errors
        if (err.message.includes("auth/email-already-in-use")) {
          setError("This email is already in use. Please sign in instead.");
        } else if (err.message.includes("auth/invalid-email")) {
          setError("Invalid email address. Please check and try again.");
        } else if (err.message.includes("auth/weak-password")) {
          setError("Password is too weak. Please use a stronger password.");
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
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={loading}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Spinner size="sm" className="mr-2" /> : null}
        Create Account
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <button
          type="button"
          onClick={switchToSignIn}
          className="text-primary hover:underline focus:outline-none"
          disabled={loading}
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
