"use client";

import { useContext } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Spinner from "./Spinner.atom";

import Context from "@/ui/providers/ContextProvider.provider";

import logo from "@/public/images/logo-white.png";

import "@/ui/styles/atoms/generateLoading.atom.scss";

export default function GenerateLoading() {
  const { isGenerateLoading } = useContext(Context);

  return (
    <>
      <AnimatePresence>
        {isGenerateLoading && (
          <motion.main
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, delay: 2 },
            }}
            className="loading-model"
          >
            <Image src={logo} alt="Mockify" />
            <Spinner size="big" />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
