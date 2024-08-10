import { useTranslations } from "next-intl";
import Button from "@/ui/components/atoms/Button.atom";
import { Link } from "@/navigation";

import { motion } from "framer-motion";

import Image from "next/image";
import logo from "@/public/images/logo.svg";

import { IoArrowForwardSharp } from "react-icons/io5";

import LanguagePicker from "@/ui/components/moleculs/LanguagePicker.molecul";

import "@/ui/styles/pages/home.page.scss";

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

        <LanguagePicker variant="editor" locale={locale} />
      </nav>

      <section className="home__header">
        <div className="title">{t("title")}</div>
        {/* <p className="title">{t("title")}. </p> */}

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

        {/* <Image src={bg} alt="" /> */}
      </section>
    </main>
  );
}
