import { defineField, defineType } from "sanity";

export const groupOffer = defineType({
  name: "groupOffer",
  title: "Group offer",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "locations",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Christchurch", value: "christchurch" },
          { title: "Wellington", value: "wellington" },
          { title: "Bay of Plenty", value: "bay-of-plenty" },
          { title: "Auckland", value: "auckland" },
        ],
      },
      description: "Leave empty if available at all locations.",
    }),
    defineField({ name: "groupSize", type: "string", description: 'e.g. "20+"' }),
    defineField({ name: "ageRange", type: "string", description: 'e.g. "Years 7–13"' }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
  ],
});
