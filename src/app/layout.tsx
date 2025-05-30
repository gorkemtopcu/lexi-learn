import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import { SavedWordsProvider } from "@/contexts/saved-words-context";
import { AuthErrorBoundary } from "@/components/auth/auth-error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lexi Learn",
  description:
    "Master vocabulary effortlessly with instant word definitions, pronunciation guides, etymology, and personalized word collections. Your intelligent companion for expanding language skills.",
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthErrorBoundary>
            <SavedWordsProvider>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
              </div>
            </SavedWordsProvider>
          </AuthErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
