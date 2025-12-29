import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateSlug(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, expiresInMinutes, maxViews } = body;

    // Validation
    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Expiry time (optional)
    let expiresAt: Date | null = null;
    if (expiresInMinutes && typeof expiresInMinutes === "number") {
      expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    }

    // Create paste
    const paste = await prisma.paste.create({
      data: {
        content,
        slug: generateSlug(),
        expiresAt,
        maxViews: maxViews ?? null,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    return NextResponse.json({
      id: paste.id,
      slug: paste.slug,
      url: `${baseUrl}/p/${paste.slug}`,
    });
  } catch (error) {
    console.error("POST /api/paste error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
