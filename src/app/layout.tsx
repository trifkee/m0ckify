import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Mockify - Online Mockups Generator</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
