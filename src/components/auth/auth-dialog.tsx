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
import { ProfilePanel } from "./profile-panel";

export function AuthDialog({ trigger }: { trigger?: React.ReactNode } = {}) {
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [open, setOpen] = React.useState(false);
  const { user, loading, error, setError, signIn, signUp, signOut } = useAuth();
  const { total: wordCount } = useSavedWordsContext();

  // Reset mode and error on dialog close
  React.useEffect(() => {
    if (!open) {
      setMode("login");
      setError(null);
    }
  }, [open, setError]);

  function handleSuccess() {
    setOpen(false);
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
          <DialogTitle>
            {user ? "Account" : mode === "login" ? "Sign In" : "Sign Up"}
          </DialogTitle>
          {
            <DialogDescription>
              {user
                ? "You are signed in with " + user.email
                : mode === "login"
                ? "Welcome back! Please enter your credentials."
                : "Create a new account to get started."}
            </DialogDescription>
          }
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
        ) : mode === "login" ? (
          <>
            <SignInForm
              loading={loading}
              error={error}
              setError={setError}
              signIn={signIn}
              onSuccess={handleSuccess}
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
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
