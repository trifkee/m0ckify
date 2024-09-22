"use client";

import { useTranslations } from "next-intl";
import Button from "@/ui/components/atoms/Button.atom";
import { Link } from "@/navigation";

import { motion } from "framer-motion";

import { IoLogIn, IoPersonCircleOutline } from "react-icons/io5";

import Image from "next/image";
import logo from "@/public/images/logo.svg";

import { IoArrowForwardSharp } from "react-icons/io5";

import LanguagePicker from "@/ui/components/moleculs/LanguagePicker.molecul";

import "@/ui/styles/pages/home.page.scss";
import { LucideUser, LucideUser2 } from "lucide-react";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("home");

  const slicedTitle = t("title").split(" ");

  return (
    <>
      <main className="home">
        <motion.nav
          className="navigation"
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
        >
          <Image className="logo" src={logo} alt="Mockify" />

          <div className="ctas">
            <Link className="login" href={"/login"}>
              <LucideUser />
              Log in
            </Link>
            <LanguagePicker variant="editor" locale={locale} />
          </div>
        </motion.nav>

        <section className="home__header">
          <p className="title">
            {slicedTitle.map((n, i) => (
              <motion.span
                initial={{
                  y: -10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                key={i}
              >
                {n}
              </motion.span>
            ))}
          </p>

          <motion.div
            className="ctas"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
            }}
          >
            {/* <Button className="learn-more" variant="editor">
            {t("learnMore")}
            </Button> */}
            <Link href={"/generate"}>
              <Button className="get-started" variant="editor">
                {t("getStarted")} <IoArrowForwardSharp />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}
