import { useTranslations } from "next-intl";
import { IoAddCircle } from "react-icons/io5";

import "@/ui/styles/pages/home.page.scss";
import Button from "@/ui/components/atoms/Button.atom";

export default function Home() {
  const t = useTranslations("home");
  return (
    <div className="wrapper">
      <h1 className="home">{t("title")}</h1>
      <Button>
        Text
        <IoAddCircle />
      </Button>
      <Button variant="secondary">
        Text
        <IoAddCircle />
      </Button>
    </div>
  );
}
