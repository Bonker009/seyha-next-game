import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { PrismaDemo } from "./prisma-demo"

export const metadata: Metadata = {
  title: "Prisma ORM",
  description: "Learn how to use Prisma ORM for database operations.",
}

export default function PrismaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild className="mr-4">
          <Link href="/data-management" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Data Management
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Prisma ORM</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schema">Schema & Models</TabsTrigger>
          <TabsTrigger value="queries">Queries & Mutations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>What is Prisma?</CardTitle>
              <CardDescription>A modern database toolkit for TypeScript and Node.js</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Prisma is an open-source ORM for Node.js and TypeScript. It consists of the following parts:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Prisma Client</strong>: Auto-generated and type-safe query builder for Node.js & TypeScript
                </li>
                <li>
                  <strong>Prisma Migrate</strong>: Migration system for database schema changes
                </li>
                <li>
                  <strong>Prisma Studio</strong>: GUI to view and edit data in your database
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-6 mb-2">Getting Started with Prisma</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">1. Install Prisma CLI</h4>
                  <CodeBlock language="bash" code={`npm install prisma --save-dev`} />
                </div>

                <div>
                  <h4 className="font-medium mb-1">2. Initialize Prisma</h4>
                  <CodeBlock language="bash" code={`npx prisma init`} />
                </div>

                <div>
                  <h4 className="font-medium mb-1">3. Define your schema in prisma/schema.prisma</h4>
                  <CodeBlock
                    language="prisma"
                    code={`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql", "sqlite", etc.
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">4. Create migrations and apply them</h4>
                  <CodeBlock language="bash" code={`npx prisma migrate dev --name init`} />
                </div>

                <div>
                  <h4 className="font-medium mb-1">5. Generate Prisma Client</h4>
                  <CodeBlock language="bash" code={`npx prisma generate`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prisma in Next.js</CardTitle>
              <CardDescription>Best practices for using Prisma with Next.js</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                When using Prisma with Next.js, it's important to avoid creating a new PrismaClient instance on every
                request. Here's a common pattern:
              </p>

              <CodeBlock
                language="typescript"
                code={`// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma`}
              />

              <p className="mt-4">
                This pattern ensures that during development, when your application might reload frequently, you don't
                exhaust your database connection limit by creating a new PrismaClient for each reload.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Prisma Schema</CardTitle>
              <CardDescription>Defining your data model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Prisma schema file (schema.prisma) is the main configuration file for your Prisma setup. It contains
                your database connection, data model definitions, and generator configuration.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">Schema Components</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Data Source</h4>
                  <p className="text-sm text-muted-foreground mb-2">Specifies your database connection.</p>
                  <CodeBlock
                    language="prisma"
                    code={`datasource db {
  provider = "postgresql" // or "mysql", "sqlite", "sqlserver", "mongodb"
  url      = env("DATABASE_URL")
}`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Generator</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Indicates what clients should be generated based on the schema.
                  </p>
                  <CodeBlock
                    language="prisma"
                    code={`generator client {
  provider = "prisma-client-js"
}`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Data Model</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Defines your application models (tables in SQL databases).
                  </p>
                  <CodeBlock
                    language="prisma"
                    code={`model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String?
  published Boolean   @default(false)
  author    User?     @relation(fields: [authorId], references: [id])
  authorId  Int?
  categories Category[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}`}
                  />
                </div>
              </div>

              <h3 className="text-lg font-medium mt-6 mb-2">Field Types and Attributes</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-1">Scalar Types</h4>
                  <ul className="list-disc list-inside text-sm">
                    <li>String</li>
                    <li>Int</li>
                    <li>Float</li>
                    <li>Boolean</li>
                    <li>DateTime</li>
                    <li>Json</li>
                    <li>Bytes</li>
                    <li>Decimal</li>
                    <li>BigInt</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Field Attributes</h4>
                  <ul className="list-disc list-inside text-sm">
                    <li>@id - Primary key</li>
                    <li>@unique - Unique constraint</li>
                    <li>@default - Default value</li>
                    <li>@relation - Defines relationships</li>
                    <li>@map - Maps to different column name</li>
                    <li>@updatedAt - Automatic update timestamp</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relationships</CardTitle>
              <CardDescription>Defining relationships between models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">One-to-One Relationship</h4>
                  <CodeBlock
                    language="prisma"
                    code={`model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique
}`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">One-to-Many Relationship</h4>
                  <CodeBlock
                    language="prisma"
                    code={`model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int   @id @default(autoincrement())
  author   User? @relation(fields: [authorId], references: [id])
  authorId Int?
}`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Many-to-Many Relationship</h4>
                  <CodeBlock
                    language="prisma"
                    code={`model Post {
  id         Int        @id @default(autoincrement())
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[]
}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Prisma Client Queries</CardTitle>
              <CardDescription>Common database operations with Prisma Client</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Prisma Client provides a type-safe API for querying your database. Here are some common operations:</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Finding Records</h4>
                  <CodeBlock
                    language="typescript"
                    code={`// Find a single user by ID
const user = await prisma.user.findUnique({
  where: {
    id: 1,
  },
})

// Find the first user that matches a condition
const user = await prisma.user.findFirst({
  where: {
    email: {
      contains: '@example.com',
    },
  },
})

// Find all users
const users = await prisma.user.findMany()

// Find all users with filtering
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: '@example.com',
    },
    posts: {
      some: {
        published: true,
      },
    },
  },
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Creating Records</h4>
                  <CodeBlock
                    language="typescript"
                    code={`// Create a new user
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
  },
})

// Create a user with related posts
const user = await prisma.user.create({
  data: {
    email: 'bob@example.com',
    name: 'Bob',
    posts: {
      create: [
        { title: 'Hello World', content: 'This is my first post' },
        { title: 'My Second Post', content: 'This is my second post' },
      ],
    },
  },
  include: {
    posts: true, // Include all posts in the returned object
  },
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Updating Records</h4>
                  <CodeBlock
                    language="typescript"
                    code={`// Update a user
const user = await prisma.user.update({
  where: {
    id: 1,
  },
  data: {
    name: 'Alice Smith',
  },
})

// Update many users at once
const updatedUsers = await prisma.user.updateMany({
  where: {
    email: {
      contains: '@example.com',
    },
  },
  data: {
    role: 'USER',
  },
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Deleting Records</h4>
                  <CodeBlock
                    language="typescript"
                    code={`// Delete a user
const user = await prisma.user.delete({
  where: {
    id: 1,
  },
})

// Delete many users at once
const deletedUsers = await prisma.user.deleteMany({
  where: {
    email: {
      contains: '@old-domain.com',
    },
  },
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Transactions</h4>
                  <CodeBlock
                    language="typescript"
                    code={`// Perform multiple operations in a transaction
const [newUser, newPost] = await prisma.$transaction([
  prisma.user.create({
    data: {
      email: 'charlie@example.com',
      name: 'Charlie',
    },
  }),
  prisma.post.create({
    data: {
      title: 'My first post',
      authorId: 1,
    },
  }),
])

// Interactive transactions
const result = await prisma.$transaction(async (tx) => {
  // Get the user with the posts count
  const user = await tx.user.findUnique({
    where: {
      id: 1,
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  })
  
  // Update the user's profile
  await tx.profile.update({
    where: {
      userId: 1,
    },
    data: {
      bio: \`Author of \${user._count.posts} posts\`,
    },
  })
  
  return user
})`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Queries</CardTitle>
              <CardDescription>More complex operations with Prisma Client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Selecting Specific Fields</h4>
                  <CodeBlock
                    language="typescript"
                    code={`const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Including Related Records</h4>
                  <CodeBlock
                    language="typescript"
                    code={`const users = await prisma.user.findMany({
  include: {
    posts: true,
    profile: true,
  },
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Filtering with Complex Conditions</h4>
                  <CodeBlock
                    language="typescript"
                    code={`const users = await prisma.user.findMany({
  where: {
    OR: [
      {
        email: {
          contains: '@example.com',
        },
      },
      {
        email: {
          contains: '@prisma.io',
        },
      },
    ],
    AND: {
      posts: {
        some: {
          published: true,
        },
      },
    },
  },
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Pagination</h4>
                  <CodeBlock
                    language="typescript"
                    code={`const users = await prisma.user.findMany({
  skip: 10, // Skip the first 10 users
  take: 20, // Take 20 users
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Ordering</h4>
                  <CodeBlock
                    language="typescript"
                    code={`const users = await prisma.user.findMany({
  orderBy: {
    name: 'asc', // or 'desc' for descending
  },
})`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">Aggregations</h4>
                  <CodeBlock
                    language="typescript"
                    code={`// Count
const userCount = await prisma.user.count()

// Count with filter
const publishedPostCount = await prisma.post.count({
  where: {
    published: true,
  },
})

// Group by with count
const postsPerUser = await prisma.post.groupBy({
  by: ['authorId'],
  _count: {
    _all: true,
  },
  orderBy: {
    _count: {
      _all: 'desc',
    },
  },
})`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Demo</CardTitle>
              <CardDescription>Interact with a Prisma-powered database</CardDescription>
            </CardHeader>
            <CardContent>
              <PrismaDemo />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

