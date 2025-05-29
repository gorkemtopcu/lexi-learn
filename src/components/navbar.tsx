"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, BookmarkIcon, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close drawer when pathname changes (navigation occurs)
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-14 items-center px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold">Lexi Learn</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm ml-6">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/"
                ? "text-foreground font-medium"
                : "text-foreground/60"
            )}
          >
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </div>
          </Link>
          <Link
            href="/my-words"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/my-words"
                ? "text-foreground font-medium"
                : "text-foreground/60"
            )}
          >
            <div className="flex items-center gap-1">
              <BookmarkIcon className="h-4 w-4" />
              <span>My Words</span>
            </div>
          </Link>
        </nav>

        {/* Right side items */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <AuthDialog />
          </div>

          {/* Mobile menu drawer */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-3 py-3 px-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === "/"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-foreground/60"
                  )}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/my-words"
                  className={cn(
                    "flex items-center gap-3 py-3 px-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === "/my-words"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-foreground/60"
                  )}
                >
                  <BookmarkIcon className="h-4 w-4" />
                  <span>My Words</span>
                </Link>
                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border">
                  <ThemeToggle />
                  <AuthDialog />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
