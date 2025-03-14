"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";
import { sendCourseRequestEmail } from "./actions";

const formSchema = z.object({
  courseTitle: z.string().min(3, {
    message: "Course title must be at least 3 characters.",
  }),
  courseCategory: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().optional(),
  reasonForRequest: z.string().min(10, {
    message: "Please provide a reason for your request.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CourseRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTitle: "",
      courseCategory: "",
      description: "",
      reasonForRequest: "",
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Send the email
      const result = await sendCourseRequestEmail(data);

      if (!result.success) {
        throw new Error(result.error || "Failed to send request");
      }

      setIsSubmitted(true);
      toast.success("Course request submitted", {
        description:
          "Thank you for your suggestion. We'll review your request.",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          "Your course request could not be submitted. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Request Submitted</CardTitle>
          <CardDescription className="text-center">
            Thank you for your course suggestion
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="rounded-full bg-primary/10 p-6 mb-6">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            We've received your request
          </h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Our team will review your course suggestion and determine if it can
            be added to our platform.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              form.reset();
            }}
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Request Form</CardTitle>
        <CardDescription>
          Fill out the details about the course you'd like to see on our
          platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="courseTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Advanced Machine Learning"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The name of the course you'd like to see added
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="programming">
                        Programming & Development
                      </SelectItem>
                      <SelectItem value="design">Design & Creative</SelectItem>
                      <SelectItem value="business">
                        Business & Entrepreneurship
                      </SelectItem>
                      <SelectItem value="marketing">
                        Marketing & Communications
                      </SelectItem>
                      <SelectItem value="data-science">
                        Data Science & Analytics
                      </SelectItem>
                      <SelectItem value="personal-development">
                        Personal Development
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the category that best fits this course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

           
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what topics the course should cover..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about what you'd like to learn in this
                    course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonForRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want this course?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain why this course would be valuable to you..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tell us why this course would be beneficial to you and other
                    students
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll notify you if your requested course becomes available
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Course Request"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-muted-foreground text-center">
          Our team reviews all course requests. While we can't guarantee all
          suggestions will be implemented, we value your input in shaping our
          course catalog.
        </p>
      </CardFooter>
    </Card>
  );
}
