"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import LanguagePicker from "./LanguagePicker.molecul";

import { Link } from "@/i18n/routing";

import { LucideUser } from "lucide-react";

import "@/ui/styles/moleculs/navigation.molecul.scss";

export default function Navigation({ locale }: { locale: string }) {
  return (
    <motion.nav
      className="navigation"
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.5,
      }}
    >
      <div className="wrapper">
        <div className="logo">
          <Image
            width={200}
            height={200}
            className="logo"
            src="https://utfs.io/f/iztaqYgynMhQXx85JIkd6zTj9k0Rqr1sHcIoWt7YFQxwDNbE"
            alt="Product mockup generator Free - Mockify"
          />
        </div>

        <div className="ctas">
          <Link prefetch={false} className="login" href={"/login"}>
            <LucideUser />
            Log in
          </Link>
          <LanguagePicker variant="editor" locale={locale} />
        </div>
      </div>
    </motion.nav>
  );
}
