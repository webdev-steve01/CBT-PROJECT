"use client";

import { createContext, useContext, ReactNode, useState } from "react";

// Define the shape of the context value
interface AnswerContextType {
  answerValue: Record<number, string[]>; // Object with number keys and array of strings as values
  setAnswerValue: (value: Record<number, string[]>) => void; // Function to update answerValue
}

// Create the context with a default value (can be null)
const AnswerContext = createContext<AnswerContextType | null>(null);

// Create a provider component
export const AnswerProvider = ({ children }: { children: ReactNode }) => {
  const [answerValue, setAnswerValue] = useState<Record<number, string[]>>({}); // Default value is an empty object

  return (
    <AnswerContext.Provider value={{ answerValue, setAnswerValue }}>
      {children}
    </AnswerContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAnswerContext = () => {
  const context = useContext(AnswerContext);
  if (!context) {
    throw new Error("useAnswerContext must be used within an AnswerProvider");
  }
  return context;
};
