import { Link } from "@/navigation";
import GenerateDocumentTitle from "../moleculs/GenerateDocumentTItle.moleculs";

import logo from "@/public/images/logo-white.svg";
import Image from "next/image";
import LanguagePicker from "../moleculs/LanguagePicker.molecul";

export default function GenerateNavigation({ locale }: { locale: string }) {
  return (
    <nav className="generate__navigation">
      <Link href={"/"}>
        <Image src={logo} alt="Mockify" />
      </Link>
      {/* <Link href={"/"}>Mockify</Link>
      <p>/</p> */}
      <GenerateDocumentTitle />
      <LanguagePicker variant={"editor"} locale={locale} />
    </nav>
  );
}
