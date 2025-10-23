"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
function Page() {
  return (
    <div className="overflow-y-hidden">
      <h1>Signup Page</h1>
      <div className="grid bg-signup  md:bg-none grid-cols-1 md:grid-cols-2">
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2 }}
          initial={{ opacity: 0, scale: 0.8, y: 730 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-4/5 ml-[2rem] bg-white md:ml-2 md:w-full border h-screen"
        >
          <h1 className="text-center text-3xl md:text-4xl lg:text-5xl mt-10">
            Create an Account
          </h1>
          <p className="text-center ml-[4rem] mt-2 md:text-2xl w-[60%] md:w-[80%] md:ml-[2rem] xl:ml-[5rem]">
            to be able to see live chart or trade crypto is here
          </p>

          <form className=" space-y-4  py-5 px-4">
            <div>
              <label htmlFor="username" className="md:text-2xl">
                Username:
              </label>
              <input
                type="text"
                id="text"
                name="username"
                className="border relative top-4 py-1 lg:top-8 md:py-4 xl:py-1 left-2 w-[80%] translate-x-[1rem] lg:translate-x-[20px] xl:translate-x-[-6rem]"
                required
              />
            </div>
            <div className="mt-[1rem] lg:mt-[3rem]">
              <label htmlFor="email" className="md:text-2xl">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border relative top-10 py-1 md:py-4 xl:py-1 left-2 w-[80%] translate-x-[-2rem] md:translate-x-[-45px] xl:translate-x-[-3rem]"
                required
              />
            </div>
            <div className="mt-[3rem]">
              <label htmlFor="password" className="md:text-2xl">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border relative top-4 xl:top-10 py-1 md:py-4 xl:py-1 left-2 w-[80%] translate-x-[1rem] md:translate-x-[20px] xl:translate-x-[-6rem]"
                required
              />
            </div>
            <div className="mt-[2rem] xl:mt-[3rem]">
              <label htmlFor="confirmPassword" className="md:text-2xl">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border relative top-4 xl:top-3 py-1 md:py-4 xl:py-1 left-2 w-[80%] translate-x-[1rem] md:translate-x-[20px] xl:translate-x-[1rem]"
                required
              />
            </div>
            <button type="submit" className="p-5 border bg-black text-white">
              Signup
            </button>
          </form>
        </motion.div>
        <div className="bg-signups">
          <h1>hello world</h1>
        </div>
      </div>
    </div>
  );
}

export default Page;
