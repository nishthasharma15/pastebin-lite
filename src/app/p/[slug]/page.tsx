import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PastePage({ params }: PageProps) {
  const { slug } = await params; // ✅ REQUIRED FIX

  if (!slug) {
    return <h1>Invalid paste link</h1>;
  }

  const paste = await prisma.paste.findUnique({
    where: { slug },
  });

  if (!paste) {
    return <h1>Invalid paste link</h1>;
  }

  // Optional: expiry check
  if (paste.expiresAt && paste.expiresAt < new Date()) {
    return <h1>This paste has expired</h1>;
  }

  // Optional: max views check
  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return <h1>This paste has reached its view limit</h1>;
  }

  // Increment views
  await prisma.paste.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Paste</h1>

  <p>Views: {paste.views + 1}</p>
  <pre
    style={{
      background: "#f4f4f4",
      color: "#000",
      padding: "1rem",
      whiteSpace: "pre-wrap",
      borderRadius: "6px",
    }}
  >
    {paste.content}
  </pre>
</main>
  );
}
