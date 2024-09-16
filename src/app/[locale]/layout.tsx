import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ContextProvider } from "@/ui/providers/ContextProvider.provider";

// TRANSLATIONS
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "./globals.css";
import "@/ui/styles/global.scss";
import QueryProvider from "@/ui/providers/QueryProvider.provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mockify",
  description: "Create amazing mockups with custom made models",
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
    <ContextProvider>
      <QueryProvider>
        <html lang={locale}>
          <body className={`${inter.className} body`}>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </body>
        </html>
      </QueryProvider>
    </ContextProvider>
  );
}
