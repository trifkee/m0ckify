import Image from "next/image";

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
        <Image
          width={200}
          height={1200}
          src="https://utfs.io/f/iztaqYgynMhQzBXRYJM8PvFns3adbtMZODo29QJBS6yuWKL0"
          alt="Mockify"
        />
      </section>
    </main>
  );
}
