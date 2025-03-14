import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookX, Home, ArrowLeft } from "lucide-react";

export default function CourseNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <BookX className="h-12 w-12 text-muted-foreground" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-2">
        Course Not Found
      </h1>

      <p className="text-xl text-muted-foreground mb-6 max-w-md">
        This course hasn't been added to our platform yet.
      </p>

      <p className="text-muted-foreground mb-8 max-w-lg">
        Our team is working on expanding our course catalog. Please check back
        later or explore our other available courses.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/next-concepts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse Available Courses
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
