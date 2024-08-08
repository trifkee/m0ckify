import { useTranslations } from "next-intl";

import "@/ui/styles/pages/home.page.scss";
import Nav from "@/ui/components/moleculs/Nav.molecul";
import Button from "@/ui/components/atoms/Button.atom";
import { IoArrowForwardSharp, IoBrushSharp } from "react-icons/io5";
import { Link } from "@/navigation";

import backgorund from "@/public/images/background.png";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("home");
  const g = useTranslations("global");

  return (
    <main className="home">
      <section className="home__header">
        <div className="title">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
        </div>

        <Link href={"/generate"}>
          <Button variant="secondary">
            {g("start")}
            <IoArrowForwardSharp />

            {/* <IoBrushSharp /> */}
          </Button>
        </Link>
        <Image className="background" alt="" src={backgorund} />
      </section>
    </main>
  );
}
