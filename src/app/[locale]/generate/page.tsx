import GenerateModel from "@/ui/components/organism/GenerateModel.organism";
import GenerateControls from "@/ui/components/organism/GenerateControls.organism";
import GenerateNavigation from "@/ui/components/organism/GenerateNavigation.organism";

import "@/ui/styles/pages/generate.page.scss";

export default function Generate() {
  return (
    <main className="generate">
      <GenerateNavigation />
      <GenerateModel />
      <GenerateControls />
    </main>
  );
}
