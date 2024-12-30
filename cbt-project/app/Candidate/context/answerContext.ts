import { createContext, Dispatch, SetStateAction } from "react";

// Define the shape of the context value
interface AnswerContextType {
  answerValue: Record<number, string[]>; // Object with number keys and string[] values
  setAnswerValue: Dispatch<SetStateAction<Record<number, string[]>>>; // Function to update answerValue
}

// Initialize the context with a default value
export const answerContext = createContext<AnswerContextType>({
  answerValue: {}, // Default value for answerValue
  setAnswerValue: () => {}, // No-op default function
});
