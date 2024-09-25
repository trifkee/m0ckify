import { useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";
import Image from "next/image";

import useUser from "@/ui/hooks/useUser.hook";

import { userAtom } from "@/lib/atoms/user";

import { LucideLogOut, LucideUser2 } from "lucide-react";

import mockifyImage from "@/public/images/bg.jpg";
import Button from "../../atoms/Button.atom";

export default function User() {
  const t = useTranslations("generate");
  const user = useRecoilValue(userAtom);

  const { handleLogout } = useUser();

  return (
    user && (
      <details className="control user">
        <summary className="control__title">
          {t("user.title")} <LucideUser2 />
        </summary>
        <div className="user-container">
          <div className="user">
            <Image src={mockifyImage} alt={user?.username ?? ""} />
            <p>{user?.username}</p>
          </div>
          <div className="logout">
            <Button className="danger" variant="editor" onClick={handleLogout}>
              {t("user.logout")} <LucideLogOut />
            </Button>
          </div>
        </div>
      </details>
    )
  );
}
