import { Link } from "@/navigation";
import Image from "next/image";

import logo from "@/public/images/logo-white.png";

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
          <Image src={logo} alt="Mockify" />
        </div>
        <p>
          V2.4.1 <span>- BETA</span>
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
              <Link target="_blank" href={"https://github.com/trifkee"}>
                GitHub
              </Link>
            </li>
            <li>
              <IoLogoLinkedin />
              <Link
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
