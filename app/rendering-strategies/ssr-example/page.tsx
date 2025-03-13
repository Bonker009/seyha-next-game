import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This function simulates fetching data from an API
async function getData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return [
    { id: 1, title: "Server-side rendering explained", author: "Next.js Team" },
    { id: 2, title: "The benefits of SSR for SEO", author: "Search Engine Journal" },
    { id: 3, title: "SSR vs. CSR: Performance comparison", author: "Web Performance Group" },
  ]
}

// Force dynamic rendering for this page
export const dynamic = "force-dynamic"

export default async function SSRExamplePage() {
  // Fetch data on the server for each request
  const articles = await getData()

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
          <CardTitle>Server-Side Rendering Example</CardTitle>
          <CardDescription>This page is rendered on the server for each request</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Notice how this page comes fully rendered from the server. There's no loading state visible to the user.
              Refresh the page to see the timestamp update, confirming it's rendered on each request.
            </p>
          </div>

          <div className="border rounded-md p-4">
            <h2 className="text-xl font-bold mb-4">Latest Articles</h2>

            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="border-b pb-4">
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">By {article.author}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Page rendered at: {new Date().toLocaleTimeString()} (server time)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

