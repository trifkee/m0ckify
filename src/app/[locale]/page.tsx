"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import Image from "next/image";

import LanguagePicker from "@/ui/components/moleculs/LanguagePicker.molecul";

import { LucideChevronRight, LucideUser, X } from "lucide-react";

import logo from "@/public/images/logo-white.png";
import heroImage from "@/public/images/hero-image.png";
import bgImage from "@/public/images/bg.jpg";
import grids from "@/public/images/home-grid.png";

import "@/ui/styles/pages/home.page.scss";

const animateProps = {
  opacity: 1,
  scale: 1,
  rotateY: 0,
  rotateX: 0,
  rotateZ: 0,
  left: 0,
  bottom: 0,
};

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("home");

  const slicedTitle = t("title").split(" ");

  return (
    <>
      <div
        className="seo-block"
        style={{
          position: "absolute",
          visibility: "hidden",
        }}
      >
        <h1>product mockup free online</h1>
        <h2>how to do product mockup</h2>
        <h2>product mockup free</h2>
        <h2>product mockup generator</h2>
        <h2>product mockup tool</h2>
        <h2>how to do product mockup</h2>
      </div>
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
          <div className="logo">
            <Image className="logo" src={logo} alt="Mockify" />
          </div>

          <div className="ctas">
            <Link className="login" href={"/login"}>
              <LucideUser />
              Log in
            </Link>
            <LanguagePicker variant="editor" locale={locale} />
          </div>
        </motion.nav>

        <div className="home__header">
          <div className="info">
            <p className="title">
              {slicedTitle.map((n, i) => (
                <Fragment key={i}>
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
                  {(i + 1) % 2 === 0 ? (
                    <div style={{ height: "100%", width: "100%" }} />
                  ) : null}
                </Fragment>
              ))}
            </p>

            <article className="chips">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateY: 15,
                  rotateX: 50,
                  rotateZ: 25,
                  left: "-20%",
                  bottom: "-100%",
                }}
                animate={animateProps}
                transition={{ delay: 1 }}
                className="chip blue"
              >
                Multi-Language Support
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateY: 35,
                  rotateX: 20,
                  rotateZ: 55,
                  left: "-50%",
                  bottom: "150%",
                }}
                animate={animateProps}
                transition={{ delay: 1.25 }}
                className="chip orange"
              >
                Custom made models
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateY: 5,
                  rotateX: 100,
                  rotateZ: 50,
                  left: "0%",
                  bottom: "10%",
                }}
                animate={animateProps}
                transition={{ delay: 0.85 }}
                className="chip red"
              >
                Real Time Edit
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateY: 12,
                  rotateX: 20,
                  rotateZ: 95,
                  left: "-50%",
                  bottom: "-120%",
                }}
                animate={animateProps}
                transition={{ delay: 0.5 }}
                className="chip purple"
              >
                Dynamic 3D Preview
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateY: 25,
                  rotateX: 10,
                  rotateZ: 25,
                  left: "-0%",
                  bottom: "-100%",
                }}
                animate={animateProps}
                transition={{ delay: 1.25 }}
                className="chip black"
              >
                Lighting & Environment Controls
              </motion.div>
            </article>
          </div>

          <div className="hero">
            <Image src={heroImage} alt="" />
          </div>
        </div>

        <Link className="get-started" href={"/generate"}>
          {t("getStarted")}
          <LucideChevronRight />
        </Link>
        <div className="images">
          <Image src={grids} alt="" />
          <Image src={bgImage} alt="" />
        </div>
      </main>
    </>
  );
}
