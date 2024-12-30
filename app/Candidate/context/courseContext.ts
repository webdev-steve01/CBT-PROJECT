import { createContext, Dispatch, SetStateAction } from "react";

// Define the context value shape
interface QuestionContextType {
  questionNumber: number; // Current question number
  setQuestionNumber: Dispatch<SetStateAction<number>>; // Function to update questionNumber
}

// Create the context with default values
export const questionContext = createContext<QuestionContextType>({
  questionNumber: 0, // Default question number
  setQuestionNumber: () => {}, // Default no-op function
});
