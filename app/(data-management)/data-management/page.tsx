import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, Layers } from "lucide-react"

export const metadata: Metadata = {
  title: "Data Management",
  description: "Learn about Prisma ORM and Zustand state management.",
}

export default function DataManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Data Management</h1>
      <p className="text-lg text-muted-foreground">
        Learn how to use Prisma ORM for database operations and Zustand for state management in your Next.js
        applications.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <div className="p-2 bg-primary/10 rounded-md w-fit mb-2">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Prisma ORM</CardTitle>
            <CardDescription>Type-safe database access with Prisma ORM</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="mb-4 text-muted-foreground">
              Prisma is a next-generation ORM that provides a type-safe API for database access. It simplifies database
              workflows and provides a clean, intuitive API.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Type-safe database queries</li>
              <li>Auto-generated migrations</li>
              <li>Intuitive data modeling</li>
              <li>Supports multiple databases</li>
              <li>Powerful query capabilities</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/data-management/prisma" className="flex items-center justify-center">
                Explore Prisma
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <div className="p-2 bg-primary/10 rounded-md w-fit mb-2">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Zustand</CardTitle>
            <CardDescription>Simple and efficient state management</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="mb-4 text-muted-foreground">
              Zustand is a small, fast, and scalable state management solution. It has a simple API based on hooks and
              doesn't require complex configurations.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Minimal and straightforward API</li>
              <li>No boilerplate code</li>
              <li>Supports middleware (persist, devtools)</li>
              <li>TypeScript friendly</li>
              <li>Works with React Suspense</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/data-management/zustand" className="flex items-center justify-center">
                Explore Zustand
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

