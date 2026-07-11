import Image from "next/image";
import type { ImageRef } from "@/lib/types";

/**
 * Lazy-loaded photo grid. Photography over illustration — real people
 * mid-obstacle, canopy shots.
 */
export function Gallery({ images }: { images: ImageRef[] }) {
  if (images.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {images.map((image, i) => (
        <li
          key={`${image.src}-${i}`}
          className={`relative overflow-hidden rounded-xl ${
            i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/3]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
