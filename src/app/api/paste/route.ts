import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, expiresInMinutes, maxViews } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Invalid content" },
        { status: 400 }
      );
    }

    const slug = nanoid(8);

    const paste = await prisma.paste.create({
      data: {
        slug,
        content,
        expiresAt: expiresInMinutes
          ? new Date(Date.now() + expiresInMinutes * 60 * 1000)
          : null,
        maxViews: maxViews ?? null,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    return NextResponse.json({
      id: paste.id,
      slug: paste.slug,
      url: `${baseUrl}/p/${paste.slug}`,
    });
  } catch (error) {
    console.error("POST /api/paste error:", error);
    return NextResponse.json(
      { error: "Failed to create paste" },
      { status: 500 }
    );
  }
}
