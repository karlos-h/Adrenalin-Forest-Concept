import { defineField, defineType } from "sanity";

export const globalSettings = defineType({
  name: "globalSettings",
  title: "Global settings",
  type: "document",
  fields: [
    defineField({
      name: "siteNotice",
      title: "Site notice banner",
      type: "object",
      description:
        'Dismissible banner shown on every page, e.g. "hours may vary" announcements.',
      fields: [
        defineField({ name: "enabled", type: "boolean", initialValue: false }),
        defineField({ name: "message", type: "string" }),
        defineField({
          name: "id",
          type: "string",
          description:
            "Change this when publishing a new notice so visitors who dismissed the old one see it again.",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
        },
      ],
    }),
    defineField({
      name: "conditionsOfEntry",
      title: "Conditions of entry (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
  preview: { prepare: () => ({ title: "Global settings" }) },
});
