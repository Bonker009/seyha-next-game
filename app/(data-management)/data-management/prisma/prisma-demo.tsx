"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Plus, Trash2 } from "lucide-react"

// This is a client component that simulates Prisma operations
// In a real app, you would call server actions or API routes that use Prisma

type User = {
  id: number
  name: string
  email: string
  createdAt: Date
}

type Post = {
  id: number
  title: string
  content: string
  published: boolean
  authorId: number
}

export function PrismaDemo() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", createdAt: new Date() },
    { id: 2, name: "Jane Smith", email: "jane@example.com", createdAt: new Date() },
  ])

  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "First Post", content: "This is my first post", published: true, authorId: 1 },
    { id: 2, title: "Second Post", content: "This is my second post", published: false, authorId: 1 },
    { id: 3, title: "Hello World", content: "Introduction post", published: true, authorId: 2 },
  ])

  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const createUser = () => {
    if (!newUserName || !newUserEmail) return

    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name: newUserName,
        email: newUserEmail,
        createdAt: new Date(),
      }

      setUsers([...users, newUser])
      setNewUserName("")
      setNewUserEmail("")
      setLoading(false)
    }, 500)
  }

  const deleteUser = (id: number) => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setUsers(users.filter((user) => user.id !== id))
      // Also delete associated posts
      setPosts(posts.filter((post) => post.authorId !== id))
      setLoading(false)
    }, 500)
  }

  const createPost = () => {
    if (!newPostTitle || !newPostContent || !selectedAuthorId) return

    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const newPost: Post = {
        id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
        title: newPostTitle,
        content: newPostContent,
        published: false,
        authorId: selectedAuthorId,
      }

      setPosts([...posts, newPost])
      setNewPostTitle("")
      setNewPostContent("")
      setLoading(false)
    }, 500)
  }

  const togglePublishPost = (id: number) => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setPosts(posts.map((post) => (post.id === id ? { ...post, published: !post.published } : post)))
      setLoading(false)
    }, 500)
  }

  const deletePost = (id: number) => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setPosts(posts.filter((post) => post.id !== id))
      setLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Users</h3>

            <div className="space-y-4 mb-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Created: {user.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm mr-2">{posts.filter((post) => post.authorId === user.id).length} posts</p>
                    <Button variant="ghost" size="icon" onClick={() => deleteUser(user.id)} disabled={loading}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Add New User</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  disabled={loading}
                />
                <Input
                  placeholder="Email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button onClick={createUser} disabled={!newUserName || !newUserEmail || loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create User
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Posts</h3>

            <div className="space-y-4 mb-4">
              {posts.map((post) => (
                <div key={post.id} className="p-3 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Author: {users.find((u) => u.id === post.authorId)?.name || "Unknown"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 text-xs h-7"
                        onClick={() => togglePublishPost(post.id)}
                        disabled={loading}
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} disabled={loading}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm">{post.content}</p>
                  <div className="mt-2 flex items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${post.published ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Add New Post</h4>
              <Input
                placeholder="Title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="mb-2"
                disabled={loading}
              />
              <Input
                placeholder="Content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="mb-2"
                disabled={loading}
              />
              <select
                className="w-full p-2 rounded-md border mb-2"
                value={selectedAuthorId || ""}
                onChange={(e) => setSelectedAuthorId(Number(e.target.value))}
                disabled={loading}
              >
                <option value="">Select Author</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <Button
                onClick={createPost}
                disabled={!newPostTitle || !newPostContent || !selectedAuthorId || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Post
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

