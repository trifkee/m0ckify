"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEventHandler, useRef } from "react";
import { useTranslations } from "next-intl";

import Button from "../atoms/Button.atom";

import { LucideDownload, LucideImage, LucideXCircle } from "lucide-react";
import { renderAtom } from "@/lib/atoms/generator";
import { contextMenuAtom } from "@/lib/atoms/global";
import { IoSyncSharp } from "react-icons/io5";

import "@/ui/styles/moleculs/contextMenu.molecul.scss";

export default function ContextMenu({
  handleSave,
  handleImageChange,
}: // resetModelPosition,
{
  handleImageChange: ChangeEventHandler<HTMLInputElement>;
  // resetModelPosition: CallableFunction;
  handleSave: CallableFunction;
}) {
  const t = useTranslations("generate");
  const contextRef = useRef<HTMLDivElement | null>(null);

  const [context, setContex] = useRecoilState(contextMenuAtom);
  const render = useRecoilValue(renderAtom);

  return (
    <AnimatePresence>
      {context.shown && (
        <motion.div
          id="context-menu"
          ref={contextRef}
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "fit-content",
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          className="context-menu"
          style={{
            top: `${context.position.y}px`,
            left: `${context.position.x}px`,
            display: context.shown ? "flex" : "none",
          }}
        >
          <div className="heading">
            <p>Quick Actions</p>
            <Button
              onClick={() =>
                setContex((prev) => ({
                  ...prev,
                  shown: false,
                }))
              }
              variant="editor"
              className="danger"
            >
              <LucideXCircle />
            </Button>
          </div>
          <div className="actions">
            <Button variant="editor">
              <p>{t("image.add")}</p>
              <LucideImage />

              <input
                onChange={handleImageChange}
                className="add-file"
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
              />
            </Button>

            <Button
              // onClick={resetModelPosition}
              variant="editor"
              className="danger  model__reset-cta"
            >
              <p>{t("actions.reset")}</p>
              <IoSyncSharp />
            </Button>
            <Button
              onClick={() =>
                handleSave({
                  type: render.type,
                  w: render.w,
                  h: render.h,
                })
              }
              variant="editor"
              className="download"
            >
              <p>{t("actions.download")}</p>
              <LucideDownload />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
