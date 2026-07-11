import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "accentKey",
      title: "Accent colour",
      type: "string",
      options: {
        list: [
          { title: "Lagoon Teal (Christchurch)", value: "christchurch" },
          { title: "Harbour Gold (Wellington)", value: "wellington" },
          { title: "Sunset Orange (Bay of Plenty)", value: "bay-of-plenty" },
          { title: "Volcanic Violet (Auckland)", value: "auckland" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", validation: (r) => r.required() })],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", validation: (r) => r.required() })],
        },
      ],
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 3,
      description: "One or two sentences, brand voice (bold and daring).",
    }),
    defineField({ name: "courseCount", type: "number" }),
    defineField({
      name: "seasonalHours",
      type: "array",
      of: [
        {
          type: "object",
          name: "season",
          fields: [
            defineField({ name: "label", type: "string", description: 'e.g. "Summer (Oct–Apr)"' }),
            defineField({
              name: "dateRange",
              type: "object",
              description: "Recurring annual range as MM-DD (may wrap year end)",
              fields: [
                defineField({ name: "from", type: "string", description: "MM-DD, e.g. 10-01" }),
                defineField({ name: "to", type: "string", description: "MM-DD, e.g. 04-30" }),
              ],
            }),
            defineField({ name: "openTime", type: "string", description: 'e.g. "9:30am"' }),
            defineField({ name: "lastEntry", type: "string", description: 'e.g. "3:00pm"' }),
            defineField({
              name: "closedDays",
              type: "array",
              of: [{ type: "string" }],
              options: {
                list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              },
            }),
            defineField({ name: "notes", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "openTime" } },
        },
      ],
    }),
    defineField({
      name: "prices",
      description:
        "Single source of truth — prices render on the site only from here. Never type prices into page copy.",
      type: "array",
      of: [
        {
          type: "object",
          name: "price",
          fields: [
            defineField({ name: "label", type: "string", description: 'e.g. "Adult (16+)"' }),
            defineField({ name: "amount", type: "number", description: "NZD" }),
            defineField({ name: "note", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "amount" } },
        },
      ],
    }),
    defineField({
      name: "restrictions",
      type: "object",
      fields: [
        defineField({ name: "minHeightMetres", type: "number", initialValue: 1.4 }),
        defineField({ name: "maxWeightKg", type: "number", initialValue: 125 }),
        defineField({ name: "notes", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "appointeddBookingId",
      type: "string",
      description: "Appointedd app/booking id for the embedded widget",
    }),
    defineField({
      name: "mapImage",
      title: "Park map",
      type: "image",
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "googleMapsEmbedUrl", type: "url" }),
    defineField({ name: "directions", type: "text", rows: 4 }),
    defineField({
      name: "faqs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "contactPhone", type: "string" }),
  ],
  preview: { select: { title: "name", media: "heroImage" } },
});
