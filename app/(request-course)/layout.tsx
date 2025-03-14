import type React from "react";
import type { Metadata } from "next";
import { Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Management",
  description: "Database and state management with Prisma and Zustand.",
};

export default function DataManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-md mr-4">
          <Database className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Course Request Management Portal
          </h1>
          <p className="text-muted-foreground">
            Welcome to the Course Request Management Portal. Our mission is to
            provide a seamless and efficient process for submitting and managing
            course-related requests. We are dedicated to thoroughly evaluating
            each submission to ensure that your academic needs are met in a
            timely and effective manner. Your feedback and input are invaluable
            in enhancing the learning experience.
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
