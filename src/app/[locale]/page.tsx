"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Image from "next/image";

import Button from "@/ui/components/atoms/Button.atom";
import Footer from "@/ui/components/atoms/Footer.atom";
import Navigation from "@/ui/components/moleculs/Navigation.molecul";

import { LucideChevronRight, LucidePencilRuler } from "lucide-react";

import bgImage from "@/public/images/bg.jpg";
import grids from "@/public/images/home-grid.png";

import phoneImage from "@/public/images/phones.png";
import noise from "@/public/images/noise.png";

import "@/ui/styles/pages/home.page.scss";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("home");

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
        <h2>Mockify - Free 3D online mockup generator</h2>
        <h2>how to do product mockup</h2>
        <h2>product mockup free</h2>
        <h2>product mockup generator</h2>
        <h2>product mockup tool</h2>
        <h2>how to do product mockup</h2>
      </div>
      <main className="home">
        <Navigation locale={locale} />
        <section className="home__main">
          <div className="heading">
            <div className="text">
              <h1>{t("title")}</h1>
              <p>{t("subtitle")}</p>
            </div>
            <Link href={"/generate"}>
              <Button variant="editor" className="danger">
                {t("getStarted")}
                <LucidePencilRuler />
              </Button>
            </Link>

            <div className="images">
              <Image alt="noise" className="noise-texture" src={noise} />
              <Image src={grids} alt="product mockup free online" />
              <Image
                src={bgImage}
                alt="Mockify - Free 3D online mockup generator"
              />
            </div>
          </div>

          <div className="grid web">
            {/* ---- */}
            <div className="grid-item empty"></div>
            <div className="grid-item">
              <p>{t("cards.lang.title")}</p>
              <span>{t("cards.lang.subtitle")}</span>
            </div>
            <div className="grid-item image">
              <Image className="phones" src={phoneImage} alt="mockify" />
            </div>
            <div className="grid-item empty"></div>
            <div className="grid-item empty"></div>
            <div className="grid-item red">
              <p>{t("cards.lights.title")}</p>
              <span>{t("cards.lights.subtitle")}</span>
            </div>
            <div className="grid-item purple">
              <p>{t("cards.edit.title")}</p>
              <span>{t("cards.edit.subtitle")}</span>
            </div>
            <div className="grid-item empty"></div>
            <div className="grid-item empty"></div>
            <div className="grid-item black">
              <p>{t("cards.renders.title")}</p>
              <span>{t("cards.renders.subtitle")}</span>
            </div>
            <div className="grid-item">
              <p>{t("cards.models.title")}</p>
              <span>{t("cards.models.subtitle")}</span>
            </div>
            <div className="grid-item">
              <p>{t("cards.layers.title")}</p>
              <span>{t("cards.layers.subtitle")}</span>
            </div>
            <div className="grid-item empty "></div>
            {/* --- */}
            <div className="grid-item empty last-row"></div>
            <div className="grid-item cta last-row">
              <Link href={"/generate"}>
                <Button variant="editor" className="danger">
                  {t("getStarted")}
                  <LucideChevronRight />
                </Button>
              </Link>
            </div>
            <div className="grid-item empty last-row"></div>
          </div>

          <div className="grid mobile">
            {/* -- */}

            <div className="grid-item empty"></div>
            <div className="grid-item">
              <p>{t("cards.lang.title")}</p>
              <span>{t("cards.lang.subtitle")}</span>
            </div>
            <div className="grid-item empty"></div>

            <div className="grid-item empty"></div>
            <div className="grid-item image">
              <Image className="phones" src={phoneImage} alt="mockify" />
            </div>
            <div className="grid-item empty"></div>

            <div className="grid-item empty"></div>
            <div className="grid-item red">
              <p>{t("cards.lights.title")}</p>
              <span>{t("cards.lights.subtitle")}</span>
            </div>
            <div className="grid-item empty"></div>

            <div className="grid-item empty"></div>
            <div className="grid-item purple">
              <p>{t("cards.edit.title")}</p>
              <span>{t("cards.edit.subtitle")}</span>
            </div>
            <div className="grid-item empty"></div>

            <div className="grid-item empty"></div>
            <div className="grid-item black">
              <p>{t("cards.renders.title")}</p>
              <span>{t("cards.renders.subtitle")}</span>
            </div>
            <div className="grid-item empty"></div>

            <div className="grid-item empty"></div>
            <div className="grid-item">
              <p>{t("cards.models.title")}</p>
              <span>{t("cards.models.subtitle")}</span>
            </div>
            <div className="grid-item empty"></div>

            <div className="grid-item empty"></div>
            <div className="grid-item">
              <p>{t("cards.layers.title")}</p>
              <span>{t("cards.layers.subtitle")}</span>
            </div>
            <div className="grid-item empty"></div>

            <div className="grid-item empty"></div>
            <div className="grid-item cta last-row">
              <Link href={"/generate"}>
                <Button variant="editor" className="danger">
                  {t("getStarted")}
                  <LucideChevronRight />
                </Button>
              </Link>
            </div>
            <div className="grid-item empty"></div>
            {/* -- */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
