// src/app/p/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PastePage({ params }: PageProps) {
  const { slug } = params;
  
  const paste = await prisma.paste.findUnique({
    where: { slug },
  });

  if (!paste) {
    notFound();
  }

  return (
    <div>
      <pre>{paste.content}</pre>
    </div>
  );
}

// Important: This tells Next.js this is a dynamic route
export const dynamicParams = true;