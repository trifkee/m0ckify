import Image from "next/image";

import mockifyBackground from "@/public/images/bg.jpg";

import "@/ui/styles/pages/home.page.scss";
import "@/ui/styles/pages/auth.page.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-section">
      {children}
      <section className="auth-section__right">
        <Image src={mockifyBackground} alt="Mockify" />
      </section>
    </main>
  );
}
