"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Trash2 } from "lucide-react"
import { addTodo, toggleTodo, deleteTodo } from "./actions"

type Todo = {
  id: number
  title: string
  completed: boolean
}

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn Server Actions", completed: true },
    { id: 2, title: "Build a todo app", completed: false },
    { id: 3, title: "Deploy to production", completed: false },
  ])
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await addTodo(formData)

    if (result.error) {
      setError(result.error)
      return
    }

    if (result.success && result.todo) {
      setTodos([...todos, result.todo])
      formRef.current?.reset()
    }
  }

  async function handleToggle(id: number, completed: boolean) {
    await toggleTodo(id, !completed)

    // Optimistic update
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)))
  }

  async function handleDelete(id: number) {
    await deleteTodo(id)

    // Optimistic update
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="space-y-4">
      <form ref={formRef} action={handleSubmit} className="flex gap-2">
        <Input type="text" name="title" placeholder="Add a new todo" className="flex-1" />
        <Button type="submit">Add</Button>
      </form>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="border rounded-md divide-y">
        {todos.length === 0 ? (
          <p className="p-4 text-center text-muted-foreground">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-6 w-6 rounded-full ${todo.completed ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => handleToggle(todo.id, todo.completed)}
                >
                  {todo.completed && <Check className="h-4 w-4" />}
                </Button>
                <span className={todo.completed ? "line-through text-muted-foreground" : ""}>{todo.title}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(todo.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

