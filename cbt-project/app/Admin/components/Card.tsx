import Image from "next/image";
import Link from "next/link";
type props = {
  title: string;
  body: string;
  image: string;
  link: string;
};
export default function Card(props: props) {
  return (
    <div className="border border-[#EAECEE] py-2 rounded-lg max-w-[300px]  ">
      <section className="flex flex-col justify-between p-4 min-h-[200px]">
        <section className="flex flex-col gap-4">
          <section className="flex gap-6">
            <Image src={props.image} width={20} height={20} alt="" />
            <p className="w-[200px] ">{props.title}</p>
          </section>
          <p className="text-[0.9em] max-w-[350px] text-[#686868] ">
            {props.body}
          </p>
        </section>
        <Link href={props.link}>
          <p className="text-[#2F4156]">Get Started</p>
        </Link>
      </section>
    </div>
  );
}
