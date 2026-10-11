# SmartCare Assure — demo prototype

A clickable prototype of **SmartCare Assure**, the waterproofing service platform
by Asian Paints, built for the Canvas 2026 case. No backend: every screen reads
one sample job (`SCA-000127`) from a single data file, so the Job ID, the
amounts, the dates and the hold points match everywhere.

> **Find the real problem. Fix it right. Stay dry.**

---

## 1. Add the photos first

The folder `public/images/` ships **empty**. Open **`IMAGES.md`** — it lists all
24 photos with the exact file name, the aspect ratio and what to shoot. Drop
each file into `public/images/` and it appears automatically.

Until a file is there, that slot shows a neat labelled placeholder naming the
file it wants, so nothing ever looks broken. You can demo the whole thing with
no photos at all.

## 2. Run it

Needs Node.js 18.17 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production check: `npm run build && npm run start`.

## 3. Put it online

**Vercel** — push this folder to a GitHub repo, go to vercel.com, **Add New →
Project**, import the repo, click **Deploy**. Next.js is detected automatically;
there is nothing to configure.

**GitHub**

```bash
git init
git add .
git commit -m "SmartCare Assure prototype"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

---

## The eight screens

Open `/` for a launcher listing them in presentation order.

| # | Screen | App | Route |
|---|--------|-----|-------|
| 1 | Home | Customer | `/customer` |
| 2 | Free photo check | Customer | `/customer/triage` |
| 3 | Your verdict | Customer | `/customer/verdict` |
| 4 | Your price | Customer | `/customer/quote` |
| 5 | Progress report | Customer | `/customer/progress` |
| 6 | Water Protection Passport | Customer | `/customer/passport` |
| 7 | Verdict and signature | Contractor | `/contractor/verdict` |
| 8 | Command centre | Internal | `/command` |

Plus `/customer/help`, so the Help tab and the "ask us" buttons land somewhere
real during a demo.

### What to click in front of the jury

- **Screen 2** — walk all five steps. Pick a surface, tap the three photo slots,
  tick the signs you can see, answer when it happens, then choose a visit slot.
  The AI panel only appears once all three photos are in.
- **Screen 4** — tick both boxes and press **Approve and book**. Hold point 2
  unlocks on screen.
- **Screen 7** — switch between **हिंदी / English / ਪੰਜਾਬੀ**; the whole screen
  changes language, including the work steps. Pick a verdict: *Plumbing* kills
  the sale and still pays the technician, *Structural* blocks the quote outright.
  Then sign, and hold point 1 unlocks.
- **Screen 8** — all six tabs work, and the three city buttons change every
  number, table and alert. In **Review**, accept or overrule a diagnosis and the
  open count drops.

### Demo controls

On any screen: **←** and **→** move through the storyboard, **H** hides the
floating control bar before a screenshot, and the grid button returns to the
launcher. The bar sits outside the phone frame on desktop and is hidden entirely
on phone-sized windows.

---

## How it is built

- **Next.js (App Router), TypeScript, Tailwind, Framer Motion.** Inter is loaded
  from Google Fonts at runtime, so the build works offline too.
- **`lib/job.ts`** — the spine. One typed job; every customer screen reads it.
- **`lib/mock.ts`** — operating data for the command centre: three cities, the
  routing queue, hold points, review queue, claims and partners.
- **`lib/i18n.ts`** — the contractor app's English, Hindi and Punjabi strings.
- **`components/`** — the signature parts reused across screens: `SmartImage`
  (the photo-or-placeholder component), `JobIdPill`, `AiChip`, `HoldPointLock`,
  `EvidencePhoto`, `SignedByRow`, `PhoneFrame`, `BottomTabBar`.
- **`tailwind.config.ts`** — the palette, radii and type scale as tokens.

Two rules are enforced in code rather than by discipline: `AiChip` renders a
`<span>` and takes no click handler, so AI can never label an action; and no
screen hardcodes a figure that also appears somewhere else.

All names, dates and amounts are sample data. The command centre is labelled
*Illustrative data*, as the blueprint specifies.
