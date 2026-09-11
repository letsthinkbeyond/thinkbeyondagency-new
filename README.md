# Think Beyond Agency (TBA) — Website

A premium, editorial-style marketing site for Think Beyond Agency, built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP and Lenis.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — reveal animations, magnetic buttons, custom cursor
- **GSAP + ScrollTrigger** — horizontal-scroll portfolio pin
- **Lenis** — smooth scroll, wired into GSAP's ticker
- **Radix UI (Accordion)** — used for the shadcn-style FAQ accordion
- **react-icons** — all iconography

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

This project has already been built successfully (`npm run build`) with zero type or compile errors, so it's ready to deploy as-is (Vercel is the easiest path — just import the repo).

## What's included

- Animated loading screen (TBA logo build-in + progress bar)
- Full-bleed grain/noise overlay + paper texture background
- Custom cursor (desktop only, falls back to native cursor on touch)
- Sticky, glassmorphic navbar that hides on scroll-down / reveals on scroll-up
- Dark mode toggle (persisted to localStorage)
- Hero with word-by-word text reveal, mouse-parallax sticky notes and hand-drawn arrow
- Infinite marquee strip
- About section with overlapping paper cards
- Services grid — 12 services as ripped-paper cards with icons, hover lift + tilt
- Animated stat counters
- Horizontal-scroll, pinned portfolio (GSAP ScrollTrigger) — 8 of your client brands
- Vertical animated-line process timeline (Discover → Strategy → Design → Launch → Scale)
- Floating, rotated testimonial cards
- 3-tier pricing (middle tier highlighted)
- FAQ accordion (Radix, shadcn-style), pre-filled with your 50/50 payment terms
- Contact section: Nodemailer-powered API route (`/api/contact`) + front-end form with validation, loading/error states + icon-only phone/WhatsApp/Instagram/email links
- Giant reveal-on-scroll "TBA." wordmark in the footer
- SEO: metadata, Open Graph/Twitter tags, `robots.ts` and `sitemap.ts`

## Things to personalise before launch

1. **Contact details** — phone/WhatsApp numbers and email are placeholders pulled from your quote deck; double check them in `components/Contact.tsx`.
2. **OG image** — metadata in `app/layout.tsx` points to `/public/og-image.jpg`, which doesn't exist yet. Drop a 1200×630 image in `public/` with that name (or update the path).
3. **Portfolio visuals** — the 8 project tiles in `components/Portfolio.tsx` currently use colour-gradient placeholders (no client photography was provided). Swap the `gradient` values for real project images/videos when ready.
4. **Domain** — replace `https://thinkbeyondagency.com` in `app/layout.tsx`, `app/robots.ts` and `app/sitemap.ts` with your real domain.
5. **Contact form SMTP** — copy `.env.example` to `.env.local` and fill in your SMTP credentials (see [Contact form setup](#contact-form-setup) below).
6. **Copy** — all copy (services, testimonials, FAQs, pricing) is a strong first draft based on your brief and quote deck. Swap in real client quotes/testimonials once you have them, since these are illustrative placeholders.

## Folder structure

```
/app            — routes, layout, globals.css, robots/sitemap
/components     — all page sections + shared building blocks (Cursor, MagneticButton, RevealText, SectionTitle, PaperCard, StickyNote, Marquee)
/components/ui  — Radix-based accordion primitive (shadcn convention)
/hooks          — useLenis, useMousePosition, useCounter
/lib            — data.ts (all copy/content), utils.ts (cn helper), contact-validation.ts, smtp.ts
/app/api/contact — POST endpoint for contact form submissions (Nodemailer)
```

## Contact form setup

1. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in the SMTP variables in `.env.local`:
   - `SMTP_HOST` — your mail provider's SMTP hostname
   - `SMTP_PORT` — `587` (STARTTLS) or `465` (SSL)
   - `SMTP_USER` — SMTP username (usually your email)
   - `SMTP_PASS` — SMTP password or app-specific password
   - `SMTP_FROM` — sender address shown in the inbox
   - `CONTACT_EMAIL` — where form submissions are delivered
3. Restart the dev server: `npm run dev`
4. Submit the contact form on the site — you should receive an email at `CONTACT_EMAIL`.

**Gmail:** enable 2FA, then create an [App Password](https://myaccount.google.com/apppasswords) and use it as `SMTP_PASS`.

**Production (Vercel):** add the same variables in Project Settings → Environment Variables.

\
ufihdhdjhj