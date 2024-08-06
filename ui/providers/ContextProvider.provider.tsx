"use client";

import { ModelType } from "@/types/model.type";
import { createContext, useState } from "react";
import fallbackImage from "@/public/images/fallback.jpg";

const Context = createContext<any>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [model, setModel] = useState<ModelType>({
    position: {
      x: 0,
      y: 0,
    },
    image: fallbackImage.src as any,
  });

  return (
    <Context.Provider
      value={{
        model,
        setModel,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
