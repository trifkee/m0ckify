"use client";

import { useRecoilState } from "recoil";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../atoms/Button.atom";

import { helpAtom } from "@/lib/atoms/generator";

import { IoClose } from "react-icons/io5";
import {
  LucideBox,
  LucideCamera,
  LucideLightbulb,
  LucideRotate3D,
} from "lucide-react";

import "@/ui/styles/moleculs/helpModal.molecul.scss";
import { useTranslations } from "next-intl";

export default function HelpModal() {
  const t = useTranslations("help");
  const [showHelp, setShowHelp] = useRecoilState(helpAtom);

  const handleCloseModal = () => {
    setShowHelp(false);
  };

  return showHelp ? (
    <AnimatePresence mode="wait">
      <motion.article
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.5,
          },
        }}
        exit={{
          opacity: 0,
        }}
        className="help-modal"
      >
        <div className="modal">
          <div className="modal__title">
            <h2>{t("title")}</h2>
            <Button
              className="danger"
              variant="editor"
              onClick={handleCloseModal}
            >
              <IoClose />
            </Button>
          </div>

          <div className="modal__body">
            <div className="item">
              <div className="icon">
                <LucideCamera />
              </div>
              <div className="text">
                <p>{t("camera.title")}</p>
                <p>{t("camera.text")}</p>
              </div>
            </div>

            <div className="item">
              <div className="icon">
                <LucideRotate3D />
              </div>
              <div className="text">
                <p>{t("rotate.title")}</p>
                <p>{t("rotate.text")}</p>
              </div>
            </div>

            <div className="item">
              <div className="icon">
                <LucideLightbulb />
              </div>
              <div className="text">
                <p>{t("lights.title")}</p>
                <p>{t("lights.text")}</p>
              </div>
            </div>

            <div className="item">
              <div className="icon">
                <LucideBox />
              </div>
              <div className="text">
                <p>{t("model.title")}</p>
                <p>{t("model.text")}</p>
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleCloseModal} className="backdrop"></div>
      </motion.article>
    </AnimatePresence>
  ) : null;
}
