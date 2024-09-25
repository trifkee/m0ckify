"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

import { AnimatePresence, motion } from "framer-motion";

import CanvasModel from "../components/moleculs/CanvasModel.molecul";
import Button from "../components/atoms/Button.atom";

import { RenderType } from "@/lib/types/model.type";

import {
  LucideFilePlus2,
  LucideHelpCircle,
  LucideRotate3D,
} from "lucide-react";
import { helpAtom, isGeneratingAtom, renderAtom } from "@/lib/atoms/generator";

import "@/ui/styles/providers/modelProvider.provider.scss";
import useGenerator from "../hooks/useGenerator.hook";
import { useTranslations } from "next-intl";
// import useMouse from "../hooks/useMouse.hook";
import ContextMenu from "../components/moleculs/ContextMenu.molecul";

export default function ModelProvider() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("generate");

  const [freeroam, setFreeroam] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const setRender = useSetRecoilState(renderAtom);
  const setShowHelp = useSetRecoilState(helpAtom);
  const setIsLoading = useSetRecoilState(isGeneratingAtom);

  const {
    handleDraggedImage,
    handleSave,
    resetModelPosition,
    handleImageChange,
  } = useGenerator();
  // useMouse();

  useEffect(() => {
    setIsLoading(false);
    setRender((prev: RenderType) => ({
      ...prev,
      w: parentRef.current?.clientWidth as number,
      h: parentRef.current?.clientHeight as number,
    }));
  }, []);

  // Handle drag enter
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragging(true); // Show the drop zone when dragging starts
  };

  // Handle drag leave
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragging(false); // Hide the drop zone when dragging leaves the area
  };

  // Handle drag over to allow the drop
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
    handleDraggedImage(e);
  };

  return (
    <>
      {/* <ContextMenu
        handleSave={handleSave}
        handleImageChange={handleImageChange}
        resetModelPosition={resetModelPosition}
      /> */}
      <div
        className="model"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        id="canvasModel"
        ref={parentRef}
      >
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.25 },
              }}
              transition={{ duration: 0.25 }}
              className="image-dnd"
            >
              <div className="zone">
                <LucideFilePlus2 />
                <p>{t("dropImage")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Suspense fallback={null}>
          <div className="additional-ctas">
            <Button
              className={`freeroam ${freeroam ? "y" : "n"}`}
              onClick={() => setFreeroam((prev) => !prev)}
              variant="editor"
            >
              <LucideRotate3D />
            </Button>

            <Button
              variant="editor"
              onClick={() => setShowHelp(true)}
              className="help"
            >
              <LucideHelpCircle />
            </Button>
          </div>
          <CanvasModel freeroam={freeroam} />
        </Suspense>
      </div>
    </>
  );
}
