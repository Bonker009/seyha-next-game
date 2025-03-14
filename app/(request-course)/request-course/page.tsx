import type { Metadata } from "next";
import CourseRequestForm from "./course-request-form";

export const metadata: Metadata = {
  title: "Request a Course",
  description:
    "Submit a request for a course you would like to see on our platform",
};

export default function CourseRequestPage() {
  return (
    <div className="container py-10 flex justify-center items-center">
      <CourseRequestForm />
    </div>
  );
}
