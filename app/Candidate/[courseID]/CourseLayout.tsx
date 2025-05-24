"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import next from "@/public/next-svgrepo-com.svg";
import prev from "@/public/back-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { questionContext } from "../context/courseContext";
import { useAnswerContext } from "../context/AnswerContextLayout";
import Link from "next/link";
import QuestionPage from "./questions/QuestionPage";

interface Exam {
  courseTitle: string; // Title of the course
  courseCode: string; // Code of the course
  examDuration: number; // Duration of the exam in minutes
  questions: Question[]; // Array of questions in the exam
}

// Define the Question interface
interface Question {
  id: number; // Unique identifier for the question
  question: string; // The text of the question
  imageUrls: string[]; // Array of images associated with the question
  options: Option[]; // Array of options for the question
  correctAnswers: string[]; // Correct answers (array, even if there is one correct answer)
  userAnswers: string[]; // User's selected answers (empty array initially)
  questionType: "single" | "boolean" | "multiple"; // Type of the question (single choice, boolean, or multiple choice)
}

// Define the Option interface for the answer options
interface Option {
  text: string; // Text for the option
  imageUrls: string[]; // Array of images for the option (can be multiple images)
}

export default function CourseLayout() {
  const params = useParams();
  const [courses, setCourse] = useState<Array<Exam>>([]);
  const [mainCourse, setMainCourse] = useState<Exam>();
  const [numbers, setNumbers] = useState<Array<number>>([0]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setQuestionNumber } = useContext(questionContext);
  const [length, setLength] = useState<number>();
  const { answerValue } = useAnswerContext();
  const [score, setScore] = useState<Array<number>>();

  useEffect(() => {
    const fetchData = () => {
      fetch("/Data.json")
        .then((res) => res.json()) // Ensure the parsed JSON is returned
        .then((data: Exam[]) => {
          setCourse(data); // `data` will now contain the parsed JSON

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Optional error handling
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      // alert("ahahhhh");
      for (let i = 0; i <= courses?.length - 1; i++) {
        if (
          typeof params.courseID === "string" && // Ensure params.courseID is a string
          params.courseID.toLowerCase() ===
            courses[i]?.courseCode?.toLowerCase() // Correct the method call
        ) {
          setMainCourse(courses[i]);
        }
      }
    }
  }, [courses, params.courseID]);

  const element: Array<Exam> = [];
  element.push(...courses); // Use spread operator to ensure correct type

  // access all the questions
  const questions = mainCourse?.questions;
  // console.log(questions);
  // console.log(answerValue);

  useEffect(() => {
    if (answerValue) {
      const objectLength = Object.keys(answerValue);
      setLength(objectLength.length);
      console.log(objectLength);
      const test: Array<number> = [];
      for (let i: number = 0; i <= objectLength.length - 1; i++) {
        test.push(Number(objectLength[i]));
        setScore(test);
      }
    }
  }, [answerValue]); // Only run when answerValue changes
  useEffect(() => {
    console.log(score);
  }, [score]);

  const numSets: Array<number> = [];
  useEffect(() => {
    if (questions) {
      for (let i: number = 1; i <= questions.length; i++) {
        numSets.push(i);
        setNumbers(numSets);
      }
    }
  }, [questions]);

  // console.log(numbers);

  const handleQuestionNumber = (num: number) => {
    setQuestionNumber(num);
    // console.log(que);
  };

  const pages = numbers.map((number: number) => {
    return (
      <div
        onClick={() => handleQuestionNumber(number)}
        key={number}
        className={`px-4 py-2 border border-solid border-[#F1F1F1] rounded-[100%] w-[35px] h-[35px] flex justify-center items-center cursor-default ${
          score?.includes(number)
            ? "bg-[#2F4156] text-white"
            : "bg-white text-black"
        }`}
      >
        {number}
      </div>
    );
  });

  if (mainCourse) {
    return (
      <section>
        <div className="border border-b-[#D1D1D1] py-4 px-8 flex justify-between ">
          <section>
            <p className="font-bold">Bells University, Ogun State</p>
            <p>Computer Based Test (CBT) Examiner Portal</p>
          </section>
          <section className="flex gap-6 items-center">
            <section className="text-black">
              <p>
                <span>{length ? length : "0"}</span> Answered out of{" "}
                <span>{mainCourse?.questions.length}</span>
              </p>
            </section>
            <section className="px-3 border rounded-full flex items-center bg-[#2F4156] text-white cursor-default">
              <Link href={`./${params.courseID}/Score`}>Submit</Link>
            </section>
          </section>
        </div>
        <section className="px-6 flex justify-between py-6">
          <section className="flex gap-4 self-start">
            {loading ? (
              "loading pages..."
            ) : (
              <section className="flex gap-4 flex-wrap max-w-[900px] ">
                <section className="border border-solid border-[#F1F1F1] rounded-[100%] w-[35px] h-[35px] flex justify-center items-center">
                  <Image src={prev} width={20} height={20} alt="previous" />
                </section>
                {pages}
                <section className="border border-solid border-[#F1F1F1] rounded-[100%] w-[35px] h-[35px] flex justify-center items-center">
                  <Image src={next} width={20} height={20} alt="previous" />
                </section>
              </section>
            )}
          </section>
          <section className="flex flex-col gap-4 relative">
            <section className="min-w-[350px] flex flex-col gap-3 px-6 border py-5 ">
              <p className="flex justify-between">
                <span>Course Code:</span>
                <span>
                  {loading ? (
                    <span className="w-[100px] h-[10px] bg-[#EAECEE]"></span>
                  ) : (
                    mainCourse?.courseCode
                  )}
                </span>
              </p>
              <p className="flex justify-between ">
                <span>Course Title:</span>
                <span>
                  {loading ? (
                    <span className="w-[100px] h-[10px] bg-[#EAECEE]"></span>
                  ) : (
                    mainCourse?.courseTitle
                  )}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Duration:</span>
                <span>
                  {loading ? (
                    <span className="w-[100px] h-[10px] bg-[#EAECEE]"></span>
                  ) : (
                    mainCourse?.examDuration
                  )}
                  {loading ? "" : " mins"}
                </span>
              </p>
            </section>
            <section className="min-w-[350px] flex flex-col px-6 border py-5 absolute top-[150px] gap-10 ">
              <section className="flex flex-col gap-4">
                <section>
                  <p className="font-bold">Student Details</p>
                  <p className="text-[10px]">
                    Please always confirm your details are correct
                  </p>
                </section>
                <section>
                  <p className="font-bold">2018/6990</p>
                  <p>Joel Ovienloba</p>
                </section>
              </section>
              <button
                type="button"
                className="border py-2 rounded-lg border-[#000000]"
              >
                Report A Problem
              </button>
            </section>
          </section>
        </section>

        <section className="max-w-[700px]">
          <QuestionPage />
        </section>
      </section>
    );
  }
  return <div>no course found</div>;
}
