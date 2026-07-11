import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and stories from the Adrenalin Forest parks.",
};

/** Placeholder — blog posts migrate from the old site in a later phase. */
export default function BlogPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-hero font-bold uppercase leading-none">
        Stories from the trees
      </h1>
      <p className="mx-auto mt-4 max-w-md text-ink-500">
        The blog is moving over from our old site. While you wait, the courses
        aren't going anywhere.
      </p>
      <div className="mt-8">
        <Button href="/book">Book your climb</Button>
      </div>
    </section>
  );
}
