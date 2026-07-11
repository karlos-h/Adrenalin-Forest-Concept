import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["safety", "booking", "general", "groups"],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
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
      description: "Leave empty if the question applies everywhere.",
    }),
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});
