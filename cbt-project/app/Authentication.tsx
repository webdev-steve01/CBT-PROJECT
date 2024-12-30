"use client";
import React from "react";
import { useState } from "react";
import LogIn from "./LogIn";
import SignIn from "./SignUp";
const Authentication = () => {
  const [previousUser, setPreviousUser] = useState<boolean>(false);
  const handleClick = () => {
    if (previousUser) {
      setPreviousUser(false);
    } else {
      setPreviousUser(true);
    }
  };
  return (
    <div>
      {previousUser ? <LogIn /> : <SignIn setUser={setPreviousUser} />}

      <section className="flex justify-center">
        <section className="flex items-center gap-3">
          <p>Sign up</p>
          <div
            onClick={handleClick}
            className={
              previousUser
                ? `border border-solid py-1 px-[0.1em] bg-[#2F4156] w-[30px] h-[12px] flex items-center rounded-xl justify-end `
                : `border border-solid py-1 px-[0.1em] bg-[#2F4156] w-[30px] h-[12px] flex items-center rounded-xl justify-start `
            }
          >
            <div className="rounded-full w-[10px] h-[10px] bg-white"></div>
          </div>
          <p>Log In</p>
        </section>
      </section>
    </div>
  );
};

export default Authentication;
