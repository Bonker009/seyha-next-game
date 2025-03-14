"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const courseRequestSchema = z.object({
  courseTitle: z.string().min(3),
  courseCategory: z.string(),
  description: z.string().optional(),
  reasonForRequest: z.string().min(10),
  email: z.string().email(),
});

type CourseRequestData = z.infer<typeof courseRequestSchema>;

export async function sendCourseRequestEmail(data: CourseRequestData) {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Format the email content
    const emailContent = `
      <h1>New Course Request</h1>
      <p><strong>Course Title:</strong> ${data.courseTitle}</p>
      <p><strong>Category:</strong> ${data.courseCategory}</p>
      ${
        data.description
          ? `<p><strong>Description:</strong> ${data.description}</p>`
          : ""
      }
      <p><strong>Reason for Request:</strong> ${data.reasonForRequest}</p>
      <p><strong>Student Email:</strong> ${data.email}</p>
      <hr />
      <p>This request was submitted through your course request form.</p>
    `;

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL, // Your email address
      subject: `New Course Request: ${data.courseTitle}`,
      html: emailContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
