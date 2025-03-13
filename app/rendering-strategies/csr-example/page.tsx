"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CSRExamplePage() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockData = [
          { id: 1, title: "Client-side rendering explained", author: "Next.js Team" },
          { id: 2, title: "Why CSR works well for dashboards", author: "React Team" },
          { id: 3, title: "The future of client-side apps", author: "Web Dev Community" },
        ]

        setData(mockData)
      } catch (err: any) {
        setError(err.message || "Failed to fetch data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10 px-4">
      <Link
        href="/rendering-strategies"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Rendering Strategies</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Client-Side Rendering Example</CardTitle>
          <CardDescription>This page is rendered entirely on the client using React's useEffect</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Notice how this page initially shows a loading state, then renders the content after the data is fetched.
              This is a key characteristic of client-side rendering.
            </p>
          </div>

          <div className="border rounded-md p-4">
            <h2 className="text-xl font-bold mb-4">Latest Articles</h2>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {data.map((article) => (
                  <div key={article.id} className="border-b pb-4">
                    <h3 className="font-medium">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">By {article.author}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-sm text-muted-foreground">
              Page rendered at: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

