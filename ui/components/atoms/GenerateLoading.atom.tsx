"use client";

import { useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import Spinner from "./Spinner.atom";

import { isGeneratingAtom } from "@/lib/atoms/generator";

import logo from "@/public/images/logo-white.png";

import "@/ui/styles/atoms/generateLoading.atom.scss";

export default function GenerateLoading() {
  const isGenerateLoading = useRecoilValue(isGeneratingAtom);

  return (
    <>
      <AnimatePresence>
        {isGenerateLoading ? (
          <motion.main
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, delay: 3 },
            }}
            className="loading-model"
          >
            <div
              style={{ position: "relative", width: "12rem", height: "12rem" }}
            >
              <Image
                src={logo}
                layout="fill"
                objectFit="contain"
                alt="Mockify"
              />
            </div>
            <Spinner size="big" />
          </motion.main>
        ) : null}
      </AnimatePresence>
    </>
  );
}
