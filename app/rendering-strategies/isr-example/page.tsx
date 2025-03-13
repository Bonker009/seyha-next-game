import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This function simulates fetching data from an API
async function getData() {
  // Return mock data with current timestamp to show revalidation
  return [
    { id: 1, title: "Incremental Static Regeneration explained", author: "Next.js Team" },
    { id: 2, title: "The power of ISR for e-commerce", author: "E-commerce Experts" },
    { id: 3, title: "ISR: The best of both worlds", author: "Web Architecture Group" },
  ]
}

// Set revalidation time to 30 seconds
export const revalidate = 30

export default async function ISRExamplePage() {
  // Fetch data at build time and then revalidate every 30 seconds
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
          <CardTitle>Incremental Static Regeneration Example</CardTitle>
          <CardDescription>This page is pre-rendered and then revalidated every 30 seconds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-muted-foreground">
              This page initially loads like a static page, but the content will be regenerated in the background every
              30 seconds. Refresh after 30 seconds to see the updated timestamp.
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
              Page last generated at: {new Date().toLocaleTimeString()}
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              This page revalidates every 30 seconds. Refresh after 30 seconds to see the updated timestamp.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

