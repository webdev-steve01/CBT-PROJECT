"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type CorrectnessContextType = {
  correctness: Record<number, string>; // Question ID mapped to "Correct" or "Incorrect"
  setCorrectness: (id: number, status: string) => void;
};

const CorrectnessContext = createContext<CorrectnessContextType | undefined>(
  undefined
);

export const CorrectnessProvider = ({ children }: { children: ReactNode }) => {
  const [correctness, setCorrectnessState] = useState<Record<number, string>>(
    {}
  );

  const setCorrectness = (id: number, status: string) => {
    setCorrectnessState((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  return (
    <CorrectnessContext.Provider value={{ correctness, setCorrectness }}>
      {children}
    </CorrectnessContext.Provider>
  );
};

export const useCorrectnessContext = () => {
  const context = useContext(CorrectnessContext);
  if (!context) {
    throw new Error(
      "useCorrectnessContext must be used within a CorrectnessProvider"
    );
  }
  return context;
};
