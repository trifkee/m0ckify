import { ChangeEvent, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";

import useModel from "@/ui/hooks/useModel.hook";

import Button from "../../atoms/Button.atom";

import { useGenerateImage } from "@/infrastructure/mutations/generate";

import { aiKeyAtom } from "@/lib/atoms/generator";
import { userAtom } from "@/lib/atoms/user";
import { AI_SERVICES } from "@/lib/constants/generator";
import { AIServiceType } from "@/lib/types/AI.types";

import { LucideInfo, LucideWand2, SquareArrowOutUpRight } from "lucide-react";

const promptLen = 30;

export default function Magicfy() {
  const t = useTranslations("generate");
  const router = useRouter();

  const { handleReadAIImage } = useModel();

  const [aiKey, setAiKey] = useRecoilState(aiKeyAtom);

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [service, setService] = useState(AI_SERVICES[0].name);

  const user = useRecoilValue(userAtom);

  const onSuccessGenerate = (data: any) => {
    const status = data?.data?.status;

    if (status !== 200) {
      setShowMoreOptions(true);
      return;
    }

    handleReadAIImage(
      data.data.image ??
        "https://utfs.io/f/iztaqYgynMhQzBXRYJM8PvFns3adbtMZODo29QJBS6yuWKL0"
    );
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

    generate({ prompt, aiKey, service: service as AIServiceType });
  };

  function handleChangeService(e: ChangeEvent<HTMLSelectElement>) {
    setService(e.target.value);
  }

  function getAPIUrl() {
    switch (service) {
      case "openai":
        return "https://platform.openai.com/api-keys";

      case "stability":
        return "https://platform.stability.ai/account/keys";

      case "stablediffusion":
        return "https://docs.getimg.ai/reference/introduction";

      default:
        return "#";
    }
  }

  return (
    <details open className="control user">
      <summary className="control__title">
        {t("magicfy.title")} <LucideWand2 />
      </summary>
      <div className="magic-container">
        <div className="control__section env select">
          <p className="title">AI Service</p>

          <select
            name="preset"
            onChange={handleChangeService}
            defaultValue={service}
          >
            {AI_SERVICES.map((ai) => {
              return (
                <option key={ai.id} value={ai.name}>
                  {ai.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="magic">
          <div className="control__section">
            <p className="title">{t("magicfy.title")}</p>
            {!showMoreOptions && (
              <>
                <AnimatePresence>
                  {data?.data?.message && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        x: -50,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.25,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: -50,
                        transition: {
                          duration: 0.25,
                        },
                      }}
                      className="title information"
                    >
                      {t(`magicfy.errors.${data?.data?.message}`)}
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="title additional-info">
                  {t("magicfy.errors.noSavingKeys")}
                  <LucideInfo />
                </p>

                <div
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <p className="title">{service.toUpperCase()} API Key</p>
                  <input
                    style={{
                      width: "100%",
                      marginTop: ".5rem",
                    }}
                    name="apiKey"
                    className="input"
                    placeholder={`${service.toUpperCase()} AI API KEY`}
                    value={aiKey}
                    onChange={(e) => setAiKey(e.target.value)}
                  />
                </div>

                <div>
                  <p style={{ marginBottom: ".25rem" }} className="title">
                    Don't have key?
                  </p>
                  <Link
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={getAPIUrl()}
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
