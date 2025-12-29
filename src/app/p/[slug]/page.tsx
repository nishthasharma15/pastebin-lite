export default function HomePage() {
  return (
    <main style={{ padding: "2rem", color: "white" }}>
      <h1>Pastebin Lite</h1>

      <p>
        This is a lightweight Pastebin-like application.
      </p>

      <h2>How to use</h2>

      <ol>
        <li>Send a POST request to <code>/api/paste</code></li>
        <li>Receive a shareable URL</li>
        <li>Open the URL to view the paste</li>
      </ol>

      <h3>Example API Request</h3>

      <pre
        style={{
          background: "#111",
          padding: "1rem",
          borderRadius: "6px",
          overflowX: "auto",
        }}
      >
{`POST /api/paste
Content-Type: application/json

{
  "content": "Hello world",
  "expiresInMinutes": 60,
  "maxViews": 5
}`}
      </pre>
    </main>
  );
}
