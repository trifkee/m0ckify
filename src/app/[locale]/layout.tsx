import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Inter, Allura } from "next/font/google";

import QueryProvider from "@/ui/providers/QueryProvider.provider";
import RecoilProvider from "@/ui/providers/RecoilProvider.provider";

// TRANSLATIONS
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import "./globals.css";
import "@/ui/styles/global.scss";

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mockify - Online Mockups Generator",
  description:
    "Craft stunning  free mockups using custom-built 3D models. Elevate your designs with personalized creations, delivering a unique touch to every project.",
  metadataBase: new URL(`https://m0ckify.tech`),
  keywords: [
    "mockup",
    "mockups",
    "free mockups",
    "online mockup generator",
    "free online mockup generator",
    "3D mockups",
    "mockify",
    "m0ckify",
    "mockup generator",
    "free mockup tool",
    "custom mockups",
    "mockup maker",
    "mockup design",
    "3D model mockups",
    "iPhone mockups",
    "Android mockups",
    "TV mockups",
    "mobile app mockups",
    "mockup software free",
    "customizable mockups",
    "interactive mockups",
    "mockup website generator",
    "high-quality mockups",
    "mockup creator",
    "mockup platform",
    "mockup website",
    "design mockups free",
    "iPhone screen mockups",
    "Android screen mockups",
    "TV screen mockups",
    "online mockup platform",
    "3D mockup generator",
    "web mockup tool",
    "mockup creation online",
  ],
  openGraph: {
    siteName: "Mockify",
    url: "https://m0ckify.tech",
    images:
      "https://utfs.io/f/iztaqYgynMhQPaA2hanVqDAuyXGdB4ZWMrwavjHCFQch5sSo",
  },
  twitter: {
    images:
      "https://utfs.io/f/iztaqYgynMhQPaA2hanVqDAuyXGdB4ZWMrwavjHCFQch5sSo",
  },
  verification: {
    google: "5G3Db-j5HWTjNgCV9bFBv4GGKa_J415AjCi8PLQYX6k",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // // Enable static rendering
  // setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <>
      <RecoilProvider>
        <QueryProvider>
          <html lang={locale}>
            <body className={`${allura.className} ${inter.className}  body`}>
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
              <Analytics />
            </body>
          </html>
        </QueryProvider>
      </RecoilProvider>
    </>
  );
}

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }
