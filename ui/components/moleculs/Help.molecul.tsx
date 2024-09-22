"use client";

import { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Context from "@/ui/providers/ContextProvider.provider";

import Button from "../atoms/Button.atom";

import { IoClose } from "react-icons/io5";
import {
  LucideBox,
  LucideCamera,
  LucideLightbulb,
  LucideRotate3D,
} from "lucide-react";

import "@/ui/styles/moleculs/helpModal.molecul.scss";

export default function HelpModal() {
  const { showHelp, setShowHelp } = useContext(Context);

  const handleCloseModal = () => {
    setShowHelp(false);
  };

  return (
    showHelp && (
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
              <h2>Help</h2>
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
                  <p>Move Camera</p>
                  <p>
                    To move your camera to desired position use right click on
                    the mouse.
                  </p>
                </div>
              </div>

              <div className="item">
                <div className="icon">
                  <LucideRotate3D />
                </div>
                <div className="text">
                  <p>Rotate Model</p>
                  <p>
                    By default rotating is disabled. You can enable this feature
                    by clicking icon on the right side of the canvas.
                  </p>
                </div>
              </div>

              <div className="item">
                <div className="icon">
                  <LucideLightbulb />
                </div>
                <div className="text">
                  <p>Lights</p>
                  <p>
                    Empower your model by tweaking light and/or adding new
                    sources for lighting in side navigation.
                  </p>
                </div>
              </div>

              <div className="item">
                <div className="icon">
                  <LucideBox />
                </div>
                <div className="text">
                  <p>Choose Model</p>
                  <p>
                    Pick desired model for your mockup. We'll bring more soon ⭐
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div onClick={handleCloseModal} className="backdrop"></div>
        </motion.article>
      </AnimatePresence>
    )
  );
}
