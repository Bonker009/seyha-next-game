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

// Example of fetching data in a Server Component
async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ServerComponentsPage() {
  // Fetch data directly in the Server Component
  const posts = await getData();

  return (
    <div className="container mx-auto py-10 px-4">
      <Link
        href="/"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all methods</span>
      </Link>

      <h1 className="text-4xl font-bold mb-2">Server Components</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Fetch data directly in React Server Components
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>
                Server Components can fetch data without additional client-side
                JavaScript
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                With React Server Components, you can fetch data directly in
                your components without using hooks like useEffect or useState.
                This approach:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reduces client-side JavaScript bundle size</li>
                <li>Eliminates client-server waterfalls</li>
                <li>Keeps sensitive data and logic on the server</li>
                <li>Improves initial page load performance</li>
                <li>Supports streaming and progressive rendering</li>
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Code Example</h3>
                <Tabs defaultValue="component">
                  <TabsList>
                    <TabsTrigger value="component">Component</TabsTrigger>
                    <TabsTrigger value="data">Data Function</TabsTrigger>
                  </TabsList>
                  <TabsContent value="component">
                    <CodeBlock
                      code={`// app/page.tsx
export default async function Page() {
  // Fetch data directly in the Server Component
  const data = await getData()
  
  return (
    <main>
      <h1>My Data</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
    </main>
  )
}`}
                    />
                  </TabsContent>
                  <TabsContent value="data">
                    <CodeBlock
                      code={`// Data fetching function
async function getData() {
  // This can be a database query, API call, etc.
  const res = await fetch('https://api.example.com/data')
  
  if (!res.ok) {
    // This will activate the closest error.js Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
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
              <CardTitle>Live Example</CardTitle>
              <CardDescription>
                Data fetched from JSONPlaceholder API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 max-h-[500px] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Posts</h2>
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post: any) => (
                    <div key={post.id} className="border-b pb-4">
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {post.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <strong>Parallel Data Fetching:</strong> Fetch multiple data
                  sources in parallel to reduce loading time
                </li>
                <li>
                  <strong>Error Handling:</strong> Use error.js files to create
                  error boundaries
                </li>
                <li>
                  <strong>Loading States:</strong> Implement loading.js files
                  for loading UI
                </li>
                <li>
                  <strong>Caching:</strong> Utilize Next.js fetch cache control
                  options
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
