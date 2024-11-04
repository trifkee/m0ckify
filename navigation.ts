import {
  createSharedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["sr", "en", "de", "fr", "ch", "ru"];
export const localePrefix = "as-needed";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
