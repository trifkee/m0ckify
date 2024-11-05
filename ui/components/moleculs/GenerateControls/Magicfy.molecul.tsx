import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

import Button from "../../atoms/Button.atom";

import { useGenerateImage } from "@/infrastructure/mutations/generate";

import { aiKeyAtom } from "@/lib/atoms/generator";
import { userAtom } from "@/lib/atoms/user";

import { LucideInfo, LucideWand2, SquareArrowOutUpRight } from "lucide-react";

import mockifyImage from "@/public/images/bg.jpg";
import Link from "next/link";

const promptLen = 30;

export default function Magicfy({
  handleReadAIImage,
}: {
  handleReadAIImage: CallableFunction;
}) {
  const t = useTranslations("generate");
  const router = useRouter();
  const [aiKey, setAiKey] = useRecoilState(aiKeyAtom);

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [prompt, setPrompt] = useState("");

  const user = useRecoilValue(userAtom);

  const onSuccessGenerate = (data: any) => {
    const status = data?.data?.status;

    if (status === 401 || status === 500) {
      setShowMoreOptions(true);
      return;
    }

    handleReadAIImage(data.data.image ?? mockifyImage);
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

    generate({ prompt, aiKey });
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
            {showMoreOptions && (
              <>
                <p className="title information">
                  {data?.data.message ? (
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

                <div
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <p className="title">Stability API Key</p>
                  <input
                    style={{
                      width: "100%",
                      marginTop: ".5rem",
                    }}
                    name="apiKey"
                    className="input"
                    placeholder="STABILITY AI API KEY"
                    value={aiKey}
                    onChange={(e) => setAiKey(e.target.value)}
                  />
                </div>

                <div>
                  <p style={{ marginBottom: ".25rem" }} className="title">
                    Don't have key?
                  </p>
                  <Link
                    href="https://platform.stability.ai/account/keys"
                    className="title error"
                  >
                    <Button variant="editor">
                      {t("magicfy.getApiKey")}
                      <SquareArrowOutUpRight />
                    </Button>
                  </Link>
                </div>
              </>
            )}
            <textarea
              className="magic-input"
              placeholder={t("magicfy.generateDescription")}
              disabled={isGenerating}
              value={isGenerating ? t("magicfy.generatingMessage") : prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <Button
            disabled={prompt.length < promptLen || isGenerating}
            onClick={handleGenerate}
            className={`magic ${
              (prompt.length < promptLen || isGenerating) && "disabled"
            }`}
            variant="editor"
          >
            {t("magicfy.cta")}
            <LucideWand2 />
          </Button>
        </div>
      </div>
    </details>
  );
}
