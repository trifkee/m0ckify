"use client";

import { Link } from "@/navigation";
import GenerateDocumentTitle from "../moleculs/GenerateDocumentTItle.moleculs";

import { AnimatePresence, motion } from "framer-motion";

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
                <IoSyncSharp />
              </Button>
              <Button
                onClick={handleSave}
                variant="editor"
                className="download"
              >
                <p>{t("actions.download")}</p>
                <IoSaveSharp />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
