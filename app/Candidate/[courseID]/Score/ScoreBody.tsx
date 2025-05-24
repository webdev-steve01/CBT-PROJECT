"use client";
import { useEffect, useState } from "react";
import { useAnswerContext } from "../../context/AnswerContextLayout";
import { useParams } from "next/navigation";
import emailjs from "emailjs-com";

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

const sendEmail = async (
  userEmail: string,
  score: number,
  userName: string,
  exam: string,
  func: (boolean: boolean) => void
) => {
  func(true);
  try {
    const templateParams = {
      name: userName,
      email: userEmail,
      exam,
      score,
      date: new Date().toLocaleDateString(),
    };

    const result = await emailjs.send(
      "service_6u281gh",
      "template_bueii1y",
      templateParams,
      "Snxb-oa0ozpvJpf5O"
    );

    alert("Result sent to your email!");
    func(false);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const ScoreBody = () => {
  const [courses, setCourses] = useState<Exam[]>();
  const [currentCourse, setCurrentCourse] = useState<Exam>();
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);
  const params = useParams();
  const { answerValue } = useAnswerContext();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [otherEmail, setOtherEmail] = useState<string>("");
  const [isOtherEmail, setIsOtherEmail] = useState<boolean>(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    setUserEmail(storedEmail);
    setUserName(storedName);
  }, []);

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
  const values = Object.values(analysisResult);
  const correctCount = values.filter((value) => value === "Correct").length;

  if (!isOtherEmail) {
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
              onClick={() => {
                if (userEmail && userName) {
                  sendEmail(
                    userEmail,
                    correctCount,
                    userName,
                    currentCourse?.courseTitle || "",
                    setSending
                  );
                }
              }}
            >
              {sending ? "Sending..." : "Send to my email"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOtherEmail(true);
              }}
              className="border border-solid border-[#6D85FC] text-black font-semibold text-[1.5em] py-2 rounded-lg"
            >
              Send to another email
            </button>
          </section>
        </section>
      </div>
    );
  } else {
    return (
      <div className="flex w-[100vw] h-[100vh] items-center justify-center flex-col">
        <h1 className="font-bold text-[1.8em] text-center">
          Please enter an email to receive your result
        </h1>
        <p className="text-[1.1em] leading-loose max-w-[500px] text-center text-[#9f9fa7]">
          Please note your results will be sent here, contact us if anything
          goes wrong
        </p>
        <form action="">
          <div className="flex flex-col gap-4 py-4 min-w-[400px]">
            <input
              type="text"
              placeholder="name@example.com"
              onChange={(e) => setOtherEmail(e.target.value)}
              className="border border-solid border-[#ccc] p-2 rounded-lg "
            />
            <button
              type="submit"
              className="bg-[#2F4156] text-white font-semibold text-[1.5em] py-2 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                if (otherEmail && userName) {
                  sendEmail(
                    otherEmail,
                    correctCount,
                    userName,
                    currentCourse?.courseTitle || "",
                    setSending
                  );
                }
              }}
            >
              {sending ? "Sending..." : "Send to this email"}
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default ScoreBody;
