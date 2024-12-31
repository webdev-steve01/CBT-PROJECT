"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import eyes from "@/public/eye-svgrepo-com.svg";
import eyesClosed from "@/public/eye-closed-svgrepo-com.svg";
import { app } from "./firebase";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

interface messages {
  email: string;
  id: string;
  matric: string;
  password: string;
}

async function fetchDataFromFirestore(): Promise<messages[]> {
  const query = await getDocs(collection(db, "messages"));
  const data: messages[] = [];
  query.forEach((doc) => {
    const docData = doc.data();
    if (
      typeof docData.email === "string" &&
      typeof docData.matric === "string" &&
      typeof docData.password === "string"
    ) {
      data.push({
        id: doc.id,
        email: docData.email,
        matric: docData.matric,
        password: docData.password,
      });
    } else {
      console.warn(`Invalid data format in document ID: ${doc.id}`, docData);
    }
  });
  console.log(data);
  return data;
}

const auth = getAuth(app);
const LogIn = () => {
  type user = {
    matric: string;
    email: string;
    password: string;
  };
  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<Array<user>>([]);
  const [matric, setMatric] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [matricExport, setMatricExport] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }

    fetchData();
  }, []);

  const handleMatric = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatric(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    let foundEmail = "";
    for (const i in userData) {
      if (matric === userData[i].matric) {
        foundEmail = userData[i].email;
        break;
      }
    }

    if (!foundEmail) {
      alert("Matric number not found.");
      setLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, foundEmail, password)
      .then(() => {
        setLoading(false);
        // setMatricExport(matric);
        router.push("./Candidate");
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <section>
        <section className="flex flex-col gap-[1.5em]">
          <h1 className="font-bold text-[2em] text-center ">Login</h1>
          <p className="text-[#545563] text-[14px] text-center">
            Welcome back to your Bells University Student Exam Portal
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
            <div className="border border-solid border-[#C7C8D2] flex max-w-[400px] justify-between rounded-lg px-2">
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
            <label htmlFor="password" className="text-[#545563] text-[16px]">
              Password
            </label>
            <div className="border border-solid border-[#C7C8D2] flex max-w-[400px] justify-between rounded-lg px-2">
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
            className="bg-[#2F4156] text-white py-2 rounded-lg relative flex items-center justify-center"
            onClick={(e) => handleSubmit(e)}
          >
            {loading /* From Uiverse.io by mrhyddenn */
              ? "Loading..."
              : "Log in"}
          </button>
        </form>
      </section>
    </>
  );
};

export default LogIn;
