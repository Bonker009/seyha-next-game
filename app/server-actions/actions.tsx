"use server"

type Todo = {
  id: number
  title: string
  completed: boolean
}

export async function addTodo(formData: FormData) {
  const title = formData.get("title") as string

  // Validate the input
  if (!title || title.length < 3) {
    return { error: "Title must be at least 3 characters" }
  }

  // In a real app, you would add to database
  // For demo, we'll just return the new todo
  return {
    success: true,
    todo: {
      id: Date.now(),
      title,
      completed: false,
    },
  }
}

export async function toggleTodo(id: number, completed: boolean) {
  // In a real app, you would update the database
  // For demo, we'll just return success
  return { success: true }
}

export async function deleteTodo(id: number) {
  // In a real app, you would delete from database
  // For demo, we'll just return success
  return { success: true }
}

