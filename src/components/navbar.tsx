"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, BookmarkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthButton } from "@/components/auth/auth-button"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold">Lexi Learn</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground font-medium" : "text-foreground/60"
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
                pathname === "/my-words" ? "text-foreground font-medium" : "text-foreground/60"
              )}
            >
              <div className="flex items-center gap-1">
                <BookmarkIcon className="h-4 w-4" />
                <span>My Words</span>
              </div>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <AuthButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
