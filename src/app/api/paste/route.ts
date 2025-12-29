// src/app/api/paste/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const slug = nanoid(10);
    
    const paste = await prisma.paste.create({
      data: {
        slug,
        content,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    return NextResponse.json({
      slug: paste.slug,
      url: `${baseUrl}/p/${paste.slug}`,
    });
  } catch (error) {
    console.error('Paste creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create paste' },
      { status: 500 }
    );
  }
}

// Optional: Add GET to test if route is accessible
export async function GET() {
  return NextResponse.json({ message: 'Paste API is working' });
}