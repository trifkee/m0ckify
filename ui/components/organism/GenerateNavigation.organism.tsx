"use client";

import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/navigation";

import GenerateDocumentTitle from "@/ui/components/moleculs/GenerateDocumentTItle.moleculs";
import LanguagePicker from "@/ui/components/moleculs/LanguagePicker.molecul";
import Button from "@/ui/components/atoms/Button.atom";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import { userAtom } from "@/lib/atoms/user";

import logo from "@/public/images/logo-white.png";

import { IoMenuSharp } from "react-icons/io5";
import {
  LucideDownload,
  LucideLogIn,
  LucideLogOut,
  LucideRotateCcw,
} from "lucide-react";

import "@/ui/styles/organism/generateNavigation.organism.scss";
import useUser from "@/ui/hooks/useUser.hook";

export default function GenerateNavigation({ locale }: { locale: string }) {
  const t = useTranslations("generate");
  const { resetModelPosition, handleSave } = useGenerator();
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  const { handleLogout } = useUser();

  const user = useRecoilValue(userAtom);

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

      <div className="gen-ctas">
        {user ? (
          <Button onClick={handleLogout} variant="editor" className="danger">
            <LucideLogOut />
          </Button>
        ) : (
          <Link href={"/login"}>
            <Button variant="editor" className="download">
              <LucideLogIn />
            </Button>
          </Link>
        )}
        <LanguagePicker variant={"editor"} locale={locale} />
      </div>

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
