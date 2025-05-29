import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useSavedWordsContext } from "@/contexts/saved-words-context";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import { ProfilePanel } from "./profile-panel";

export function AuthDialog({ trigger }: { trigger?: React.ReactNode } = {}) {
  const [mode, setMode] = React.useState<
    "login" | "signup" | "forgot-password"
  >("login");
  const [open, setOpen] = React.useState(false);
  const [resetSuccess, setResetSuccess] = React.useState(false);
  const {
    user,
    loading,
    error,
    setError,
    signIn,
    signUp,
    signOut,
    resetPassword,
  } = useAuth();
  const { total: wordCount } = useSavedWordsContext();

  // Reset mode and error on dialog close
  React.useEffect(() => {
    if (!open) {
      setMode("login");
      setError(null);
      setResetSuccess(false);
    }
  }, [open, setError]);

  function handleSuccess() {
    setOpen(false);
  }

  async function handleResetPassword(email: string) {
    const success = await resetPassword(email);
    if (success) {
      setResetSuccess(true);
    }
    return success;
  }

  function handleBackToLogin() {
    setMode("login");
    setError(null);
    setResetSuccess(false);
  }

  function getDialogTitle() {
    if (user) return "Account";
    switch (mode) {
      case "login":
        return "Sign In";
      case "signup":
        return "Sign Up";
      case "forgot-password":
        return "Reset Password";
      default:
        return "Sign In";
    }
  }

  function getDialogDescription() {
    if (user) {
      return (
        <>
          You are signed in with <strong>{user.email}</strong>
        </>
      );
    }
    switch (mode) {
      case "login":
        return "Welcome back! Please enter your credentials.";
      case "signup":
        return "Create a new account to get started.";
      case "forgot-password":
        return "We'll send you a link to reset your password.";
      default:
        return "Welcome back! Please enter your credentials.";
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="outline"
            size="icon"
            aria-label={user ? "Account" : "Sign in or sign up"}
          >
            <User className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">
              {user ? "Account" : "Sign in or sign up"}
            </span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>
        {user ? (
          <ProfilePanel
            loading={loading}
            error={error}
            signOut={async () => {
              await signOut();
              setMode("login");
            }}
            wordCount={wordCount}
          />
        ) : (
          (() => {
            switch (mode) {
              case "login":
                return (
                  <>
                    <SignInForm
                      loading={loading}
                      error={error}
                      setError={setError}
                      signIn={signIn}
                      onSuccess={handleSuccess}
                      onForgotPassword={() => {
                        setMode("forgot-password");
                        setError(null);
                      }}
                    />
                    <div className="text-sm text-muted-foreground text-center mt-4">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        className="text-primary underline font-medium hover:text-primary/80 focus:outline-none"
                        onClick={() => {
                          setMode("signup");
                          setError(null);
                        }}
                        disabled={loading}
                      >
                        Sign up
                      </button>
                    </div>
                  </>
                );
              case "signup":
                return (
                  <>
                    <SignUpForm
                      loading={loading}
                      error={error}
                      setError={setError}
                      signUp={signUp}
                      onSuccess={handleSuccess}
                    />
                    <div className="text-sm text-muted-foreground text-center mt-4">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-primary underline font-medium hover:text-primary/80 focus:outline-none"
                        onClick={() => {
                          setMode("login");
                          setError(null);
                        }}
                        disabled={loading}
                      >
                        Log in
                      </button>
                    </div>
                  </>
                );
              case "forgot-password":
                return (
                  <ForgotPasswordForm
                    loading={loading}
                    error={error}
                    success={resetSuccess}
                    setError={setError}
                    resetPassword={handleResetPassword}
                    onBack={handleBackToLogin}
                  />
                );
              default:
                // Fallback to login mode for any unexpected mode value
                return (
                  <>
                    <SignInForm
                      loading={loading}
                      error={error}
                      setError={setError}
                      signIn={signIn}
                      onSuccess={handleSuccess}
                      onForgotPassword={() => {
                        setMode("forgot-password");
                        setError(null);
                      }}
                    />
                    <div className="text-sm text-muted-foreground text-center mt-4">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        className="text-primary underline font-medium hover:text-primary/80 focus:outline-none"
                        onClick={() => {
                          setMode("signup");
                          setError(null);
                        }}
                        disabled={loading}
                      >
                        Sign up
                      </button>
                    </div>
                  </>
                );
            }
          })()
        )}
      </DialogContent>
    </Dialog>
  );
}
