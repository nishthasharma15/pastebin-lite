import { prisma } from "@/lib/prisma";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PastePage({ params }: PageProps) {
  const slug = params.slug;

  if (!slug) {
    return <h1>Invalid paste link</h1>;
  }

  const paste = await prisma.paste.findUnique({
    where: { slug },
  });

  if (!paste) {
    return <h1>Paste not found</h1>;
  }

  if (paste.expiresAt && paste.expiresAt < new Date()) {
    return <h1>This paste has expired</h1>;
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return <h1>This paste has expired</h1>;
  }

  await prisma.paste.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Paste</h1>

      <pre
        style={{
          background: "#f4f4f4",
          padding: "1rem",
          whiteSpace: "pre-wrap",
          borderRadius: "6px",
        }}
      >
        {paste.content}
      </pre>

      <p>Views: {paste.views + 1}</p>
    </main>
  );
}
