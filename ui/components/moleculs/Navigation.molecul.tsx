import "@/ui/styles/moleculs/navigation.molecul.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/public/images/logo-white.png";
import { Link } from "@/navigation";
import { LucideUser } from "lucide-react";
import LanguagePicker from "./LanguagePicker.molecul";

const animateProps = {
  opacity: 1,
  scale: 1,
  rotateY: 0,
  rotateX: 0,
  rotateZ: 0,
  left: 0,
  bottom: 0,
};

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
            className="logo"
            src={logo}
            alt="Product mockup generator Free - Mockify"
          />
        </div>

        <div className="ctas">
          <Link className="login" href={"/login"}>
            <LucideUser />
            Log in
          </Link>
          <LanguagePicker variant="editor" locale={locale} />
        </div>
      </div>
    </motion.nav>
  );
}
