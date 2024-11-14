"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

import Button from "@/ui/components/atoms/Button.atom";

import "@/ui/styles/pages/notFound.page.scss";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="not-found">
      <div className="left">
        <Link prefetch={false} href={"/"}>
          <Image
            width={200}
            height={200}
            src="https://utfs.io/f/iztaqYgynMhQMLo4SplnI4ZRhWzuXoUb73aQgJ65ADEsY8Hq"
            alt="Mockify"
          />
        </Link>

        <div className="text">
          <h1>{t("title")}</h1>
          <p>{t("message")}</p>
        </div>
        <div className="links">
          <Link prefetch={false} href={"/"}>
            <Button variant="editor">{t("ctas.homepage")}</Button>
          </Link>
          <Link prefetch={false} href={"/generate"}>
            <Button variant="editor" className="danger">
              {t("ctas.generate")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="right">
        <Image
          width={200}
          height={200}
          src="https://utfs.io/f/iztaqYgynMhQzBXRYJM8PvFns3adbtMZODo29QJBS6yuWKL0"
          alt="Mockify"
        />
      </div>
    </main>
  );
}
