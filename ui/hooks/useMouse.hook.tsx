"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { contextMenuAtom } from "@/lib/atoms/global";

export default function useMouse() {
  const [contextMenu, setContextMenu] = useRecoilState(contextMenuAtom);

  function handleClick(e: any) {
    // Check if context menu is shown and if the click is outside the menu
    if (contextMenu.shown && e.target.id !== "context-menu") {
      setContextMenu((prev) => ({
        ...prev,
        shown: false,
      }));
    }
  }

  function handleRightClick(e: MouseEvent) {
    e.preventDefault();

    setContextMenu({
      position: {
        x: e.pageX,
        y: e.pageY,
      },
      shown: true,
    });
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleRightClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  return {};
}
