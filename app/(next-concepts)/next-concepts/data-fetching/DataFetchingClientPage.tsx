"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/code-block";

export default function DataFetchingClientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild className="mr-4">
          <Link href="/next-concepts" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Concepts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Data Fetching</h1>
      </div>

      <Tabs defaultValue="server">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="server">Server Components</TabsTrigger>
          <TabsTrigger value="actions">Server Actions</TabsTrigger>
          <TabsTrigger value="routes">Route Handlers</TabsTrigger>
        </TabsList>

        <TabsContent value="server" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Fetching in Server Components</CardTitle>
              <CardDescription>
                The recommended way to fetch data in Next.js
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Server Components can fetch data directly without using hooks
                like useEffect. This approach is simpler, more efficient, and
                provides better performance.
              </p>

              <div>
                <h4 className="font-medium mb-1">Basic Data Fetching</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/users/page.tsx
export default async function UsersPage() {
  // Fetch data directly in the component
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Fetch with Options</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/posts/page.tsx
export default async function PostsPage() {
  // Fetch with caching options
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    // Cache the data until manually invalidated
    cache: 'force-cache',
    
    // Alternative: Revalidate every 60 seconds
    // next: { revalidate: 60 }
    
    // Alternative: Don't cache at all
    // cache: 'no-store'
  })
  
  const posts = await res.json()
  
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Parallel Data Fetching</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Start multiple fetches in parallel
  const usersPromise = fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    
  const postsPromise = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    
  const commentsPromise = fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
  
  // Wait for all promises to resolve
  const [users, posts, comments] = await Promise.all([
    usersPromise,
    postsPromise,
    commentsPromise,
  ])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2>Users ({users.length})</h2>
          {/* User content */}
        </div>
        <div>
          <h2>Posts ({posts.length})</h2>
          {/* Post content */}
        </div>
        <div>
          <h2>Comments ({comments.length})</h2>
          {/* Comment content */}
        </div>
      </div>
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Sequential Data Fetching</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/user/[id]/page.tsx
export default async function UserPage({ params }) {
  // First fetch the user
  const userRes = await fetch(
    \`https://jsonplaceholder.typicode.com/users/\${params.id}\`
  )
  const user = await userRes.json()
  
  // Then use the user data to fetch their posts
  const postsRes = await fetch(
    \`https://jsonplaceholder.typicode.com/posts?userId=\${user.id}\`
  )
  const posts = await postsRes.json()
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      
      <h2>Posts by {user.name}</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Server Actions</CardTitle>
              <CardDescription>
                Async functions that run on the server
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Server Actions are async functions that execute on the server.
                They're perfect for form submissions, data mutations, and other
                server-side operations.
              </p>

              <div>
                <h4 className="font-medium mb-1">Basic Server Action</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/actions.ts
'use server'

export async function addUser(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  // Validate the data
  if (!name || !email) {
    return { error: 'Name and email are required' }
  }
  
  // In a real app, you would save to a database
  // For example with Prisma:
  // const user = await prisma.user.create({
  //   data: { name: name.toString(), email: email.toString() }
  // })
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: true, message: \`User \${name} added successfully\` }
}

// app/add-user/page.tsx
import { addUser } from '../actions'

export default function AddUserPage() {
  return (
    <div>
      <h1>Add User</h1>
      <form action={addUser}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">
                  Server Action with Client Feedback
                </h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/actions.ts
'use server'

export async function updateProfile(formData: FormData) {
  const name = formData.get('name')
  const bio = formData.get('bio')
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: true, name, bio }
}

// app/profile/edit/page.tsx
'use client'

import { useActionState } from 'react'
import { updateProfile } from '@/app/actions'

export default function EditProfilePage() {
  const [state, action, isPending] = useActionState(updateProfile)
  
  return (
    <div>
      <h1>Edit Profile</h1>
      
      <form action={action}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" name="bio" rows={4} />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
      
      {state?.success && (
        <div className="success">
          Profile updated successfully!
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">
                  Server Action with Revalidation
                </h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function addComment(formData: FormData) {
  const postId = formData.get('postId')
  const comment = formData.get('comment')
  
  // Save comment to database
  // await prisma.comment.create({
  //   data: {
  //     content: comment.toString(),
  //     postId: parseInt(postId.toString()),
  //   }
  // })
  
  // Revalidate the post page to show the new comment
  revalidatePath(\`/posts/\${postId}\`)
  
  return { success: true }
}

// app/posts/[id]/page.tsx
import { addComment } from '@/app/actions'

export default async function PostPage({ params }) {
  const post = await getPost(params.id)
  const comments = await getComments(params.id)
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      
      <form action={addComment}>
        <input type="hidden" name="postId" value={params.id} />
        <textarea name="comment" placeholder="Add a comment..." required />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  )
}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Handlers</CardTitle>
              <CardDescription>Custom API endpoints in Next.js</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Route Handlers allow you to create custom API endpoints within
                your Next.js application. They're defined in app/api/*
                directories and support various HTTP methods.
              </p>

              <div>
                <h4 className="font-medium mb-1">Basic Route Handler</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello, world!' })
}

// Usage in a client component
'use client'

import { useState, useEffect } from 'react'

export default function HelloWorld() {
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
  }, [])
  
  return <div>{message}</div>
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">Dynamic Route Handler</h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
  // Fetch user from database
  // const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
  
  // For demo purposes
  const user = {
    id,
    name: \`User \${id}\`,
    email: \`user\${id}@example.com\`,
  }
  
  if (!user) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  return Response.json(user)
}

// app/api/users/[id]/posts/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id
  
  // Fetch posts from database
  // const posts = await prisma.post.findMany({ 
  //   where: { authorId: parseInt(userId) } 
  // })
  
  // For demo purposes
  const posts = [
    { id: 1, title: \`Post 1 by User \${userId}\` },
    { id: 2, title: \`Post 2 by User \${userId}\` },
  ]
  
  return Response.json(posts)
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">
                  POST Handler with Validation
                </h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/api/posts/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!body.title || !body.content) {
      return Response.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }
    
    // Create post in database
    // const post = await prisma.post.create({
    //   data: {
    //     title: body.title,
    //     content: body.content,
    //     authorId: body.authorId,
    //   }
    // })
    
    // For demo purposes
    const post = {
      id: Math.floor(Math.random() * 1000),
      title: body.title,
      content: body.content,
      createdAt: new Date(),
    }
    
    return Response.json(post, { status: 201 })
  } catch (error) {
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-1">
                  Route Handler with Headers and Cookies
                </h4>
                <CodeBlock
                  language="tsx"
                  code={`// app/api/auth/login/route.ts
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate credentials (in a real app, check against database)
    if (body.email !== 'user@example.com' || body.password !== 'password') {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Generate a token (in a real app, use a proper JWT)
    const token = 'example-auth-token'
    
    // Set a cookie
    cookies().set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
    
    return Response.json(
      { success: true, message: 'Logged in successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie': \`auth-token=\${token}; Path=/; HttpOnly; Max-Age=\${60 * 60 * 24 * 7}\`,
        },
      }
    )
  } catch (error) {
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
