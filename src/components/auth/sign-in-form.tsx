import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface SignInFormProps {
  loading: boolean;
  error: string | null;
  setError: (err: string | null) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  onSuccess: () => void;
}

export function SignInForm({
  loading,
  error,
  setError,
  signIn,
  onSuccess,
}: SignInFormProps) {
  const emailRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    const ok = await signIn(email, password);
    if (ok) onSuccess();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          ref={emailRef}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </Button>
      {error && (
        <div className="text-sm text-destructive text-center mt-2">{error}</div>
      )}
    </form>
  );
}
