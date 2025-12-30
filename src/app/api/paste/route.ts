import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, expiresInMinutes, maxViews } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const slug = nanoid(8);

    const paste = await prisma.paste.create({
      data: {
        content,
        slug,
        expiresAt: expiresInMinutes
          ? new Date(Date.now() + expiresInMinutes * 60 * 1000)
          : null,
        maxViews: maxViews ?? null,
      },
    });

    return NextResponse.json({
      id: paste.id,
      slug: paste.slug,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${paste.slug}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
