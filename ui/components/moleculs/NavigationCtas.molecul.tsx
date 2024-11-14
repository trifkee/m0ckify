import { useRecoilValue } from "recoil";
import { Link } from "@/i18n/routing";

import LanguagePicker from "./LanguagePicker.molecul";
import Button from "../atoms/Button.atom";

import useUser from "@/ui/hooks/useUser.hook";

import { userAtom } from "@/lib/atoms/user";

import { LucideLogIn, LucideLogOut } from "lucide-react";

export default function NavigationCtas({ locale }: { locale: string }) {
  const { handleLogout } = useUser();

  const user = useRecoilValue(userAtom);

  return (
    <div className="gen-ctas">
      {user ? (
        <Button onClick={handleLogout} variant="editor" className="danger">
          <LucideLogOut />
        </Button>
      ) : (
        <Link prefetch={false} href={"/login"}>
          <Button variant="editor" className="download">
            <LucideLogIn />
          </Button>
        </Link>
      )}
      <LanguagePicker variant={"editor"} locale={locale} />
    </div>
  );
}
