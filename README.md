# 📝 Pastebin-Lite

A lightweight Pastebin-like web application that allows users to store text content, generate shareable links, and view the content using those links. Pastes can optionally expire based on time or number of views.

---

## 🚀 Live Demo

**Production URL:**  
https://pastebin-lite-vercel.vercel.app

---

## 📌 Problem Statement

The objective of this project was to build a small Pastebin-like application where:

- Users can store plain text content
- A unique shareable link is generated for each paste
- Content can be accessed using that link
- Pastes may optionally expire after a certain time or number of views

This project was implemented as part of a take-home technical assignment and is designed to be simple, testable, and production-ready.

---

## ✨ Features

- Create and store text pastes
- Generate unique, shareable URLs
- View paste content using the generated link
- Optional expiration support:
  - ⏱️ Time-based expiration
  - 👁️ View-count-based expiration
- Automatic view count tracking
- Server-side rendering for secure data access
- Cloud-hosted PostgreSQL database

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Runtime:** Node.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Deployment:** Vercel

---

## 📐 Architecture Overview

- API routes handle paste creation
- Each paste is assigned a unique slug
- Dynamic routes (`/p/[slug]`) are used to render paste content
- Expiry logic is evaluated at request time
- Prisma provides type-safe database access
- Environment variables are used for secure configuration

---

## 📡 API Documentation

### ➤ Create a Paste

**Endpoint:**  
`POST /api/paste`

**Request Body (JSON):**
```json
{
  "content": "Hello world",
  "expiresInMinutes": 60,
  "maxViews": 5
}
----

## 🚀 Deployment

The application is deployed on Vercel

PostgreSQL is hosted on Neon

Environment variables are configured in the Vercel dashboard

Prisma client is generated during the build process

## 🧠 Design Considerations

Prisma ORM is used for type safety and clean database access

Expiry logic is enforced at read time to keep the system stateless

The application is designed to be minimal, scalable, and easy to test

No authentication is included to keep the scope aligned with the assignment

