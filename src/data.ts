// 🌸 Edit this file to customize the website 🌸

// The 4-digit code she needs to type to unlock the site.
// Hint shown to her: "The first day we met <3"
export const SECRET_CODE = "1402";
export const CODE_HINT = "The first day we met <3";

// Her name (used in greetings). Leave empty string to skip.
export const HER_NAME = "";
// Your signature at the end
export const YOUR_NAME = "Yours, always";

export type Memory = {
  title: string;
  caption: string;
  date: string;
  // Drop your photo into /public/photos/ and reference it here, e.g. "/photos/01.jpg"
  // Leave as undefined to show a pretty placeholder.
  photo?: string;
  // Visual style — picks an animation flavor for the page
  flavor:
    | "confetti"
    | "hearts"
    | "bubbles"
    | "stars"
    | "sparkles"
    | "balloons"
    | "rainbow";
};

// ===== The 7 memories =====
// Replace these with real moments from your relationship.
export const memories: Memory[] = [
  {
    title: "The day we met",
    caption:
      "I still remember the exact moment. The world got a little brighter that day — I just didn't know yet that it was you doing it.",
    date: "14.02",
    flavor: "confetti",
    // photo: "/photos/01.jpg",
  },
  {
    title: "Our first real conversation",
    caption:
      "Hours felt like minutes. I went home smiling like an idiot and couldn't wait to talk to you again.",
    date: "the night we stayed up too late",
    flavor: "hearts",
  },
  {
    title: "Our first date",
    caption:
      "I was nervous the whole way there. The second I saw you, all of it disappeared. You have that effect on me.",
    date: "you in that outfit, me trying not to stare",
    flavor: "bubbles",
  },
  {
    title: "That first 'I love you'",
    caption:
      "It slipped out before I planned it. I was scared for a half-second and then I wasn't, because you smiled.",
    date: "a moment that changed everything",
    flavor: "sparkles",
  },
  {
    title: "Our first trip together",
    caption:
      "Bad weather, wrong turns, getting lost — and somehow it was still one of the best days of my life. Because you were there.",
    date: "the adventure",
    flavor: "balloons",
  },
  {
    title: "A quiet Sunday with you",
    caption:
      "No plans, just us. Coffee, music, your laugh. Those are the days I think about the most when I miss you.",
    date: "every Sunday I get with you",
    flavor: "stars",
  },
  {
    title: "Today",
    caption:
      "Every day with you is a memory worth keeping. This is just one more — and I can't wait for all the ones still coming.",
    date: "right now, and forever",
    flavor: "rainbow",
  },
];

// ===== Quiz: "do you think I know you?" =====
// Each question has options + one correct answer (the index into options).
// `reaction` is the line she sees after picking the right one — make it personal.
export type QuizQuestion = {
  prompt: string;
  options: string[];
  // For single-select questions, the index of the correct option.
  correctIndex?: number;
  // For multi-select questions, the indexes that must ALL be selected.
  // If set, the question is rendered as multi-select.
  correctIndexes?: number[];
  // shown after she gets it right — your chance to be sweet
  reaction: string;
  // shown if she picks wrong (kept playful)
  nudge?: string;
  emoji?: string;
};

export const quiz: QuizQuestion[] = [
  {
    prompt: "What's your favorite color?",
    options: ["Pink", "Lavender", "Black", "Sunset orange"],
    correctIndex: 2,
    reaction: "Black it is 🖤 mysterious, just like you.",
    nudge: "Think darker 🖤",
    emoji: "🎨",
  },
  {
    prompt: "What's your comfort food?",
    options: ["Pasta", "Sushi", "Pancakes", "Ice cream"],
    correctIndex: 3,
    reaction: "Ice cream 🍦 I've watched you light up over it too many times.",
    nudge: "Cold and sweet... try again 😉",
    emoji: "🍨",
  },
  {
    prompt: "What's your favorite breakfast?",
    options: ["Pancakes", "Toast & jam", "Eggs", "Cereal"],
    correctIndex: 2,
    reaction: "Eggs 🍳 of course. I've made them for you enough times to know.",
    nudge: "Almost — think simpler, the breakfast I always make you 🍳",
    emoji: "🍳",
  },
  {
    prompt: "What's the cutest thing about you?",
    options: ["Your smile", "Your cute eyes", "Your laugh", "Your little nose"],
    correctIndex: 1,
    reaction: "Your eyes 👀 they get me every single time.",
    nudge: "I get lost in them all the time — try again.",
    emoji: "💘",
  },
  {
    prompt: "Pick all my favorite qualities about you 💖",
    options: ["Beautiful", "Intelligent", "Hard working", "Cute"],
    correctIndexes: [0, 1, 2, 3],
    reaction: "All of them. Every. Single. One. 💖",
    nudge: "There's more than that — keep going.",
    emoji: "🌟",
  },
];

// ===== Things I appreciate about you (page 1 — split into 2 pages) =====
export const appreciations1 = [
  { emoji: "✨", text: "Your laugh — it lights up entire rooms (and me)." },
  { emoji: "💛", text: "How kind you are, even when nobody's looking." },
  { emoji: "🧠", text: "The way your brain works — you're brilliant and you don't even know it." },
  { emoji: "🤗", text: "Your hugs. Nothing else in the world feels like home like that." },
  { emoji: "🎨", text: "Your creativity — you make ordinary days feel like art." },
  { emoji: "💪", text: "How strong you are, even on the days you don't feel it." },
  { emoji: "🌅", text: "How you light up when you talk about things you love." },
  { emoji: "🍳", text: "The way you take care of me without me even asking." },
];

export const appreciations2 = [
  { emoji: "👀", text: "The way you look at me. I notice every time." },
  { emoji: "😂", text: "How you can make me laugh on the worst days." },
  { emoji: "🤝", text: "You're my best friend. The actual real one." },
  { emoji: "🌱", text: "How you make me a better person just by being you." },
  { emoji: "🕊️", text: "Your patience with me — even when I don't deserve it." },
  { emoji: "🌙", text: "The way you fall asleep next to me." },
  { emoji: "💌", text: "Every little message you send that makes my day." },
  { emoji: "💖", text: "Just… all of you. Every single part." },
];
