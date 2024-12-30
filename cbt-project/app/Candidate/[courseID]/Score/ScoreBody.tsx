"use client";
import { useEffect, useState } from "react";
import { useAnswerContext } from "../../context/AnsweContextLayout";
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
const ScoreBody = () => {
  const [courses, setCourses] = useState<Exam[]>();
  const [currentCourse, setCurrentCourse] = useState<Exam>();
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const { answerValue } = useAnswerContext();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/Data.json")
        .then((res) => res.json())
        .then((data) => {
          setCourses(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
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

  const analyzeAnswers = (
    answerValue: { [key: number]: string[] },
    questions: Question[]
  ) => {
    const result: Record<number, string> = {};

    if (answerValue) {
      Object.entries(answerValue).forEach(([questionNumber, userAnswer]) => {
        const question = questions.find(
          (q) => q.id === parseInt(questionNumber, 10)
        );

        if (question) {
          // Compare user's answer with the specific question's correct answers
          const isCorrect =
            JSON.stringify(userAnswer.sort()) ===
            JSON.stringify(question.correctAnswers.sort());
          result[question.id] = isCorrect ? "Correct" : "Incorrect";
        } else {
          result[parseInt(questionNumber, 10)] = "Question not found";
        }
      });
    }

    return result;
  };

  const analysisResult = analyzeAnswers(
    answerValue,
    currentCourse?.questions || []
  );
  console.log(analysisResult);
  const values = Object.values(analysisResult);

  // Filter for 'Correct' values
  const correctCount = values.filter((value) => value === "Correct").length;

  // console.log("Number of correct answers:", correctCount);

  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center flex-col">
      <section>
        <p className="font-bold text-[2em] text-center">Well Done!</p>
        <p className="text-[24px] leading-loose max-w-[500px] text-center text-[#9f9fa7]">
          Your exam has been submitted successfully. You scored:
        </p>
        <p className="text-center text-[3em]">
          {loading ? (
            "getting score"
          ) : (
            <span>
              {correctCount} / {currentCourse?.questions.length}
            </span>
          )}
        </p>
        <section className="flex flex-col gap-4 py-4">
          <button
            type="button"
            className="bg-[#2F4156] text-white font-semibold text-[1.5em] py-2 rounded-lg"
          >
            Email result to me
          </button>
          <button
            type="button"
            className="border border-solid border-[#6D85FC] text-black font-semibold text-[1.5em] py-2 rounded-lg"
          >
            Send to another email
          </button>
        </section>
      </section>
    </div>
  );
};

export default ScoreBody;
