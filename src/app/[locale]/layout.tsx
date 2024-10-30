import type { Metadata } from "next";
import { Inter, Allura } from "next/font/google";

import QueryProvider from "@/ui/providers/QueryProvider.provider";
import RecoilProvider from "@/ui/providers/RecoilProvider.provider";

// TRANSLATIONS
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import ogImage from "@/public/images/mockify-starter-big.jpg";

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
  openGraph: {
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
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
            </body>
          </html>
        </QueryProvider>
      </RecoilProvider>
    </>
  );
}
