"use client";
import React from "react";
import { db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const AddForm = () => {
  const [name, setName] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [college, setCollege] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  async function addExaminer(
    name: string,
    department: string,
    college: string,
    password: string
  ) {
    try {
      await addDoc(collection(db, "examiner"), {
        name: name,
        department: department,
        college: college,
        password: password,
      });
      alert("success");
    } catch (error) {
      alert(error);
    }
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDept = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDept(e.target.value);
  };
  const handleCollege = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollege(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addExaminer(name, dept, college, password);
  };
  return (
    <section className="px-10 text-[1.2em] ">
      <p className="font-bold py-4">Add new examiner</p>
      <form action="" className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <label htmlFor="name">Examiner Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-[#C7C8D2] px-4 py-1 rounded-lg "
            placeholder="John Doe"
            onChange={(e) => handleName(e)}
          />
        </section>
        <section className="flex flex-col gap-2">
          <label htmlFor="dept">Examiner Department</label>
          <input
            type="text"
            id="dept"
            name="dept"
            className="border border-[#C7C8D2] px-4 py-1 rounded-lg "
            placeholder="Computer Science"
            onChange={(e) => handleDept(e)}
          />
        </section>
        <section className="flex flex-col gap-2">
          <label htmlFor="college">Examiner College</label>
          <input
            type="text"
            id="college"
            name="college"
            className="border border-[#C7C8D2] px-4 py-1 rounded-lg "
            placeholder="COLNAS"
            onChange={(e) => handleCollege(e)}
          />
        </section>
        <section className="flex flex-col gap-2">
          <label htmlFor="college">Examiner Password</label>
          <input
            type="text"
            id="password"
            name="password"
            className="border border-[#C7C8D2] px-4 py-1 rounded-lg "
            placeholder="********"
            onChange={(e) => handlePassword(e)}
          />
        </section>

        <button
          type="submit"
          className="bg-[#2F4156] text-white py-2 rounded-lg relative flex items-center justify-center"
          onClick={(e) => handleSubmit(e)}
        >
          Create Examiner
        </button>
      </form>
    </section>
  );
};

export default AddForm;
