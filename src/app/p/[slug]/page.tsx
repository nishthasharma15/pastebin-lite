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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <pre style={{ 
        background: '#f4f4f4', 
        padding: '15px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}>
        {paste.content}
      </pre>
    </div>
  );
}