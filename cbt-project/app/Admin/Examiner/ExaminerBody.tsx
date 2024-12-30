"use client";
import Link from "next/link";
import { db } from "@/app/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
const ExaminerBody = () => {
  const [data, setData] = useState<propData[]>([]);
  type propData = {
    name: string;
    id: string;
    college: string;
    department: string;
  };
  async function fetchDataFromFirestore(): Promise<propData[]> {
    const querySnapshot = await getDocs(collection(db, "examiner"));
    const data: propData[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...(doc.data() as Omit<propData, "id">) });
    });
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setData(data);
      console.log(data);
    }

    fetchData();
  }, []);

  const newElements = data.map((value: propData, index: number) => {
    return (
      <tr key={index}>
        <td>{value.name}</td>
        <td>{value.department}</td>
        <td>{value.college}</td>
        <td>view details</td>
      </tr>
    );
  });
  return (
    <section className="px-10 py-10">
      <section className="flex justify-between">
        <p>Manage Examiners</p>
        <button type="button" className="bg-[#2F4156] px-4 py-2 rounded-full ">
          <Link href="/Admin/Examiner/Add">
            <p className="text-white ">Add new examiner</p>
          </Link>
        </button>
      </section>

      <table className="w-[100%] my-10 ">
        <thead>
          <tr className="tr">
            <th>Examiner&apos;s Names</th>
            <th>Departments</th>
            <th>College</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{newElements}</tbody>
      </table>
    </section>
  );
};

export default ExaminerBody;
