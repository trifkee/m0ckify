import { Link } from "@/navigation";
import GenerateDocumentTitle from "../moleculs/GenerateDocumentTItle.moleculs";

export default function GenerateNavigation() {
  return (
    <nav className="generate__navigation">
      <Link href={"/"}>Mockify</Link>
      <p>/</p>
      <GenerateDocumentTitle />
    </nav>
  );
}
