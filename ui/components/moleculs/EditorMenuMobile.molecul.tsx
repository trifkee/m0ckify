import { useTranslations } from "next-intl";
import {
  IoFlashlight,
  IoImageSharp,
  IoSunnySharp,
  IoTvSharp,
} from "react-icons/io5";

export default function EditorMenuMobile() {
  const t = useTranslations("generate");

  return (
    <div className="generate__controls-mobile">
      <div className="control">
        <p className="control__title">
          <IoImageSharp /> {t("image.title")}
        </p>
      </div>
      <div className="control">
        <p className="control__title">
          <IoTvSharp /> {t("model.title")}
        </p>
      </div>
      <div className="control">
        <p className="control__title">
          <IoSunnySharp /> {t("environment.title")}
        </p>
      </div>
      <div className="control">
        <p className="control__title">
          <IoFlashlight /> {t("lights.title")}
        </p>
      </div>
    </div>
  );
}
