import type { Faq } from "@/lib/types";

/**
 * Seed FAQs. Safety answers are calm and reassuring — never jokey.
 * Practical answers are plain. General answers can carry the brand energy.
 */
export const SEED_FAQS: Faq[] = [
  // --- Safety ---
  {
    question: "How do you keep me connected up there?",
    answer:
      "Every climber wears a CLiC-iT harness — a continuous-connection system that keeps you clipped to the safety line 100% of the time. The two connectors are linked, so one can only open when the other is locked on. You physically cannot unclip yourself from the course. Our team fits your harness, runs you through a full safety briefing and a practice level before you head up.",
    category: "safety",
    locations: [],
  },
  {
    question: "Is there a safety briefing?",
    answer:
      "Yes. Every session starts with a harness fit-out and a briefing from our trained team, followed by a demonstration level close to the ground. You only head onto the courses once you and our team are comfortable that you have the hang of it.",
    category: "safety",
    locations: [],
  },
  {
    question: "What happens if the weather turns?",
    answer:
      "The courses run in most weather — a bit of rain makes it more memorable. In high winds, lightning or other unsafe conditions we will close the course, and anyone with a booking can transfer to another day at no charge. If in doubt on the day, give your park a call before you travel.",
    category: "safety",
    locations: [],
  },
  {
    question: "Who can climb? Are there height or weight limits?",
    answer:
      "You need to be at least 1.4m tall and under 125kg. Under-16s must be accompanied on the course by an adult aged 18 or over. If you can reach, you can climb — level 1 starts just 1.5m off the ground.",
    category: "safety",
    locations: [],
  },
  // --- Booking / practical ---
  {
    question: "How long does a session take?",
    answer:
      "Your ticket gives you up to 3 hours on the courses. Most people take 2 to 3 hours to get as far as they can. Arrive 15 minutes before your session for the harness fit-out and briefing.",
    category: "booking",
    locations: [],
  },
  {
    question: "Do I need to book?",
    answer:
      "Booking online is the only way to guarantee your spot, especially on weekends and in school holidays. Walk-ins are welcome if there is space, but sessions do sell out.",
    category: "booking",
    locations: [],
  },
  {
    question: "What should I wear?",
    answer:
      "Closed shoes are a must — no jandals, no bare feet. Wear clothes you can move in and don't mind getting a bit of forest on. Long hair tied back, and leave the jewellery at home. Gloves are optional; some climbers like them for grip.",
    category: "booking",
    locations: [],
  },
  {
    question: "Can I bring my phone or a camera?",
    answer:
      "Only if it's secured to you — anything that can fall, will. GoPro hire is available at the park if you want to capture your climb hands-free.",
    category: "booking",
    locations: [],
  },
  {
    question: "Can spectators come along?",
    answer:
      "Absolutely. Friends and whānau can walk the forest floor beneath the courses for free — perfect for photos, moral support and gentle heckling.",
    category: "general",
    locations: [],
  },
  // --- General ---
  {
    question: "How high do the courses go?",
    answer:
      "The courses climb through 6 levels, each higher and harder than the last. Level 1 starts 1.5m off the ground. By level 6 you're up to 20m above the forest floor. How far you get is up to you.",
    category: "general",
    locations: [],
  },
  {
    question: "Do I have to do all 6 levels?",
    answer:
      "No — you climb at your own pace and stop whenever you've had enough. Most first-timers get through 3 or 4 levels. The top levels are there when you're ready to come back for them.",
    category: "general",
    locations: [],
  },
  // --- Groups ---
  {
    question: "Do you host school groups?",
    answer:
      "Yes — schools are some of our favourite climbers. Our programmes build confidence, teamwork and perseverance, and can be aligned to NCEA credits. Email your nearest park and we will put a day together for your class.",
    category: "groups",
    locations: [],
  },
  {
    question: "Is there a group discount?",
    answer:
      "Groups of 20 or more get special rates. Email your park with your numbers and preferred date and we will sort you out.",
    category: "groups",
    locations: [],
  },
  // --- Location-specific ---
  {
    question: "What is Adrenalin Max?",
    answer:
      "Adrenalin Max is our Christchurch combo: a high-wire session at Spencer Park plus a surf session with our partners at the beach next door. One big day, two very different kinds of adrenalin.",
    category: "general",
    locations: ["christchurch"],
  },
];
