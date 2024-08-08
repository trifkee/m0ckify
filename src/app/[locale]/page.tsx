import Button from "@/ui/components/atoms/Button.atom";
import { Link } from "@/navigation";

import Image from "next/image";
import logo from "@/public/images/logo.svg";

import { IoArrowForwardSharp } from "react-icons/io5";

import "@/ui/styles/pages/home.page.scss";
import LanguagePicker from "@/ui/components/moleculs/LanguagePicker.molecul";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("home");

  return (
    <main className="home">
      <nav className="navigation">
        <Image className="logo" src={logo} alt="Mockify" />

        <LanguagePicker locale={locale} />
      </nav>

      <section className="home__header">
        <p className="title">{t("title")}</p>

        <div className="ctas">
          <Button className="learn-more" variant="editor">
            {t("learnMore")}
          </Button>
          <Link href={"/generate"}>
            <Button className="get-started" variant="editor">
              {t("getStarted")} <IoArrowForwardSharp />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
