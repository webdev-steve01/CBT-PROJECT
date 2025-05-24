"use client";
import React, { useState, useEffect, useContext } from "react";
import { questionContext } from "../../context/courseContext";
import { useAnswerContext } from "../../context/AnswerContextLayout";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Exam {
  courseTitle: string;
  courseCode: string;
  examDuration: number;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  imageUrls: string[];
  options: Option[];
  correctAnswers: string[];
  userAnswers: string[];
  questionType: "single" | "boolean" | "multiple";
}

interface Option {
  text: string;
  imageUrls: string[];
}

const QuestionPage = () => {
  const [courses, setCourses] = useState<Exam[]>();
  const [currentCourse, setCurrentCourse] = useState<Exam>();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string[] }>(
    {}
  );

  const { questionNumber } = useContext(questionContext);
  const { answerValue, setAnswerValue } = useAnswerContext();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/Data.json")
        .then((res) => res.json())
        .then((data) => setCourses(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (courses) {
      const foundCourse = courses.find(
        (course) => course.courseCode === params.courseID
      );
      setCurrentCourse(foundCourse);
    }
  }, [courses, params.courseID]);

  useEffect(() => {
    if (currentCourse) {
      const foundQuestion = currentCourse.questions.find(
        (q) => q.id === questionNumber
      );
      setCurrentQuestion(foundQuestion || null);
    }
  }, [currentCourse, questionNumber]);

  // Handle answer selection for single and multiple-choice questions
  const handleAns = (value: string, questionId: number, isSingle: boolean) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };

      if (isSingle) {
        // For single choice, replace the answer array with the new value
        updatedAnswers[questionId] = [value];
      } else {
        // For multiple choice, toggle the value in the array
        const currentAnswers = updatedAnswers[questionId] || [];
        if (currentAnswers.includes(value)) {
          updatedAnswers[questionId] = currentAnswers.filter(
            (ans) => ans !== value
          );
        } else {
          updatedAnswers[questionId] = [...currentAnswers, value];
        }
      }

      return updatedAnswers;
    });
  };
  // console.log(userAnswers);

  useEffect(() => {
    setAnswerValue(userAnswers);
    // console.log(answerValue);
  }, [userAnswers, answerValue, setAnswerValue]);
  const options = currentQuestion?.options.map((option, index) => {
    const isChecked =
      userAnswers[currentQuestion.id]?.includes(option.text) || false;

    return (
      <section key={index}>
        <section className="flex gap-2">
          <input
            type={
              currentQuestion?.questionType === "single" ||
              currentQuestion?.questionType === "boolean"
                ? "radio"
                : "checkbox"
            }
            name={`opt${currentQuestion?.id}`}
            id={`opt${index}`}
            value={option.text}
            checked={isChecked}
            onChange={() =>
              handleAns(
                option.text,
                currentQuestion?.id as number,
                currentQuestion?.questionType === "single" ||
                  currentQuestion?.questionType === "boolean"
              )
            }
          />
          <label htmlFor={`opt${index}`}>{option.text}</label>
        </section>
        <section>
          {option.imageUrls.map((image, idx) => (
            <Image
              key={idx}
              src={image}
              alt={`Option ${index + 1}`}
              width={100}
              height={100}
            />
          ))}
        </section>
      </section>
    );
  });

  return (
    <div className="px-6">
      <section className="font-bold text-[1.2em]">
        {loading ? "Loading question..." : currentQuestion?.question}
      </section>
      <section className="flex flex-col gap-4">
        {loading ? "Loading options..." : options}
      </section>
    </div>
  );
};

export default QuestionPage;
