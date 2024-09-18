"use client";

import Image from "next/image";

import mockifyBackground from "@/public/images/mockify-starter-big.jpg";

import "@/ui/styles/pages/home.page.scss";
import "@/ui/styles/pages/auth.page.scss";

export default function AuthLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <main className="auth-section">
      <section className="auth-section__right">
        <Image src={mockifyBackground} alt="Mockify" />
      </section>
      {children}
    </main>
  );
}
