📝 Pastebin-Lite

A lightweight Pastebin-like web application that allows users to store text content, generate shareable links, and optionally expire content based on time or number of views.

🚀 Live Demo

Production URL:
👉 https://pastebin-lite-vercel.vercel.app

✨ Features

Create and store text pastes

Generate unique, shareable URLs

View pastes using the generated link

Optional expiration:

⏱️ Time-based expiry

👁️ View-count-based expiry

Automatic view count tracking

Server-side rendering with Next.js App Router

Cloud-hosted PostgreSQL database

🛠️ Tech Stack

Framework: Next.js (App Router)

Backend: Node.js

Database: PostgreSQL (Neon)

ORM: Prisma

Deployment: Vercel

📡 API Endpoints
Create a Paste

POST /api/paste

Request Body (JSON):

{
  "content": "Hello world",
  "expiresInMinutes": 60,
  "maxViews": 5
}


Response:

{
  "id": "cmjrbtfwy0000gg8gs0dneicq",
  "slug": "b5a8c89b",
  "url": "https://pastebin-lite-vercel.vercel.app/p/b5a8c89b"
}

View a Paste

GET /p/[slug]

Displays paste content

Increments view count

Shows expiry message if expired

🗄️ Database Schema
model Paste {
  id         String   @id @default(cuid())
  slug       String   @unique
  content    String
  expiresAt  DateTime?
  maxViews   Int?
  views      Int      @default(0)
  createdAt  DateTime @default(now())
}

⚙️ Environment Variables

Create a .env file locally or configure them in Vercel:

DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
NEXT_PUBLIC_BASE_URL=https://pastebin-lite-vercel.vercel.app

🧪 Local Development
git clone https://github.com/nishthasharma15/pastebin-lite
cd pastebin-lite
npm install
npx prisma generate
npx prisma db push
npm run dev


App will run at:

http://localhost:3000

🧠 Design Notes

Uses Prisma ORM for type-safe database access

Implements expiration logic at request time

Uses server components for secure data fetching

Designed to be simple, testable, and production-ready

📌 Notes

This project was built as part of a take-home evaluation

AI tools were used as development assistants

All implementation and design decisions are fully understood and explainable

📄 License

MIT License
