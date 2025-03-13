import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/";
  const tag = request.nextUrl.searchParams.get("tag");

  // Check for the secret
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Invalid revalidation token",
      },
      { status: 401 }
    );
  }

  try {
    if (tag) {
      // Revalidate a specific cache tag
      revalidateTag(tag);
    } else {
      // Revalidate a specific path
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      message: tag ? `Revalidated tag: ${tag}` : `Revalidated path: ${path}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Error revalidating",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
