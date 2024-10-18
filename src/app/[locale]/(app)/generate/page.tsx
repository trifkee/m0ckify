import dynamic from "next/dynamic";

import GenerateModel from "@/ui/components/organism/GenerateModel.organism";
import GenerateControls from "@/ui/components/organism/GenerateControls.organism";
import GenerateNavigation from "@/ui/components/organism/GenerateNavigation.organism";
import GenerateObjects from "@/ui/components/organism/GenerateObjects.organism";

import GenerateLoading from "@/ui/components/atoms/GenerateLoading.atom";

import "@/ui/styles/pages/generate.page.scss";

const LazyHelpModal = dynamic(
  () => import("@/ui/components/moleculs/Help.molecul"),
  {
    loading: () => null,
  }
);

export default function Generate({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <LazyHelpModal />
      <GenerateLoading />
      <main className="generate">
        <GenerateNavigation locale={locale} />
        <GenerateModel />
        <GenerateControls />
        <GenerateObjects />
      </main>
    </>
  );
}
