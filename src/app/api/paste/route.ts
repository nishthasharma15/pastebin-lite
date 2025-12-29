import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, expiresInMinutes, maxViews } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const slug = crypto.randomBytes(4).toString("hex");

    const expiresAt =
      typeof expiresInMinutes === "number"
        ? new Date(Date.now() + expiresInMinutes * 60 * 1000)
        : null;

    const paste = await prisma.paste.create({
      data: {
        content,
        slug,
        expiresAt,
        maxViews: typeof maxViews === "number" ? maxViews : null,
      },
    });

    return NextResponse.json({
      id: paste.id,
      slug: paste.slug,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${paste.slug}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
