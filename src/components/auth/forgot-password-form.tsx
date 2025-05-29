import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export interface ForgotPasswordFormProps {
  loading: boolean;
  error: string | null;
  success: boolean;
  setError: (err: string | null) => void;
  resetPassword: (email: string) => Promise<boolean>;
  onBack: () => void;
}

export function ForgotPasswordForm({
  loading,
  error,
  success,
  setError,
  resetPassword,
  onBack,
}: ForgotPasswordFormProps) {
  const emailRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;

    if (!email) {
      setError("Email is required.");
      return;
    }

    await resetPassword(email);
  }

  if (success) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="reset-email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="reset-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          ref={emailRef}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full"
          disabled={loading}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Button>
      </div>

      {error && (
        <div className="text-sm text-destructive text-center mt-2">{error}</div>
      )}
    </form>
  );
}
