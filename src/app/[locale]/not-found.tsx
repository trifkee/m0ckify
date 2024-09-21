import Button from "@/ui/components/atoms/Button.atom";

import mockifyBackground from "@/public/images/bg.jpg";
import logo from "@/public/images/logo.png";

import "@/ui/styles/pages/notFound.page.scss";
import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

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
            <Button variant="primary">{t("ctas.homepage")}</Button>
          </Link>
          <Link href={"/generate"}>
            <Button variant="danger">{t("ctas.generate")}</Button>
          </Link>
        </div>
      </div>
      <div className="right">
        <Image src={mockifyBackground} alt="Mockify" />
      </div>
    </main>
  );
}
