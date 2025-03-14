import type React from "react";
import type { Metadata } from "next";
import { Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Next.js Concepts",
  description: "Learn essential Next.js concepts and features.",
};

export default function NextConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-md mr-4">
          <Code2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Next.js Concepts</h1>
          <p className="text-muted-foreground">
            Essential features and patterns for Next.js applications
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
