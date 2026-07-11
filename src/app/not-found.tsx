import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-hero font-bold uppercase leading-none">
        Wrong branch
      </h1>
      <p className="mx-auto mt-4 max-w-md text-ink-500">
        This page doesn't exist — but the courses definitely do.
      </p>
      <div className="mt-8">
        <Button href="/">Back to the forest</Button>
      </div>
    </section>
  );
}
