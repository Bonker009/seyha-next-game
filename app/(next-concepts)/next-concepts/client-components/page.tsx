"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ClientComponentsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Link
        href="/"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all methods</span>
      </Link>

      <h1 className="text-4xl font-bold mb-2">Client Components</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Fetch data on the client using useEffect or SWR
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>
                Client Components fetch data in the browser after the component
                mounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Client-side data fetching is useful when:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You need to fetch user-specific data after authentication
                </li>
                <li>You're working with frequently updating data</li>
                <li>You need interactivity and immediate feedback</li>
                <li>
                  You want to implement features like pagination or infinite
                  scrolling
                </li>
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Code Examples</h3>
                <Tabs defaultValue="useEffect">
                  <TabsList>
                    <TabsTrigger value="useEffect">useEffect</TabsTrigger>
                    <TabsTrigger value="swr">SWR</TabsTrigger>
                  </TabsList>
                  <TabsContent value="useEffect">
                    <CodeBlock
                      code={`"use client"

import { useState, useEffect } from "react"

export default function ClientPage() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data')
        
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {/* Render your data */}
    </div>
  )
}`}
                    />
                  </TabsContent>
                  <TabsContent value="swr">
                    <CodeBlock
                      code={`"use client"

import useSWR from 'swr'

// Define a fetcher function
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ClientPage() {
  const { data, error, isLoading } = useSWR(
    'https://api.example.com/data',
    fetcher
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {/* Render your data */}
    </div>
  )
}`}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Live Example with SWR</CardTitle>
              <CardDescription>
                Data fetched from JSONPlaceholder API using SWR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SWRExample />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Live Example with useEffect</CardTitle>
              <CardDescription>
                Data fetched from JSONPlaceholder API using useEffect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UseEffectExample />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SWRExample() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  if (isLoading) return <LoadingSkeletons />;
  if (error) return <p className="text-red-500">Error loading data</p>;

  return (
    <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Users (SWR)</h2>
      <div className="space-y-4">
        {data.slice(0, 5).map((user: any) => (
          <div key={user.id} className="border-b pb-4">
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground">{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UseEffectExample() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <LoadingSkeletons />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Comments (useEffect)</h2>
      <div className="space-y-4">
        {data.slice(0, 5).map((comment: any) => (
          <div key={comment.id} className="border-b pb-4">
            <h3 className="font-medium">{comment.name}</h3>
            <p className="text-sm text-muted-foreground">{comment.email}</p>
            <p className="text-xs text-muted-foreground">
              {comment.body.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingSkeletons() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}
