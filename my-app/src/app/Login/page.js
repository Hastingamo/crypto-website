"use client";
import React from "react";
import Image from "next/image";

function Page() {
  return (
    <div className="overflow-hidden">
      <h1>Login Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="w-4/5 ml-[2rem] md:ml-2 md:w-full border h-screen">
          <h1 className="text-center text-3xl md:text-4xl lg:text-5xl mt-14 lg:mt-28 xl:mt-10" >
            Welcome Back
          </h1>
          <p className="text-center ml-[4rem] mt-2 md:text-2xl w-[60%] md:w-[80%] md:ml-[2rem] xl:ml-[5rem]">
            the best place to see live chart or trade crypto is here
          </p>
          <form className=" space-y-4  py-5">
            <div>
              <label htmlFor="email" className="ml-[1rem] md:text-2xl ">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border relative top-8 md:top-4 lg:top-16 xl:top-10 py-2 md:py-4 xl:py-2 left-2 w-[80%] translate-x-[-3rem] md:translate-x-[2rem] lg:translate-x-[-3rem]"
                required
              />
            </div>
            <div className="mt-[3rem] md:mt-[3rem] lg:mt-[5rem] xl:mt-[3rem]">
              <label htmlFor="password" className=" ml-[1rem] ">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border relative py-2 md:py-4 xl:py-2 md:top-4 lg:top-14 left-2 w-[80%] translate-x-[.8rem] md:translate-x-[2rem] lg:translate-x-[-3rem]"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white text-center justify-center items-center flex py-2 px-4 rounded">
              Login
            </button>
          </form>
        </div>
        <div className="bg-signup ">
          <h1>hello world</h1>
        </div>
      </div>
    </div>
  );
}
export default Page;

