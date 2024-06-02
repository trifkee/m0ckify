import "@/ui/styles/moleculs/nav.molecul.scss";
import Image from "next/image";
import logo from "@/public/vercel.svg";
import { Link } from "@/navigation";
import Button from "../atoms/Button.atom";

export default function Nav() {
  return (
    <nav>
      <Image src={logo} alt="mockify" />
      <div className="links">
        <Link href={"/"}>
          <Button variant="transparent">Home</Button>
        </Link>
        <Link href={"/generate"}>
          <Button variant="secondary">Generate!</Button>
        </Link>
      </div>
    </nav>
  );
}
