import type { GroupOffer } from "@/lib/types";

export const SEED_GROUP_OFFERS: GroupOffer[] = [
  {
    title: "Schools & NCEA programmes",
    description:
      "Outdoor education that students actually talk about afterwards. Our school programmes build confidence, teamwork and perseverance on the wires, and can be aligned to NCEA achievement standards. We handle the safety briefing, supervision structure and risk documentation — you bring the class.",
    locations: [],
    groupSize: "10+",
    ageRange: "Years 7–13",
    image: { src: "/images/groups.svg", alt: "A school group being briefed before their climb" },
  },
  {
    title: "Corporate & team building",
    description:
      "Put the team 20m up a tree and watch the org chart flatten out. A shared challenge beats another meeting room workshop — teams leave with real stories and a fresh read on how they back each other under pressure.",
    locations: [],
    groupSize: "10+",
    ageRange: "Adults",
    image: null,
  },
  {
    title: "Birthday parties",
    description:
      "The birthday they'll still be talking about at the next one. Book the group in, climb together, then take over a picnic area for the cake. Under-16s climb with an adult, and spectating whānau walk the forest floor free.",
    locations: [],
    groupSize: "8+",
    ageRange: "10+ (min height 1.4m)",
    image: null,
  },
  {
    title: "Adrenalin Max & Surf Max combos",
    description:
      "Christchurch only: pair your high-wire session at Spencer Park with a surf session at the beach next door. Adrenalin Max for groups who want the full day; Surf Max programmes for schools chasing two outdoor-ed boxes in one trip.",
    locations: ["christchurch"],
    groupSize: "10+",
    ageRange: "All climbers 1.4m+",
    image: null,
  },
];
