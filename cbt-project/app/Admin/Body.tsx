import Card from "./components/Card";
import frame from "@/public/frame.svg";

// import Image from "next/image";
function Body() {
  return (
    <section className="my-[2.5em] px-8 ">
      <p className="py-8 font-bold text-[1.2em]">
        Welcome back, Joel Ovienloba!
      </p>
      <section className="flex gap-10">
        <Card
          title="Examiners & Admins"
          image={frame}
          body="Upload and manage examinations to be taken and written by students."
          link="./Admin/Examiner"
        />

        <Card
          title="Candidates"
          image={frame}
          body="Manage all candidates and handle all candidate related issues."
          link="./Admin/Examiner"
        />
        <Card
          title="Results"
          body="Manage and print all candidate results and manage all result related issues."
          image={frame}
          link="./Admin/Examiner"
        />
        <Card
          title="Your Profile"
          body="Manage your profile and all security / access related issues."
          image={frame}
          link="./Admin/Examiner"
        />
      </section>
    </section>
  );
}

export default Body;
