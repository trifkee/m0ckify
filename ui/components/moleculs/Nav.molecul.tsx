"use client";

import { useState } from "react";

import "@/ui/styles/moleculs/nav.molecul.scss";

export default function Nav() {
  const [isOpened, setIsOpened] = useState(false);

  return <nav className={`nav-menu ${isOpened ? "opened" : ""}`}></nav>;
}
