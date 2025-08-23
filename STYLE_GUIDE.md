# Wardro8e Style Guide

*A comprehensive guide to the design patterns, coding conventions, and architectural decisions used in the Wardro8e platform.*

# Functional & Interactive Style Guide

This section extends the static guidance with conventions for interactive features, authentication, APIs, a shared UI library, accessibility, and performance. Defaults follow Tailwind tokens defined in `app/globals.css`.

## Table of Contents

1. Principles & UX Tenets
2. Tech & Dependencies
3. Structure for Features
4. UI System & Components
5. Forms & Validation
6. Authentication & Authorization
7. API Route Conventions
8. State, Data & Side-effects
9. Accessibility & Keyboard UX
10. Animations & Micro-interactions
11. Performance & Network
12. Error Handling & Empty States
13. Content & Copy
14. Security & Secrets
15. Testing & Observability

---

## 1) Principles & UX Tenets

- Minimal friction: reach primary goal in ≤ 3 actions.
- Clear feedback: all actions show hover/focus/pressed/loading.
- Progressive disclosure: advanced inputs appear when relevant.
- Mobile-first density: compact on small screens, comfortable on desktop.
- Accessible by default: labels, roles, contrast and keyboard support.

---

## 2) Tech & Dependencies

- Next.js App Router, React 19, TypeScript 5
- Tailwind CSS + CSS variables (colors/tokens from v1)
- shadcn-style primitives: `components/ui/button|input|label|cn`
- framer-motion for motion
- Supabase SDK (client anon + server admin)
- Nodemailer for OTP email

---

## 3) Structure for Features

- Pages under `app/**`; server components by default.
- Auth pages under `app/auth/**` with compact responsive styles.
- API routes under `app/api/**/route.ts`.
- Shared libs under `lib/**` (supabase, validators, email, etc.).
- Shared UI under `components/ui/**`.

---

## 4) UI System & Components

### 4.1 Tailwind Tokens (recap)
- Use semantic utilities: `bg-card`, `text-muted-foreground`, `border-border`.
- Radius: inputs `rounded-xl`, cards `rounded-3xl`.
- Spacing: small screens prefer `gap-2.5`, `py-2`; desktop `gap-4`, `py-2.5`.

### 4.2 Primitives
- Button variants: `default` (brand), `outline`, `ghost`; sizes `sm|md|lg`.
- Input: concise placeholders (≤ 2 words), icon support via `relative` wrapper.
- Label: `text-[13px]` on small; `text-sm` on md+; always present.

### 4.3 Density Rules
- Label→Input gap: 4–6px (sm), 6–8px (md+).
- Grid gaps: `2.5` (sm), `4` (md+). Card padding: `p-6` (sm), `p-8` (md+).

---

## 5) Forms & Validation

- Required: labels, short placeholders, inline errors, disabled while loading.
- Password: ≥ 8 chars, upper/lower/number/special; display compact bullet list when invalid.
- Terms checkbox when needed; legal links inline.

### OTP Inputs (6-digit)
- Paste distributes digits across cells.
- Auto-advance to next empty cell.
- Backspace on empty focuses previous.
- Arrow keys navigate left/right.
- Sizes: `w-10 h-10` (sm), `w-12 h-12` (md+).

---

## 6) Authentication & Authorization

### Signup
1. Client POST `/api/auth/brand/signup` (brand names, email, password). No DB writes yet.
2. Server creates OTP (10 min ttl), stores pending, emails via Nodemailer.
3. Client verifies inline → POST `/api/auth/brand/verify` with email+OTP.
4. Server creates Supabase user (email confirmed) with `user_metadata: { full_name, brand_name }`, inserts `brands` row with `id = auth_user_id`, `email`, `verified=false`.
5. Success screen and link to dashboard.

### Login
- POST `/api/auth/brand/login` (email+password) → set httpOnly `auth-token` (24h).  
- DELETE same route to logout.  
- Auth pages redirect to `/dashboard` if session exists.

### Security
- Never expose `SUPABASE_SERVICE_ROLE` to client.  
- `brands.verified` toggled only by trusted admin.  
- Add RLS when owner field is introduced.

---

## 7) API Route Conventions
- Validate inputs early; return `{ message, errors? }` with 400.
- 200/201 on success with minimal payload.
- Log 5xx with context; never log secrets.

---

## 8) State, Data & Side-effects
- Server-only side-effects (email, admin inserts).  
- Client uses fetch to server APIs; no admin SDK in browser.  
- Use local component state for forms; keep it simple and explicit.

---

## 9) Accessibility & Keyboard UX
- Labels for every input; visible focus; contrast ≥ WCAG AA.  
- Keyboard: predictable tab order; Esc closes; OTP supports arrows/backspace.

---

## 10) Animations & Micro‑interactions
- 300–800ms easing, subtle translate+fade on entrance.  
- Avoid large motion on small screens; keep interactions responsive.

---

## 11) Performance & Network
- Prefer server components; lazy-load heavy client parts.  
- Debounce/Throttle where appropriate; compress images via Next Image.

---

## 12) Error Handling & Empty States
- Friendly copy; show recovery actions (retry/resend).  
- Empty states explain next step succinctly.

---

## 13) Content & Copy
- Tone: confident, modern, concise.  
- Short placeholders; action-led button text.

---

## 14) Security & Secrets
- OTP: 6 digits, 10-min expiry, ≥1-min resend cooldown.  
- Cookies: httpOnly, `secure` in prod, `sameSite=lax`.  
- Secrets live in `.env.local`; rotate periodically.

---

## 15) Testing & Observability
- Unit-test validators and API input handling where feasible.  
- QA checklist: validation errors, OTP paste/backspace, resend cooldown, auth redirect.