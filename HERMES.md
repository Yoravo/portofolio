# HERMES.md - Portfolio Radja Ravine Salfriandry

Portfolio website personal sebagai fresh graduate web developer. Static site
murni - tidak ada auth, tidak ada DB, tidak ada API routes. Deploy di Vercel.

## Tech Stack

| Layer           | Teknologi                        |
| --------------- | -------------------------------- |
| Framework       | Next.js 16.2.3 (App Router)      |
| Language        | TypeScript                       |
| CSS             | Tailwind CSS v4                  |
| Animasi         | Framer Motion                    |
| Icons           | lucide-react + react-icons       |
| Class Utility   | clsx + tailwind-merge            |
| Package Manager | npm                              |
| Deploy          | Vercel                           |

## Dev Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Project Structure

```
portofolio/
├── app/
│   ├── layout.tsx                ← root layout (font, metadata global)
│   ├── page.tsx                  ← home page (semua sections di-render di sini)
│   ├── globals.css
│   └── projects/
│       ├── page.tsx              ← halaman daftar semua project
│       └── [slug]/page.tsx       ← halaman detail project (dynamic route)
├── components/
│   ├── layouts/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/                 ← section-section di home page
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── JourneySection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── ProjectCard.tsx
│       └── TiltCard.tsx
├── lib/
│   ├── config.ts                 ← SINGLE SOURCE OF TRUTH semua data konten
│   ├── use-tilt.ts               ← custom hook untuk tilt card effect
│   └── utils.ts                  ← cn() helper (clsx + tailwind-merge)
└── public/
    ├── avatar.png
    └── resume-radja-ravine-salfriandry.pdf
```

## lib/config.ts - Source of Truth

Semua data konten dikelola di `lib/config.ts`. Jangan hardcode konten
di dalam komponen. Kalau ada perubahan data, edit di sini saja.

Yang ada di config:
- `siteConfig` - nama, role, tagline, email, social links, CV path, formspree
- `projects: Project[]` - slug, title, description, tags, github, demo, featured
- `skillGroups: SkillGroup[]` - skills per kategori (Frontend, Backend, Tools, Other)
- `timeline: TimelineEvent[]` - education, work, project, milestone events

## Sections di Home Page

| Section   | Komponen              | Data dari config  |
| --------- | --------------------- | ----------------- |
| Hero      | `HeroSection.tsx`     | `siteConfig`      |
| About     | `AboutSection.tsx`    | `siteConfig`      |
| Skills    | `SkillsSection.tsx`   | `skillGroups`     |
| Journey   | `JourneySection.tsx`  | `timeline`        |
| Contact   | `ContactSection.tsx`  | `siteConfig`      |

Projects punya halaman tersendiri (`/projects`) dan detail page (`/projects/[slug]`).
Slug di URL harus match persis dengan field `slug` di array `projects` di config.

## Feature Status

### Sudah Ada
- ✅ Home page dengan semua sections
- ✅ Halaman daftar projects (`/projects`)
- ✅ Halaman detail project (`/projects/[slug]`)
- ✅ Navbar + Footer
- ✅ Tilt card effect
- ✅ Contact form via Formspree
- ✅ CV download
- ✅ Animasi Framer Motion
- ✅ Deploy di Vercel

### Belum Ada / Possible Improvement
- ⬜ Dark mode toggle
- ⬜ Blog / artikel
- ⬜ Filter project by tag
- ⬜ OG image per project

## Code Edit Policy

NEVER overwrite an entire file. For ALL code changes, follow this flow:

1. Read the target file first with `read_file`
2. Identify the exact lines or block that need to change
3. Show a targeted snippet with the file path clearly stated:
   ```
   // components/sections/HeroSection.tsx - ganti className pada h1
   <h1 className="text-5xl font-bold tracking-tight">
   ```
4. Wait for explicit user confirmation before applying any edit

Targeted snippets only. Never rewrite files that don't need to change.

## Conventions

**Styling** - Tailwind CSS v4 murni. Gunakan `cn()` dari `lib/utils.ts`
untuk conditional classes.

**Animasi** - Framer Motion untuk semua animasi. Konsisten dengan pola
yang sudah ada di sections lain sebelum menambahkan animasi baru.

**Komponen** - Server Components by default. Tambahkan `"use client"`
hanya kalau butuh Framer Motion, useState, useEffect, atau event handler.
Jangan hapus `"use client"` dari komponen yang sudah pakai Framer Motion.

**Konten** - semua data konten (teks, project, skills, timeline) ada di
`lib/config.ts`. Jangan hardcode di dalam komponen.

## Things NOT To Do

- Jangan overwrite seluruh file - targeted snippet + path saja
- Jangan hardcode konten di luar `lib/config.ts`
- Jangan install UI library tambahan tanpa konfirmasi
- Jangan tambahkan auth, DB, atau API routes - ini static site
- Jangan hapus `"use client"` dari komponen yang pakai Framer Motion