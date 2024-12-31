"use client";
import { useState } from "react";
import Image from "next/image";
import eyes from "@/public/eye-svgrepo-com.svg";
import eyesClosed from "@/public/eye-closed-svgrepo-com.svg";
import { getAuth } from "firebase/auth";
import { app, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

type props = {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
};
const SignIn = (props: props) => {
  const [open, setOpen] = useState(false);
  const [matric, setMatric] = useState("0000/00000");
  const [email, setEmail] = useState("empty field");
  const [password, setPassword] = useState("empty field");

  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  async function addData(email: string, password: string, matric: string) {
    try {
      await addDoc(collection(db, "messages"), {
        password: password,
        email: email,
        matric: matric,
      });

      // alert(`document written with id: ${docRef.id}`);
    } catch (error) {
      alert(error);
      return false;
    }
  }
  const handleMatric = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatric(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        props.setUser(true);
        addData(email, password, matric);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <>
      <section>
        <section className="flex flex-col gap-[1.5em]">
          <h1 className="font-bold text-[2em] text-center ">Sign-up</h1>
          <p className="text-[#545563] text-[14px] text-center">
            Welcome to your Bells University Student Exam Portal
          </p>
        </section>

        <form action="" className="py-[2em] flex flex-col gap-6 min-w-[400px]">
          <div>
            <label
              htmlFor="matricNumber"
              className="text-[#545563] text-[16px]"
            >
              Matric Number
            </label>
            <div className="border border-solid border-[#C7C8D2] flex justify-between rounded-lg px-2">
              <input
                type="text"
                name=""
                id="matricNumber"
                placeholder="0000/00000"
                className="py-1 focus-within:outline-none w-[100%]"
                onChange={(e) => handleMatric(e)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-[#545563] text-[16px]">
              Email Address
            </label>
            <div className="border border-solid border-[#C7C8D2] flex justify-between rounded-lg px-2">
              <input
                type="email"
                name=""
                id="email"
                placeholder="johndoe@gmail.com"
                className="py-1 focus-within:outline-none w-[100%]"
                onChange={(e) => handleEmail(e)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-[#545563] text-[16px]">
              Password
            </label>
            <div className="border border-solid border-[#C7C8D2] flex justify-between rounded-lg px-2">
              <input
                type={open ? `text` : `password`}
                name=""
                id="password"
                placeholder="min of 6 characters"
                className="py-1 focus-within:outline-none w-[100%]"
                onChange={(e) => handlePassword(e)}
              />
              <Image
                src={open ? eyes : eyesClosed}
                height={20}
                width={20}
                alt=""
                onClick={handleOpen}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#2F4156] text-white py-2 rounded-lg"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
};

export default SignIn;
