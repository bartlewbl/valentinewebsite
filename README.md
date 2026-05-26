# 💖 A little website, just for you

A playful, animated React site built with **Bun + TypeScript + Framer Motion**.

It starts with a 4-digit mystery code, opens into 7 animated memory pages, and finishes with two pages of all the things I love about her.

## Run it

```bash
bun install
bun dev
```

Opens at `http://localhost:3000`.

Build for production:

```bash
bun run build
bun start
```

## Customize

Everything you'd want to change lives in **`src/data.ts`**:

- `SECRET_CODE` — the 4 digits she has to figure out (currently `1402`)
- `CODE_HINT` — the line shown under the lock
- `memories[]` — the 7 memory pages (title, caption, date, photo, animation flavor)
- `appreciations1[]` / `appreciations2[]` — the two appreciation lists
- `YOUR_NAME` — signature at the end

### Adding photos

Drop image files into `public/photos/` and reference them in `src/data.ts`:

```ts
{
  title: "The day we met",
  caption: "...",
  date: "14.02",
  flavor: "confetti",
  photo: "/photos/01.jpg",   // ← add this line
},
```

Without a `photo`, each memory shows a soft placeholder card.

### Animation flavors

Each memory page picks one: `confetti`, `hearts`, `bubbles`, `stars`, `sparkles`, `balloons`, `rainbow`.

## Project layout

```
src/
  App.tsx                  — router
  index.css                — all styles + the pastel/rainbow theme
  data.ts                  — 🌸 edit this 🌸
  components/
    FloatingHearts.tsx     — background hearts/emojis
    PageFx.tsx             — per-page animated background
    Confetti.tsx           — confetti burst on unlock + final page
  pages/
    CodeEntry.tsx          — the 4-digit lock screen
    MemoryPage.tsx         — one of the 7 memories
    AppreciationPage.tsx   — appreciation list pages
    FinalPage.tsx          — "I love you" closing page
```
