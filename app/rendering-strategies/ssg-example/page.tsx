import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This function simulates fetching data from an API
async function getData() {
  // Return mock data
  return [
    { id: 1, title: "Static site generation explained", author: "Next.js Team" },
    { id: 2, title: "Why SSG is perfect for blogs", author: "Content Publishers" },
    { id: 3, title: "SSG: The performance champion", author: "Web Performance Group" },
  ]
}

export default async function SSGExamplePage() {
  // Fetch data at build time
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
          <CardTitle>Static Site Generation Example</CardTitle>
          <CardDescription>This page is pre-rendered at build time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Notice how this page loads instantly and the timestamp stays the same even when you refresh. This is
              because the page was generated at build time and is being served as a static HTML file.
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
              Page built at: {new Date().toLocaleTimeString()} (build time)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

