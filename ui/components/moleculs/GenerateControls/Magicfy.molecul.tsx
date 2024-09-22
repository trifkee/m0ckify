import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

import Button from "../../atoms/Button.atom";

import { useGenerateImage } from "@/infrastructure/mutations/generate";

import { openAiKeyAtom } from "@/lib/atoms/generator";
import { userAtom } from "@/lib/atoms/user";

import { LucideInfo, LucideWand2 } from "lucide-react";

import mockifyImage from "@/public/images/bg.jpg";

const promptLen = 30;

export default function Magicfy({
  handleReadAIImage,
}: {
  handleReadAIImage: CallableFunction;
}) {
  const t = useTranslations("generate");
  const router = useRouter();
  const [openAiKey, setOpenAiKey] = useRecoilState(openAiKeyAtom);

  const [prompt, setPrompt] = useState("");

  const user = useRecoilValue(userAtom);

  const onSuccessGenerate = (data: any) => {
    handleReadAIImage(data.data.imgUrl ? data.data.imgUrl : mockifyImage);
  };

  const {
    mutate: generate,
    isPending: isGenerating,
    data,
  } = useGenerateImage(onSuccessGenerate);

  const handleGenerate = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    generate({ prompt, openAiKey });
  };

  return (
    <details open className="control user">
      <summary className="control__title">
        {t("magicfy.title")} <LucideWand2 />
      </summary>
      <div className="magic-container">
        <div className="magic">
          <div className="control__section">
            <p className="title">{t("magicfy.title")}</p>
            {data?.data.status === 500 && (
              <>
                <p className="title information">
                  {true || data?.data.message ? (
                    data?.data.message
                  ) : (
                    <>
                      {t("magicfy.errors.noCredit.0")}
                      <br />
                      <br />
                      {t("magicfy.errors.noCredit.1")}
                    </>
                  )}
                </p>

                <p className="title additional-info">
                  {t("magicfy.errors.noSavingKeys")}
                  <LucideInfo />
                </p>
                <input
                  className="input"
                  placeholder="OPEN AI API KEY"
                  value={openAiKey}
                  onChange={(e) => setOpenAiKey(e.target.value)}
                />
              </>
            )}
            <textarea
              className="magic-input"
              placeholder={t("magicfy.generateDescription")}
              disabled={isGenerating}
              value={isGenerating ? "I am generating, please wait..." : prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {!isGenerating && (
            <Button
              disabled={prompt.length < promptLen}
              onClick={handleGenerate}
              className={`magic ${prompt.length < promptLen && "disabled"}`}
              variant="editor"
            >
              {t("magicfy.cta")}
              <LucideWand2 />
            </Button>
          )}
        </div>
      </div>
    </details>
  );
}
