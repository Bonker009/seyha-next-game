import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Palette, ArrowRight } from "lucide-react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { CoolMode } from "@/components/magicui/cool-mode";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center text-center mb-12">
        <SparklesText
          text="Welcome to Next.js Learning Hub"
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        />
        <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
          Your comprehensive resource for learning Next.js concepts and
          discovering UI libraries for your projects.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
        <Link
          href="/ui-libraries"
          className="transition-all hover:scale-[1.01]"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>UI Libraries</CardTitle>
              <CardDescription>
                Discover popular UI libraries and styling solutions for your
                Next.js projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                From component-based frameworks to CSS utilities, streamline
                your development workflow and improve user experience.
              </p>
            </CardContent>
            <CardFooter>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Recommended
              </Badge>
            </CardFooter>
          </Card>
        </Link>

        <Link
          href="/server-components"
          className="transition-all hover:scale-[1.01]"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Server Components</CardTitle>
              <CardDescription>
                Fetch data directly in React Server Components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Server Components can fetch data directly without client-side
                JavaScript, reducing bundle size and improving performance.
              </p>
            </CardContent>
            <CardFooter>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Recommended
              </Badge>
            </CardFooter>
          </Card>
        </Link>

        <Link
          href="/client-components"
          className="transition-all hover:scale-[1.01]"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Client Components</CardTitle>
              <CardDescription>
                Fetch data on the client using useEffect or SWR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Client-side data fetching is useful for user-specific data,
                frequently updating data, or when you need interactivity.
              </p>
            </CardContent>
            <CardFooter>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                Interactive
              </Badge>
            </CardFooter>
          </Card>
        </Link>

        <Link
          href="/server-actions"
          className="transition-all hover:scale-[1.01]"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Server Actions</CardTitle>
              <CardDescription>
                Fetch and mutate data with form actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Server Actions allow you to define async server functions that
                can be called from Client Components.
              </p>
            </CardContent>
            <CardFooter>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200"
              >
                Progressive Enhancement
              </Badge>
            </CardFooter>
          </Card>
        </Link>

        <Link
          href="/route-handlers"
          className="transition-all hover:scale-[1.01]"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Route Handlers</CardTitle>
              <CardDescription>Create API endpoints in Next.js</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Route Handlers let you create custom API endpoints within your
                Next.js application.
              </p>
            </CardContent>
            <CardFooter>
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200"
              >
                API Routes
              </Badge>
            </CardFooter>
          </Card>
        </Link>

        <Link
          href="/dynamic-data"
          className="transition-all hover:scale-[1.01]"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Dynamic Data</CardTitle>
              <CardDescription>
                Fetch fresh data on each request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fetch data on-demand for each request when you need the most
                up-to-date information.
              </p>
            </CardContent>
            <CardFooter>
              <Badge
                variant="outline"
                className="bg-rose-50 text-rose-700 border-rose-200"
              >
                Always Fresh
              </Badge>
            </CardFooter>
          </Card>
        </Link>

        <Link
          href="/rendering-strategies"
          className="transition-all hover:scale-[1.01]"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Rendering Strategies</CardTitle>
              <CardDescription>
                Deep dive into CSR, SSR, SSG, and ISR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Understand the different rendering strategies in Next.js and
                when to use each one.
              </p>
            </CardContent>
            <CardFooter>
              <Badge
                variant="outline"
                className="bg-violet-50 text-violet-700 border-violet-200"
              >
                Advanced
              </Badge>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
