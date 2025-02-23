"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";

import { LucideGlobe } from "lucide-react";

import "@/ui/styles/moleculs/languagePicker.molecul.scss";

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
          <LucideGlobe />

          {type === "full" && <p>{lang?.name}</p>}
        </div>
      )}
      <div className="langs">
        {languages
          .filter((lang: LanguageType) => lang?.locale !== locale)
          .map((lang: LanguageType, i: number) => (
            <Link
              prefetch={false}
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

const languages = [
  {
    id: 0,
    name: "Srpski",
    locale: "sr",
  },
  {
    id: 1,
    name: "English",
    locale: "en",
  },
  {
    id: 2,
    name: "Deutsch",
    locale: "de",
  },
  {
    id: 3,
    name: "Français",
    locale: "fr",
  },
  {
    id: 4,
    name: "Русский",
    locale: "ru",
  },
  {
    id: 5,
    name: "中文",
    locale: "ch",
  },
  {
    id: 6,
    name: "Türkçe",
    locale: "tr",
  },
];
