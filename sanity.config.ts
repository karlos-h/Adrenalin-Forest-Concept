import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

/**
 * Sanity Studio config. Run `npx sanity dev` once NEXT_PUBLIC_SANITY_PROJECT_ID
 * is set (see .env.example). Staff edit hours, prices, photos and FAQs here.
 */
export default defineConfig({
  name: "adrenalin-forest",
  title: "Adrenalin Forest",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
