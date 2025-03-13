import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// This would normally fetch from an API or database
// For demo purposes, we're using static data with a timestamp
async function fetchMarketData() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const now = new Date();

  return [
    { id: 1, symbol: "AAPL", price: 180.95 + Math.random() * 5, updated: now },
    { id: 2, symbol: "MSFT", price: 340.67 + Math.random() * 5, updated: now },
    { id: 3, symbol: "GOOGL", price: 125.3 + Math.random() * 5, updated: now },
    { id: 4, symbol: "AMZN", price: 130.45 + Math.random() * 5, updated: now },
    { id: 5, symbol: "META", price: 290.53 + Math.random() * 5, updated: now },
  ];
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DynamicDataPage() {
  const marketData = await fetchMarketData();

  return (
    <div className="container mx-auto py-10 px-4">
      <Link
        href="/"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all methods</span>
      </Link>

      <h1 className="text-4xl font-bold mb-2">Dynamic Data</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Fetch fresh data on each request
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>
                Dynamic data is fetched on each request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Dynamic data fetching ensures you always get the latest data on
                each request. This is useful for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Real-time data that changes frequently (stock prices, weather)
                </li>
                <li>User-specific content that can't be cached</li>
                <li>Pages where data freshness is critical</li>
                <li>Content that needs to reflect the latest database state</li>
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Code Example</h3>
                <CodeBlock
                  code={`// app/market/page.tsx

// These directives ensure the page is dynamic
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function fetchMarketData() {
  const res = await fetch('https://api.example.com/market', {
    // This option disables caching
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch market data')
  }

  return res.json()
}

export default async function MarketPage() {
  // This data is fetched on every request
  const marketData = await fetchMarketData()

  return (
    <div>
      <h1>Market Data</h1>
      <p>Last updated: {new Date().toLocaleTimeString()}</p>
      <ul>
        {marketData.map((data) => (
          <li key={data.id}>
            
          </li>
        ))}
      </ul>
    </div>
  )
}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Live Example</CardTitle>
              <CardDescription>
                Market data fetched on each request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="p-4 bg-muted/50 border-b">
                  <h2 className="font-medium">Market Data</h2>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Refresh the page to see new prices
                  </p>
                </div>
                <ul className="divide-y">
                  {marketData.map((data) => (
                    <li key={data.id} className="p-4 flex justify-between">
                      <span className="font-medium">{data.symbol}</span>
                      <span>${data.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Dynamic Options</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Next.js provides several ways to make routes dynamic:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>Route Segment Config:</strong> Use export directives
                  <CodeBlock
                    code={`// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Disable caching
export const revalidate = 0`}
                  />
                </li>
                <li>
                  <strong>fetch Options:</strong> Control caching behavior
                  <CodeBlock
                    code={`// Disable caching for this fetch
fetch('https://...', { cache: 'no-store' })

// Revalidate every 10 seconds
fetch('https://...', { next: { revalidate: 10 } })`}
                  />
                </li>
                <li>
                  <strong>Cookies and Headers:</strong> Routes with cookies or
                  dynamic headers are automatically dynamic
                </li>
                <li>
                  <strong>Dynamic Functions:</strong> Using cookies(), headers()
                  or searchParams makes a route dynamic
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
