import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Learning Hub",
  description: "Learn about Next.js concepts and UI libraries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b bg-background flex justify-center items-center">
              <div className="container flex h-16 items-center justify-center">
                <MainNav />
              </div>
            </header>
            <main className="flex-1 flex justify-center w-full">
              {children}
            </main>
            <footer className="border-t flex justify-center items-center py-6 h-14 mt-auto">
              <div className="container flex items-center justify-center gap-4 md:flex-row">
                <p className="text-center text-sm text-muted-foreground md:text-left">
                  &copy; {new Date().getFullYear()} Next.js Learning Hub. All
                  rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
