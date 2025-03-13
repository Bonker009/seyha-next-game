import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TodoForm } from "./todo-form"

export default function ServerActionsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Link href="/" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all methods</span>
      </Link>

      <h1 className="text-4xl font-bold mb-2">Server Actions</h1>
      <p className="text-lg text-muted-foreground mb-8">Fetch and mutate data with form actions</p>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>
                Server Actions allow you to run code on the server from client components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Server Actions are async functions that run on the server but can be invoked from the client. They're
                perfect for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Form submissions</li>
                <li>Data mutations (create, update, delete)</li>
                <li>Secure operations that need server-side validation</li>
                <li>Progressive enhancement (forms work without JavaScript)</li>
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Code Example</h3>
                <CodeBlock
                  code={`// app/actions.ts
"use server"

export async function addTodo(formData: FormData) {
const title = formData.get('title') as string

// Validate the input
if (!title || title.length < 3) {
  return { error: 'Title must be at least 3 characters' }
}

// Add to database (example)
// await db.todo.create({ data: { title } })

// For demo purposes, just return success
return { success: true, todo: { id: Date.now(), title } }
}

// app/todo-form.tsx
"use client"

import { useRef } from "react"
import { addTodo } from "./actions"

export function TodoForm() {
const formRef = useRef<HTMLFormElement>(null)

async function handleSubmit(formData: FormData) {
  const result = await addTodo(formData)
  
  if (result.success) {
    // Reset the form
    formRef.current?.reset()
  }
}

return (
  <form ref={formRef} action={handleSubmit}>
    <input 
      type="text" 
      name="title" 
      placeholder="Add a new todo" 
    />
    <button type="submit">Add</button>
  </form>
)
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
              <CardDescription>Todo list with Server Actions</CardDescription>
            </CardHeader>
            <CardContent>
              <TodoForm />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Key Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <strong>Progressive Enhancement:</strong> Forms work even without JavaScript
                </li>
                <li>
                  <strong>Security:</strong> Sensitive logic stays on the server
                </li>
                <li>
                  <strong>Simplicity:</strong> No need to create separate API routes
                </li>
                <li>
                  <strong>Type Safety:</strong> End-to-end type safety with TypeScript
                </li>
                <li>
                  <strong>Optimistic Updates:</strong> Can be combined with React's useOptimistic
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

