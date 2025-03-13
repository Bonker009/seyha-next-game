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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function RenderingStrategiesPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Link
        href="/"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all methods</span>
      </Link>

      <h1 className="text-4xl font-bold mb-2">
        Rendering Strategies in Next.js
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        A deep dive into CSR, SSR, SSG, and ISR
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview of Rendering Strategies</CardTitle>
            <CardDescription>
              Understanding the different ways to render content in Next.js
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Next.js provides multiple rendering strategies, each with its own
              benefits and trade-offs. Choosing the right strategy depends on
              your specific use case, performance requirements, and content
              update frequency.
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>When Content is Generated</TableHead>
                  <TableHead>Best For</TableHead>
                  <TableHead>Example</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">CSR</TableCell>
                  <TableCell>Client-Side Rendering</TableCell>
                  <TableCell>In the browser, after JavaScript loads</TableCell>
                  <TableCell>Highly interactive, user-specific pages</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/rendering-strategies/csr-example">
                        View Example
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">SSR</TableCell>
                  <TableCell>Server-Side Rendering</TableCell>
                  <TableCell>On the server, for each request</TableCell>
                  <TableCell>
                    Pages that need fresh data on every request
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/rendering-strategies/ssr-example">
                        View Example
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">SSG</TableCell>
                  <TableCell>Static Site Generation</TableCell>
                  <TableCell>At build time</TableCell>
                  <TableCell>Marketing pages, blogs, documentation</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/rendering-strategies/ssg-example">
                        View Example
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ISR</TableCell>
                  <TableCell>Incremental Static Regeneration</TableCell>
                  <TableCell>
                    At build time, then regenerated in the background
                  </TableCell>
                  <TableCell>
                    E-commerce, content that changes occasionally
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/rendering-strategies/isr-example">
                        View Example
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Tabs defaultValue="csr">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="csr">CSR</TabsTrigger>
            <TabsTrigger value="ssr">SSR</TabsTrigger>
            <TabsTrigger value="ssg">SSG</TabsTrigger>
            <TabsTrigger value="isr">ISR</TabsTrigger>
          </TabsList>

          <TabsContent value="csr">
            <Card>
              <CardHeader>
                <CardTitle>Client-Side Rendering (CSR)</CardTitle>
                <CardDescription>
                  Rendering content in the browser using JavaScript
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  With Client-Side Rendering, the server sends a minimal HTML
                  page and the JavaScript needed for the page. The browser then
                  downloads and executes the JavaScript, which renders the
                  content and makes the page interactive.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How It Works</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Server sends minimal HTML with JavaScript links</li>
                      <li>Browser downloads and executes JavaScript</li>
                      <li>JavaScript fetches data from APIs</li>
                      <li>React renders the UI with the fetched data</li>
                      <li>Page becomes interactive</li>
                    </ol>

                    <h3 className="text-lg font-medium mt-4 mb-2">Pros</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Highly interactive UIs</li>
                      <li>Reduced server load</li>
                      <li>Good for private, user-specific pages</li>
                      <li>Works well with real-time data</li>
                    </ul>

                    <h3 className="text-lg font-medium mt-4 mb-2">Cons</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Slower initial load (blank page until JS loads)</li>
                      <li>Poor SEO (search engines may not execute JS)</li>
                      <li>Performance issues on low-end devices</li>
                      <li>Requires more client-side JavaScript</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Code Example</h3>
                    <CodeBlock
                      code={`'use client'

import { useState, useEffect } from 'react'

export default function ClientPage() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch data on the client side
    async function fetchData() {
      try {
        const response = await fetch('/api/data')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>Client-Side Rendered Page</h1>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}`}
                    />

                    <h3 className="text-lg font-medium mt-4 mb-2">
                      When to Use CSR
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Dashboards and admin panels</li>
                      <li>
                        User-specific content (account settings, profiles)
                      </li>
                      <li>Highly interactive applications</li>
                      <li>When SEO is not a priority</li>
                      <li>Real-time applications (chat, live updates)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ssr">
            <Card>
              <CardHeader>
                <CardTitle>Server-Side Rendering (SSR)</CardTitle>
                <CardDescription>
                  Generating HTML on the server for each request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  With Server-Side Rendering, the server generates the full HTML
                  for each request. This means the browser receives a complete
                  HTML document that can be displayed immediately, while
                  JavaScript is still loading.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How It Works</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>User requests a page</li>
                      <li>Server fetches necessary data</li>
                      <li>Server renders React components to HTML</li>
                      <li>Server sends complete HTML to the browser</li>
                      <li>Browser displays HTML immediately</li>
                      <li>
                        JavaScript loads and makes the page interactive
                        (hydration)
                      </li>
                    </ol>

                    <h3 className="text-lg font-medium mt-4 mb-2">Pros</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Better SEO (search engines see complete content)</li>
                      <li>Faster First Contentful Paint (FCP)</li>
                      <li>Better performance on low-end devices</li>
                      <li>Always shows fresh data</li>
                    </ul>

                    <h3 className="text-lg font-medium mt-4 mb-2">Cons</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Higher server load</li>
                      <li>Slower Time to First Byte (TTFB)</li>
                      <li>Full page reloads on navigation</li>
                      <li>Can't cache as effectively as static pages</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Code Example</h3>
                    <CodeBlock
                      code={`// In Next.js App Router, this is a Server Component by default
// app/ssr-page/page.tsx

async function getData() {
  // This runs on the server for each request
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Disable caching
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

export default async function ServerPage() {
  // Data is fetched on the server for each request
  const data = await getData()
  
  return (
    <div>
      <h1>Server-Side Rendered Page</h1>
      <p>Generated at: {new Date().toLocaleTimeString()}</p>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}`}
                    />

                    <h3 className="text-lg font-medium mt-4 mb-2">
                      When to Use SSR
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Pages that need fresh data on every request</li>
                      <li>Pages with user-specific content that need SEO</li>
                      <li>When content changes frequently</li>
                      <li>
                        When you need access to request-time information
                        (cookies, headers)
                      </li>
                      <li>E-commerce product pages with real-time inventory</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ssg">
            <Card>
              <CardHeader>
                <CardTitle>Static Site Generation (SSG)</CardTitle>
                <CardDescription>
                  Pre-rendering pages at build time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  With Static Site Generation, pages are generated at build time
                  and served as static HTML files. This provides the fastest
                  possible loading experience since the content is pre-rendered
                  and can be cached by CDNs.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How It Works</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>During the build process, Next.js fetches data</li>
                      <li>Next.js pre-renders pages to HTML</li>
                      <li>HTML files are stored and served by a CDN</li>
                      <li>Users receive pre-built HTML immediately</li>
                      <li>
                        JavaScript loads and makes the page interactive
                        (hydration)
                      </li>
                    </ol>

                    <h3 className="text-lg font-medium mt-4 mb-2">Pros</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Extremely fast page loads</li>
                      <li>Great for SEO</li>
                      <li>Reduced server load</li>
                      <li>Can be served from a CDN</li>
                      <li>Better reliability (no runtime errors)</li>
                    </ul>

                    <h3 className="text-lg font-medium mt-4 mb-2">Cons</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Content can become stale</li>
                      <li>Build times increase with more pages</li>
                      <li>Not suitable for user-specific content</li>
                      <li>Requires a rebuild to update content</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Code Example</h3>
                    <CodeBlock
                      code={`// In Next.js App Router, this is a Server Component by default
// app/static-page/page.tsx

async function getData() {
  // This runs at build time in production
  const res = await fetch('https://api.example.com/data')
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

export default async function StaticPage() {
  // Data is fetched at build time
  const data = await getData()
  
  return (
    <div>
      <h1>Static Generated Page</h1>
      <p>Built at: {new Date().toLocaleTimeString()}</p>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}`}
                    />

                    <h3 className="text-lg font-medium mt-4 mb-2">
                      When to Use SSG
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Marketing pages</li>
                      <li>Blog posts</li>
                      <li>Documentation</li>
                      <li>Product listings that rarely change</li>
                      <li>Portfolio websites</li>
                      <li>Landing pages</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="isr">
            <Card>
              <CardHeader>
                <CardTitle>Incremental Static Regeneration (ISR)</CardTitle>
                <CardDescription>
                  Static generation with periodic updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Incremental Static Regeneration (ISR) allows you to create or
                  update static pages after you've built your site. It combines
                  the benefits of static generation with the ability to update
                  content without rebuilding the entire site.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How It Works</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>
                        Pages are initially generated at build time (like SSG)
                      </li>
                      <li>Stale pages continue to be served</li>
                      <li>
                        In the background, Next.js regenerates the page after a
                        specified time
                      </li>
                      <li>
                        Once regeneration completes, the CDN cache is updated
                      </li>
                      <li>
                        On-demand revalidation can also be triggered via API
                      </li>
                    </ol>

                    <h3 className="text-lg font-medium mt-4 mb-2">Pros</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Fast page loads (static serving)</li>
                      <li>Content stays relatively fresh</li>
                      <li>No downtime during updates</li>
                      <li>Reduced database load</li>
                      <li>Good SEO</li>
                    </ul>

                    <h3 className="text-lg font-medium mt-4 mb-2">Cons</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Content can be slightly stale</li>
                      <li>More complex to set up</li>
                      <li>Not suitable for real-time data</li>
                      <li>
                        First user after revalidation time might experience
                        slower load
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Code Example</h3>
                    <CodeBlock
                      code={`// In Next.js App Router
// app/isr-page/page.tsx

async function getData() {
  // This runs at build time and then periodically
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

export default async function ISRPage() {
  // Data is fetched at build time and then revalidated
  const data = await getData()
  
  return (
    <div>
      <h1>Incremental Static Regeneration Page</h1>
      <p>Last generated: {new Date().toLocaleTimeString()}</p>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}`}
                    />

                    <h3 className="text-lg font-medium mt-4 mb-2">
                      On-Demand Revalidation
                    </h3>
                    <CodeBlock
                      code={`// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  
  // Check for secret to prevent unauthorized revalidations
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
  
  const path = request.nextUrl.searchParams.get('path') || '/'
  
  // Revalidate the specific path
  revalidatePath(path)
  
  return NextResponse.json({ 
    revalidated: true, 
    message: \`Revalidated \${path}\`,
    now: Date.now()
  })
}`}
                    />

                    <h3 className="text-lg font-medium mt-4 mb-2">
                      When to Use ISR
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>E-commerce product pages</li>
                      <li>News articles</li>
                      <li>Content that changes occasionally</li>
                      <li>High-traffic pages where server load is a concern</li>
                      <li>When you need both performance and fresh content</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Choosing the Right Strategy</CardTitle>
            <CardDescription>
              Decision framework for selecting the optimal rendering approach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The best rendering strategy depends on your specific requirements.
              Here's a decision framework to help you choose:
            </p>

            <div className="border rounded-md p-4 space-y-4">
              <div>
                <h3 className="font-medium">
                  Question 1: Does the page need SEO?
                </h3>
                <p className="text-muted-foreground">
                  If yes, avoid pure CSR. Consider SSG, ISR, or SSR.
                </p>
              </div>

              <div>
                <h3 className="font-medium">
                  Question 2: How frequently does the content change?
                </h3>
                <ul className="list-disc pl-6">
                  <li>
                    <strong>Rarely (days/weeks):</strong> SSG
                  </li>
                  <li>
                    <strong>Occasionally (hours):</strong> ISR
                  </li>
                  <li>
                    <strong>Frequently (minutes):</strong> SSR or ISR with short
                    revalidation
                  </li>
                  <li>
                    <strong>Real-time:</strong> SSR or CSR with SWR/React Query
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">
                  Question 3: Is the content user-specific?
                </h3>
                <p className="text-muted-foreground">
                  If yes, use SSR or CSR. If no, consider SSG or ISR.
                </p>
              </div>

              <div>
                <h3 className="font-medium">
                  Question 4: How important is performance?
                </h3>
                <ul className="list-disc pl-6">
                  <li>
                    <strong>Critical:</strong> SSG or ISR
                  </li>
                  <li>
                    <strong>Important but needs fresh data:</strong> ISR or SSR
                  </li>
                  <li>
                    <strong>Interactive experience is priority:</strong> CSR
                    with good UX design
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">
                  Question 5: What's your hosting environment?
                </h3>
                <p className="text-muted-foreground">
                  Static hosting only supports SSG. Dynamic hosting supports all
                  strategies.
                </p>
              </div>
            </div>

            <p className="mt-4">
              Remember that Next.js allows you to mix and match these strategies
              on a per-page basis. You don't have to choose just one for your
              entire application.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
