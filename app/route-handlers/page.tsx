import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApiDemo } from "./api-demo";

export default function RouteHandlersPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Link
        href="/"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all methods</span>
      </Link>

      <h1 className="text-4xl font-bold mb-2">Route Handlers</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Create API endpoints in Next.js
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>
                Route Handlers let you create custom API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Route Handlers are defined in <code>app/api</code> directory
                files named <code>route.js</code> or <code>route.ts</code>. They
                allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create RESTful APIs</li>
                <li>
                  Handle different HTTP methods (GET, POST, PUT, DELETE, etc.)
                </li>
                <li>Process form submissions</li>
                <li>Integrate with external APIs and services</li>
                <li>Implement authentication and authorization</li>
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Code Example</h3>
                <CodeBlock
                  code={`// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // Fetch users from a database or external API
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]
  
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  // Get the request body
  const body = await request.json()
  
  // Validate the input
  if (!body.name) {
    return NextResponse.json(
      { error: 'Name is required' },
      { status: 400 }
    )
  }
  
  // In a real app, you would add to database
  // For demo, we'll just return the new user
  const newUser = {
    id: Date.now(),
    name: body.name,
  }
  
  return NextResponse.json(newUser, { status: 201 })
}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Live Example</CardTitle>
              <CardDescription>Interact with a demo API</CardDescription>
            </CardHeader>
            <CardContent>
              <ApiDemo />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <strong>Dynamic Routes:</strong> Create routes with parameters
                  like <code>/api/users/[id]/route.ts</code>
                </li>
                <li>
                  <strong>Middleware:</strong> Add middleware for
                  authentication, logging, etc.
                </li>
                <li>
                  <strong>CORS:</strong> Configure Cross-Origin Resource Sharing
                </li>
                <li>
                  <strong>Edge Runtime:</strong> Deploy to the Edge for faster
                  response times
                </li>
                <li>
                  <strong>Streaming:</strong> Stream responses for large data
                  sets
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
