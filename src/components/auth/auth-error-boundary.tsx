"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";
import {
  isAuthError,
  handleAuthError,
  performSafeSignOut,
} from "@/lib/auth-error-handler";

interface AuthErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  isAuthError: boolean;
  userFriendlyMessage: string;
}

interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class AuthErrorBoundary extends React.Component<
  AuthErrorBoundaryProps,
  AuthErrorBoundaryState
> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isAuthError: false,
      userFriendlyMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    const isAuth = isAuthError(error);
    let userFriendlyMessage = "An unexpected error occurred";

    if (isAuth) {
      const authErrorResult = handleAuthError(error);
      userFriendlyMessage = authErrorResult.userFriendlyMessage;

      // Perform safe sign out if needed
      if (authErrorResult.shouldSignOut) {
        performSafeSignOut().catch(console.error);
      }
    }

    return {
      hasError: true,
      error,
      isAuthError: isAuth,
      userFriendlyMessage,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("AuthErrorBoundary caught an error:", error, errorInfo);

    // Log auth errors with more context
    if (this.state.isAuthError) {
      console.warn("Authentication error caught by boundary:", {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      isAuthError: false,
      userFriendlyMessage: "",
    });
  };

  handleSignOut = async () => {
    try {
      await performSafeSignOut();
      // Reload the page to reset the app state
      window.location.reload();
    } catch (error) {
      console.error("Failed to sign out:", error);
      // Force reload even if sign out fails
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            retry={this.handleRetry}
          />
        );
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-destructive">
                {this.state.isAuthError
                  ? "Authentication Error"
                  : "Something went wrong"}
              </CardTitle>
              <CardDescription>
                {this.state.userFriendlyMessage}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={this.handleRetry}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>

              {this.state.isAuthError && (
                <Button
                  onClick={this.handleSignOut}
                  className="w-full"
                  variant="destructive"
                >
                  Sign Out & Reload
                </Button>
              )}

              <div className="text-xs text-muted-foreground text-center">
                If this problem persists, please refresh the page or contact
                support.
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
