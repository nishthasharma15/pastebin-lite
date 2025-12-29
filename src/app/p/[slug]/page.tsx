import { prisma } from "@/lib/prisma";

export default async function PastePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ THIS IS THE KEY FIX

  if (!slug) {
    return <h1>Invalid paste link</h1>;
  }

  const paste = await prisma.paste.findUnique({
    where: { slug },
  });

  if (!paste) {
    return <h1>Paste not found</h1>;
  }

  const isExpired =
    (paste.expiresAt && paste.expiresAt < new Date()) ||
    (paste.maxViews !== null && paste.views >= paste.maxViews);

  if (isExpired) {
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
    whiteSpace: "pre-wrap",
    backgroundColor: "#f5f5f5",
    color: "#000000", // 👈 THIS FIXES IT
    padding: "1rem",
    borderRadius: "6px",
    fontSize: "1rem",
  }}
>
  {paste.content}
</pre>
      <p>Views: {paste.views + 1}</p>
    </main>
  );
}
