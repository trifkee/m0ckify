"use client";

import { createContext, useState } from "react";

const Context = createContext<any>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [modelPosition, setModelPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <Context.Provider
      value={{
        modelPosition,
        setModelPosition,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
