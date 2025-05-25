# 🌍 LexiLook – A Smarter Way to Learn Words

**LexiLook** is a fast, type-safe, and accessible web app designed for language learners. Search any word to explore its definition, usage, and structure through a performant, scalable architecture aligned with Next.js App Router standards.

---

## ✨ Features

- 🔍 Lookup any word with real-time results
- 📚 See definitions, usage examples, and parts of speech
- 🌐 Multi-language translation support (planned)
- 🔊 Pronunciation and etymology (upcoming)
- ⚡ Optimized with Next.js 14, Supabase, and Shadcn UI
- ♿ Fully accessible, mobile-first responsive design using Tailwind Aria and Radix UI

---

## 🧱 Tech Stack

- **Frontend:** React, TypeScript, Next.js 14 (App Router)
- **UI/UX:** Shadcn UI, Radix UI, Tailwind CSS, Tailwind Aria
- **Backend:** Supabase (PostgreSQL, RLS enabled)
- **API:** Dictionary API ([docs](https://api.dictionaryapi.dev))

---

## 🧪 Testing & Validation

- **Unit & Integration Testing:** Jest + React Testing Library
- **E2E Testing:** Playwright
- **Form Validation:** Zod schemas
- **Server Actions:** Type-safe with `next-safe-action`, wrapped in `ActionResponse`

---

## 🔒 Security & Data Integrity

- ✅ All inputs validated using Zod before Supabase operations
- 🔐 Supabase RLS enabled with strict permission checks
- ⚙️ Server-side Supabase initialized via `createServerComponentClient`
- 🔧 User authentication managed by `@supabase/auth-helpers-nextjs`
- 🧩 Errors modeled and returned as typed results using `ActionResponse`

---

## 🧑‍💻 Development Principles

- 🧠 Functional, declarative components using `function` keyword
- ⚙️ Modular file structure (e.g., `components/word-result`, `lib/supabase/fetch-word.ts`)
- 📁 Use `RORO` (Receive an Object, Return an Object) for utilities
- 🧹 Early returns and guard clauses for error handling
- 📦 Avoid `useEffect` and `setState` in favor of RSC and server actions
- 🧾 Follow type-safe practices: prefer interfaces, avoid enums
- 🧩 Use named exports and semantic file naming (lowercase with dashes)

---

## 🚀 Performance

- ⚡ Server-side rendering via Next.js App Router
- 🧠 Prefetching and lazy loading non-critical components
- 🖼️ WebP image optimization with native `next/image`
- 📊 Monitoring LCP, CLS, and FID for Web Vitals

---

## 📁 File Structure (Sample)

```
app/
 ├─ page.tsx                    # RSC entry
 ├─ layout.tsx                  # Root layout
 ├─ globals.css                 # Tailwind config
components/
 ├─ search-bar/                # Search input
 ├─ word-result/               # Result display
lib/
 ├─ supabase/                  # Supabase helpers
 ├─ validation/                # Zod schemas
 ├─ actions/                   # next-safe-action implementations
types/
 └─ actions.ts                 # ActionResponse type
```

---

## 🛤️ Roadmap

- 🌐 Multi-language support
- 🔊 Audio pronunciation
- 🕰️ Saved search history per user
- 🎨 User-defined themes and accessibility settings
- 👤 Auth-protected features with Supabase Auth

---

## 📬 Want to Contribute?

We welcome contributions from developers and language lovers! Fork, open a PR, or create an issue to get involved.

---

## 📎 License

MIT © LexiLook Team
