"use client";
import React from "react";
import { useState } from "react";
import { questionContext } from "./courseContext";

const CourseContextLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  return (
    <div>
      <questionContext.Provider value={{ questionNumber, setQuestionNumber }}>
        {children}
      </questionContext.Provider>
    </div>
  );
};

export default CourseContextLayout;
