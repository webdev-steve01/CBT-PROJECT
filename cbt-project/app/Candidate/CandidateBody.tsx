"use client";
import React from "react";
import Nav from "../components/Nav";
import frame from "@/public/frame.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
function CandidateBody() {
  const [course, setCourse] = useState<Array<Exam>>();
  const [loading, setLoading] = useState<boolean>(true);
  const placeholder = [1, 2, 3];

  useEffect(() => {
    const fetchData = () => {
      fetch("/Data.json")
        .then((res) => res.json()) // Ensure the parsed JSON is returned
        .then((data: Exam[]) => {
          setCourse(data); // `data` will now contain the parsed JSON
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching data:", error); // Optional error handling
        });
    };

    fetchData();
  }, []);

  const elements = course?.map((data: Exam, index: number) => {
    return (
      <div
        key={index}
        className="border border-[#EAECEE] py-2 rounded-lg max-w-[250px]  "
      >
        <section className="flex flex-col justify-between p-4 min-h-[200px]">
          <section className="flex flex-col gap-4">
            <section className="flex gap-6">
              <Image src={frame} width={20} height={20} alt="" />
              <p className="w-[200px] ">{data.courseCode}</p>
            </section>
            <p className="text-[0.9em] max-w-[350px] text-[#686868] ">
              {data.courseTitle}
            </p>
          </section>
          <Link href={`./Candidate/${data.courseCode}/`}>
            <p className="text-[#2F4156]">Get Started</p>
          </Link>
        </section>
      </div>
    );
  });
  const filler = placeholder.map((data: number) => {
    return (
      <div
        key={data}
        className="border border-[#EAECEE] py-2 rounded-lg max-w-[250px]  "
      >
        <section className="flex flex-col justify-between p-4 min-h-[200px]">
          <section className="flex flex-col gap-4">
            <section className="flex gap-6">
              <section className="w-[20px] h-[20px] bg-[#686868] "></section>
              <p className="w-[200px] bg-[#686868] rounded-md"></p>
            </section>
            <p className="text-[0.9em] w-[210px] h-[100px] text-[#686868] bg-[#686868] rounded-md "></p>
          </section>
          <Link href={""}>
            <p className="text-[#2F4156] w-[200px] h-[10px] bg-[#686868] rounded-md"></p>
          </Link>
        </section>
      </div>
    );
  });

  return (
    <div>
      <Nav />
      <section className="flex justify-between py-7 px-7">
        <section>
          <p className="font-bold text-[1.2em] py-2 ">
            Please select your examination, login and start immediately!
          </p>

          <section className="flex flex-wrap gap-4 py-6">
            {loading ? filler : elements}
          </section>
        </section>
        <section className="max-w-[400px] rules px-2 py-4">
          <p className="font-bold text-[1.2em] py-2 ">Examination Rules</p>
          <section className="grid gap-2 leading-loose">
            <div>
              1. The new CBT is split into two parts: Part A covers numeracy and
              Part B covers clinical questions for nursing or midwifery.
            </div>
            <div>
              2. The fee for sitting both parts of the new CBT will stay at £83.
              If you need to resit the new CBT, the following fees will apply.
            </div>
            <div>
              3. If you choose to take the Test of Competence for return to
              practice, you need to first book the Test of Competence in your
              NMC Online account.
            </div>
            <div>
              4. Once you get a confirmation email from Pearson Vue that your
              account has been created, you can log in, book and pay for your
              exam.
            </div>
            <div>5. Good luck!</div>
          </section>
        </section>
      </section>
    </div>
  );
}

export default CandidateBody;
