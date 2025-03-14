import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { concepts } from "@/lib/concept-data"

export const metadata: Metadata = {
  title: "Next.js Concepts",
  description: "Learn essential Next.js concepts and features.",
}



export default function NextConceptsPage() {
  return (
    <div className="space-y-6">
    

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {concepts.map((concept) => (
          <Card key={concept.title} className="flex flex-col h-full">
            <CardHeader>
              <div className={`p-2 ${concept.color} rounded-md w-fit mb-2`}>
                <concept.icon className={`h-6 w-6 ${concept.textColor}`} />
              </div>
              <CardTitle className="text-xl">{concept.title}</CardTitle>
              <CardDescription>{concept.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4">
              <Button asChild variant="default" className="w-full">
                <Link href={concept.href} className="flex items-center justify-center">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

