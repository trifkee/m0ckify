"use client";

import useSaveProject from "../hooks/useSaveProject.hook";

export default function SaveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSaveProject();

  return children;
}
