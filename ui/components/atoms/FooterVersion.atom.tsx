"use client";

import { useFetchGithubAppVersion } from "@/infrastructure/queries/useGithub";

export default function FooterVersion() {
  const { data } = useFetchGithubAppVersion();

  return (
    <p>
      {data?.[0]?.name && `${data?.[0]?.name} - `} <span>BETA</span>
    </p>
  );
}
