import { useTranslations } from "next-intl";
import { IoAddCircle } from "react-icons/io5";

import "@/ui/styles/pages/home.page.scss";
import Button from "@/ui/components/atoms/Button.atom";
import { Link } from "@/navigation";

export default function Home() {
  const t = useTranslations("home");
  return (
    <div className="home wrapper">
      <div className="home-title">
        <h1 className="title">{t("title")}</h1>
        <p className="desc">{t("description")}</p>
      </div>

      <Link href="/generate">
        <Button>Počni odmah!</Button>
      </Link>
    </div>
  );
}
