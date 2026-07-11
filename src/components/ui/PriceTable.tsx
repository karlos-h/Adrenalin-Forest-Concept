import type { Price } from "@/lib/types";

/**
 * Pricing table. Renders only from CMS prices — the single source of
 * truth. Practical info voice: plain and clear, zero fluff.
 */
export function PriceTable({
  prices,
  caption = "Prices",
}: {
  prices: Price[];
  caption?: string;
}) {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="border-b-2 border-forest-700">
          <th scope="col" className="py-3 pr-4 font-display text-h3 font-bold uppercase">
            Ticket
          </th>
          <th scope="col" className="py-3 text-right font-display text-h3 font-bold uppercase">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price) => (
          <tr key={price.label} className="border-b border-ink-500/20">
            <td className="py-3.5 pr-4">
              <span className="font-medium">{price.label}</span>
              {price.note && (
                <span className="block text-caption text-ink-500">{price.note}</span>
              )}
            </td>
            <td className="py-3.5 text-right font-display text-h3 font-bold text-cta-hover">
              ${price.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
