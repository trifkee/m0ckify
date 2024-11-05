"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

import useGenerator from "../hooks/useGenerator.hook";
import useMouse from "../hooks/useMouse.hook";

import CanvasModel from "../components/moleculs/CanvasModel.molecul";
import Button from "../components/atoms/Button.atom";
import ContextMenu from "../components/moleculs/ContextMenu.molecul";

import { RenderType } from "@/lib/types/model.type";

import {
  helpAtom,
  isGeneratingAtom,
  layersTabMobileAtom,
  pivotControlsAtom,
  pivotEnabledControlsAtom,
  renderAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";

import {
  LucideFilePlus2,
  LucideHelpCircle,
  LucideLayers,
  LucideRotate3D,
  Maximize,
  Move,
  Move3dIcon,
  RefreshCw,
  Scale3d,
} from "lucide-react";

import "@/ui/styles/providers/modelProvider.provider.scss";

export default function ModelProvider() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("generate");

  const [freeroam, setFreeroam] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [isLayer, setIsLayer] = useRecoilState(layersTabMobileAtom);

  const [pivotControls, setPivotControls] = useRecoilState(pivotControlsAtom);
  const setRender = useSetRecoilState(renderAtom);
  const setShowHelp = useSetRecoilState(helpAtom);
  const setIsLoading = useSetRecoilState(isGeneratingAtom);
  const [pivotControlsEnabled, setPivotControlsEnabled] = useRecoilState(
    pivotEnabledControlsAtom
  );
  const selectedLayer = useRecoilValue(selectedLayerAtom);

  function handleEnabledPivotControls(
    key: "move" | "scale" | "rotate" | "axes"
  ) {
    setPivotControlsEnabled((prev) => ({
      ...prev,
      [key]: !pivotControlsEnabled[key],
    }));
  }

  const {
    handleDraggedImage,
    handleSave,
    resetModelPosition,
    handleImageChange,
  } = useGenerator();
  useMouse();

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
      <ContextMenu
        handleSave={handleSave}
        handleImageChange={handleImageChange}
        resetModelPosition={resetModelPosition}
      />
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
            <div
              className="top"
              style={{ display: "flex", gap: ".5rem", flexDirection: "column" }}
            >
              <Button
                className={`freeroam ${freeroam ? "y" : "n"}`}
                onClick={() => setFreeroam((prev) => !prev)}
                variant="editor"
              >
                <LucideRotate3D />
              </Button>
              <Button
                className={`freeroam ${pivotControls ? "y" : "n"}`}
                onClick={() => setPivotControls((prev) => !prev)}
                variant="editor"
              >
                <Move3dIcon />
              </Button>
              <Button
                variant="editor"
                onClick={() => setIsLayer((prev) => !prev)}
                className={`freeroam editor-layers-cta ${isLayer ? "y" : "n"}`}
              >
                <LucideLayers />
              </Button>
              {/* <Button
                className={`freeroam ${sliders ? "y" : "n"}`}
                onClick={() => setSliders((prev) => !prev)}
                variant="editor"
              >
                <LucideSettings2 style={{ transform: "rotate(90deg)" }} />
              </Button> */}
            </div>

            <Button
              variant="editor"
              onClick={() => setShowHelp(true)}
              className="help"
            >
              <LucideHelpCircle />
            </Button>
          </div>

          <AnimatePresence>
            {selectedLayer && pivotControls && (
              <div className="additional-ctas left" style={{ left: "1rem" }}>
                <div
                  className="top"
                  style={{
                    display: "flex",
                    gap: ".5rem",
                    flexDirection: "column",
                  }}
                >
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: "-100%",
                      opacity: 0,
                    }}
                    transition={{
                      delay: 0.01,
                    }}
                  >
                    <Button
                      variant="editor"
                      className={`freeroam ${
                        !pivotControlsEnabled.move ? "y" : "n"
                      }`}
                      onClick={() => handleEnabledPivotControls("move")}
                    >
                      <Move />
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: "-100%",
                      opacity: 0,
                    }}
                    transition={{
                      delay: 0.05,
                    }}
                  >
                    <Button
                      variant="editor"
                      className={` freeroam ${
                        !pivotControlsEnabled.rotate ? "y" : "n"
                      }`}
                      onClick={() => handleEnabledPivotControls("rotate")}
                    >
                      <RefreshCw />
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: "-100%",
                      opacity: 0,
                    }}
                    transition={{
                      delay: 0.1,
                    }}
                  >
                    <Button
                      variant="editor"
                      className={`freeroam ${
                        !pivotControlsEnabled.scale ? "y" : "n"
                      }`}
                      onClick={() => handleEnabledPivotControls("scale")}
                    >
                      <Scale3d />
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: "-100%",
                      opacity: 0,
                    }}
                    transition={{
                      delay: 0.15,
                    }}
                  >
                    <Button
                      variant="editor"
                      className={`freeroam ${
                        !pivotControlsEnabled.axes ? "y" : "n"
                      }`}
                      onClick={() => handleEnabledPivotControls("axes")}
                    >
                      <Maximize />
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>
          {/* <AnimatePresence>
            {selectedLayer && pivotControls && (
              <div className="top-left controls">
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: "-100%",
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0,
                  }}
                >
                  <Button
                    variant="editor"
                    className={`freeroam ${
                      !pivotControlsEnabled.move ? "y" : "n"
                    }`}
                    onClick={() => handleEnabledPivotControls("move")}
                  >
                    <Move />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: "-100%",
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0.05,
                  }}
                >
                  <Button
                    variant="editor"
                    className={` freeroam ${
                      !pivotControlsEnabled.rotate ? "y" : "n"
                    }`}
                    onClick={() => handleEnabledPivotControls("rotate")}
                  >
                    <RefreshCw />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: "-100%",
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                >
                  <Button
                    variant="editor"
                    className={`freeroam ${
                      !pivotControlsEnabled.scale ? "y" : "n"
                    }`}
                    onClick={() => handleEnabledPivotControls("scale")}
                  >
                    <Scale3d />
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: "-100%",
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                >
                  <Button
                    variant="editor"
                    className={`freeroam ${
                      !pivotControlsEnabled.axes ? "y" : "n"
                    }`}
                    onClick={() => handleEnabledPivotControls("axes")}
                  >
                    <Maximize />
                  </Button>
                </motion.div>
              </div>
            )}
          </AnimatePresence> */}
          <CanvasModel freeroam={freeroam} />
        </Suspense>
      </div>
    </>
  );
}
