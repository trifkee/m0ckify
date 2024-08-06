import React from "react";
import { useTranslations } from "next-intl";

import {
  AiOutlineCloudDownload,
  AiOutlineFileAdd,
  AiOutlineBgColors,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";

import "@/ui/styles/moleculs/controls.molecul.scss";
import "@/ui/styles/atoms/control.atom.scss";

export default function Controls() {
  const t = useTranslations("generate");

  return (
    <article className="controls">
      <Control>
        <p>{t("controls.upload")}</p>
        <AiOutlineFileAdd />
      </Control>
      <Control>
        <p>{t("controls.more")}</p>
        <AiOutlineAppstoreAdd />
      </Control>
      <Control>
        <p>{t("controls.bg")}</p>
        <AiOutlineBgColors />
      </Control>
      <Control>
        <p>{t("controls.download")}</p>
        <AiOutlineCloudDownload />
      </Control>
    </article>
  );
}

function Control({ children }: { children: React.ReactNode }) {
  return <div className="single-control">{children}</div>;
}
