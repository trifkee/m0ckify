"use client";
import { Link, usePathname } from "@/navigation";
import { useEffect, useState } from "react";

// import { StaticImageData } from "next/image";

// import srbFlag from "@/public/flags/FlagSerbia.png";
// import engFlag from "@/public/flags/FlagUK.png";
// import geFlag from "@/public/flags/FlagGermany.png";
// import frFlag from "@/public/flags/FlagFrance.png";

import "@/ui/styles/moleculs/languagePicker.molecul.scss";
// import "@/ui/styles/components/languagePicker/LanguagePicker.atom.scss";
// import { usePathname, Link } from "@/navigation";
// import { axiosBaseInstance } from "@/infrastructure/services/instances/axiosBaseInstance";

// import { usePathname } from "next/navigation";
// import Link from "next/link";

const languages = [
  {
    id: 0,
    name: "Srpski",
    locale: "sr",
    // img: srbFlag,
  },
  {
    id: 1,
    name: "English",
    locale: "en",
    // img: engFlag,
  },
  {
    id: 2,
    name: "Deutsch",
    locale: "de",
    // img: geFlag,
  },
  {
    id: 3,
    name: "Français",
    locale: "fr",
    // img: frFlag,
  },
];

type LanguageType =
  | {
      id: number;
      name: string;
      locale: string;
    }
  | undefined;

export default function LanguagePicker({
  locale,
  type = "full",
  variant,
}: {
  type?: "sm" | "full";
  locale: string;
  variant?: "editor";
}) {
  const [lang, setLang] = useState<LanguageType | null>(null);
  const path = usePathname();

  const currLang = () =>
    setLang(languages.find((lang) => lang.locale === locale));

  useEffect(() => {
    currLang();
  }, []);

  return (
    <article className={`lang-picker ${type} ${variant}`}>
      {lang && (
        <div className="current lang">
          {type === "full" && <p>{lang?.name}</p>}
        </div>
      )}
      <div className="langs">
        {languages
          .filter((lang: LanguageType) => lang?.locale !== locale)
          .map((lang: LanguageType, i: number) => (
            <Link
              href={path}
              locale={lang?.locale ?? ("sr" as any)}
              key={i}
              className="lang"
            >
              <p>{lang?.name}</p>
            </Link>
          ))}
      </div>
    </article>
  );
}
