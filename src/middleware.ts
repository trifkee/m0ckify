import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["sr"],

  // Used when no locale matches
  defaultLocale: "sr",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(sr)/:path*"],
};
