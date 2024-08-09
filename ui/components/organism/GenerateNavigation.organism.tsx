"use client";

import { Link } from "@/navigation";
import GenerateDocumentTitle from "../moleculs/GenerateDocumentTItle.moleculs";

import logo from "@/public/images/logo-white.svg";
import Image from "next/image";
import LanguagePicker from "../moleculs/LanguagePicker.molecul";
import { IoMenuSharp, IoSaveSharp, IoSyncSharp } from "react-icons/io5";
import Button from "../atoms/Button.atom";
import useGenerator from "@/ui/hooks/useGenerator.hook";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function GenerateNavigation({ locale }: { locale: string }) {
  const t = useTranslations("generate");
  const { resetModelPosition, handleSave } = useGenerator();
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  return (
    <nav className="generate__navigation">
      <Link href={"/"}>
        <Image src={logo} alt="Mockify" />
      </Link>
      {/* <Link href={"/"}>Mockify</Link>
      <p>/</p> */}
      <GenerateDocumentTitle />

      <LanguagePicker variant={"editor"} locale={locale} />

      <Button
        className="mobile-cta"
        onClick={() => setIsOpenedMenu((prev) => !prev)}
        variant="editor"
      >
        <IoMenuSharp />
      </Button>

      {isOpenedMenu && (
        <div className="mobile-nav">
          <LanguagePicker variant={"editor"} locale={locale} />

          <Button
            onClick={resetModelPosition}
            variant="editor"
            className="danger  model__reset-cta"
          >
            <p>{t("actions.reset")}</p>
            <IoSyncSharp />
          </Button>
          <Button onClick={handleSave} variant="editor" className="download">
            <p>{t("actions.download")}</p>
            <IoSaveSharp />
          </Button>
        </div>
      )}
    </nav>
  );
}
