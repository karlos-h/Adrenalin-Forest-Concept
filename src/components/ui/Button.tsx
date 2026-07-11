import Link from "next/link";

type Variant = "primary" | "light" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  // Accent CTA — resolves to the location accent inside a LocationTheme
  primary: "bg-cta text-white hover:bg-cta-hover",
  // For dark hero/CTA panels where a solid accent is already in play
  light: "bg-white text-forest-700 hover:bg-canopy-200",
  ghost:
    "border-2 border-current bg-transparent text-current hover:bg-white/10",
};

const BASE_CLASSES =
  "inline-block rounded-full px-7 py-3.5 text-center font-semibold transition-colors";

interface ButtonProps {
  href?: string;
  variant?: Variant;
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
}

export function Button({
  href,
  variant = "primary",
  type = "button",
  className = "",
  children,
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
