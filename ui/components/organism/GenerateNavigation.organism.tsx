"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";

import GenerateDocumentTitle from "@/ui/components/moleculs/GenerateDocumentTItle.moleculs";
import LanguagePicker from "@/ui/components/moleculs/LanguagePicker.molecul";
import Button from "@/ui/components/atoms/Button.atom";
import NavigationCtas from "../moleculs/NavigationCtas.molecul";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import logo from "@/public/images/logo-white.png";

import { IoMenuSharp } from "react-icons/io5";
import { LucideDownload, LucideRotateCcw } from "lucide-react";

import "@/ui/styles/organism/generateNavigation.organism.scss";

export default function GenerateNavigation({ locale }: { locale: string }) {
  const t = useTranslations("generate");
  const { resetModelPosition, handleSave } = useGenerator();
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  return (
    <motion.nav
      initial={{
        y: 10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      className="generate__navigation"
    >
      <Link href={"/"}>
        <Image src={logo} className="navigation-logo" alt="Mockify" />
      </Link>
      <GenerateDocumentTitle />

      <NavigationCtas locale={locale} />

      <Button
        className="mobile-cta"
        onClick={() => setIsOpenedMenu((prev) => !prev)}
        variant="editor"
      >
        <IoMenuSharp />
      </Button>

      <AnimatePresence>
        {isOpenedMenu && (
          <motion.div
            initial={{
              top: "100%",
              width: 0,
              height: 0,
              transformOrigin: "top right",
            }}
            animate={{
              top: "100%",
              width: "100%",
              height: "25rem",
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            className="mobile-nav"
          >
            <motion.div
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              className="mobile-nav__content"
            >
              <LanguagePicker variant={"editor"} locale={locale} />
            </motion.div>

            <motion.div
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              className="mobile-nav__content"
              style={{ display: "flex", gap: ".5rem" }}
            >
              <Button
                onClick={resetModelPosition}
                variant="editor"
                className="danger  model__reset-cta"
              >
                <p>{t("actions.reset")}</p>
                <LucideRotateCcw />
              </Button>
              <Button
                onClick={handleSave}
                variant="editor"
                className="download"
              >
                <p>{t("actions.download")}</p>
                <LucideDownload />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
