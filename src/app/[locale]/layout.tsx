import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";

import QueryProvider from "@/ui/providers/QueryProvider.provider";
import RecoilProvider from "@/ui/providers/RecoilProvider.provider";

// TRANSLATIONS
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import ogImage from "@/public/images/mockify-starter-big.jpg";

import "./globals.css";
import "@/ui/styles/global.scss";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mockify",
  description:
    "Craft stunning mockups using custom-built 3D models tailored to your vision. Elevate your designs with personalized creations, delivering a unique touch to every project.",
  metadataBase: new URL(`https://m0ckify.vercel.app`),
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
            <body className={`${inter.className} body`}>
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
