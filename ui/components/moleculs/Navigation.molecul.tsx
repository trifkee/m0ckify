"use client";
import { motion } from "framer-motion";
import LanguagePicker from "@/ui/components/moleculs/LanguagePicker.molecul";
import { Link } from "@/navigation";
import logo from "@/public/images/logo-white.png";
import Image from "next/image";
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
      <Link href={"/"} className="logo">
        <Image
          className="logo"
          src={logo}
          alt="Product mockup generator Free - Mockify"
        />
      </Link>

      <div className="ctas">
        <Link className="login" href={"/login"}>
          <LucideUser />
          Log in
        </Link>
        <LanguagePicker variant="editor" locale={locale} />
      </div>
    </motion.nav>
  );
}
