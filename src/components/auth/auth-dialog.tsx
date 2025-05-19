"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

type AuthMode = "signin" | "signup";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export function AuthDialog({ isOpen, onClose, initialMode = "signin" }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleSuccess = () => {
    onClose();
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "signin" ? "Sign In" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>
        
        {mode === "signin" ? (
          <SignInForm onSuccess={handleSuccess} switchToSignUp={toggleMode} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} switchToSignIn={toggleMode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
