import { Link } from "@/i18n/routing";
import Image from "next/image";

import { LucideMoveUpRight } from "lucide-react";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

import "@/ui/styles/atoms/footer.atom.scss";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="top">
        <div className="logo">
          <Image
            width={200}
            height={200}
            src="https://utfs.io/f/iztaqYgynMhQXx85JIkd6zTj9k0Rqr1sHcIoWt7YFQxwDNbE"
            alt="Mockify"
          />
        </div>
        <p>
          V2.5.0 <span>- BETA</span>
        </p>
      </div>

      <div className="middle">
        <article className="section">
          <p>{t("sitemap.title")}</p>
          <ul>
            <li>
              <LucideMoveUpRight />
              <Link href={"/generate"}>{t("sitemap.generate")}</Link>
            </li>
          </ul>
        </article>

        <article className="section">
          <p>{t("links.title")}</p>
          <ul>
            <li>
              <IoLogoGithub />
              <Link
                prefetch={false}
                rel="noopener noreferrer"
                target="_blank"
                href={"https://github.com/trifkee"}
              >
                GitHub
              </Link>
            </li>
            <li>
              <IoLogoLinkedin />
              <Link
                prefetch={false}
                rel="noopener noreferrer"
                target="_blank"
                href={"https://www.linkedin.com/in/lazartrifunovic/"}
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </article>
      </div>

      <div className="bottom">
        <p>
          © {new Date().getFullYear()} {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
