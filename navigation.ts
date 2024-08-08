import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["sr", "en", "de", "fr"] as const;
export const localePrefix = "as-needed"; // Default

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
