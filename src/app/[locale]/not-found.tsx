"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

import Button from "@/ui/components/atoms/Button.atom";

import logo from "@/public/images/logo-main-light.png";
import mockifyBackground from "@/public/images/bg.jpg";

import "@/ui/styles/pages/notFound.page.scss";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="not-found">
      <div className="left">
        <Link href={"/"}>
          <Image src={logo} alt="Mockify" />
        </Link>

        <div className="text">
          <h1>{t("title")}</h1>
          <p>{t("message")}</p>
        </div>
        <div className="links">
          <Link href={"/"}>
            <Button variant="editor">{t("ctas.homepage")}</Button>
          </Link>
          <Link href={"/generate"}>
            <Button variant="editor" className="danger">
              {t("ctas.generate")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="right">
        <Image src={mockifyBackground} alt="Mockify" />
      </div>
    </main>
  );
}
