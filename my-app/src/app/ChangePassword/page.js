"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { set } from "zod/mini";
import { auth } from "../Component/Firebase";
function Page() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChangePassword = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    if (newPassword !== confirmNewpassword) {
      setError("the new password and the confirm password do not match");
      return;
    }
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setMessage("password as been updated successfully");
        setCurrentPassword("");
        setConfirmNewPassword("");
        setNewPassword("");
        router.push("/Login");
      } else {
        setError(" no user is currently sign in");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("an unknown error occurred");
      }
    }
  };

  return (
    <div className=" bg-signups">
      <h1 className="mt-5"> change Password</h1>
      <div className=" w-full h-screen flex bg-signup  justify-center items-center ">
        <div className="shadow-2xl top-1/2 -translate-y-[40%] bg-white  xl:-translate-y-[20%] xl:top-[60%] border-2 p-2 md:p-4 lg:p-6 border-black rounded-2xl mt-16 w-3/4 md:w-8/12 xl:w-1/2 h-fit ">
          <form onSubmit={handleChangePassword} className=" space-y-4  py-5">
            <div>
              <label htmlFor="current Password" className="ml-[1rem] text-[20px] md:text-2xl ">
                current password:
              </label>
              <input
                type="currentPassword"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border relative top-8 md:top-4 lg:top-10 xl:top-6 py-2 md:py-4 xl:py-2 left-2 w-[80%] translate-x-[1rem] md:translate-x-[2rem] lg:translate-x-[3rem] xl:translate-x-[3rem]"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <div className="mt-12 lg:mt-24 xl:mt-12">
              <label htmlFor="newPassword" className="ml-[1rem] text-[20px]  md:text-2xl ">
                newPassword:
              </label>
              <input
                type="newPassword"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                 className="border relative top-6 md:top-4 lg:top-10 xl:top-6 py-2 md:py-4 xl:py-2 left-2 w-[80%] translate-x-[1rem] md:translate-x-[2rem] lg:translate-x-[3rem] xl:translate-x-[3rem]"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <div className="mt-16 md:mt-[3rem] lg:mt-[5rem] xl:mt-[3rem]">
              <label htmlFor="confirmNewpassword" className=" ml-[1rem] text-[20px] md:text-2xl  ">
                confirmNewpassword:
              </label>
              <input
                type="confirmNewpassword"
                id="confirmNewpassword"
                name="confirmNewpassword"
                value={confirmNewpassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="border relative top-8 py-2 md:py-4 xl:py-2 md:top-4 lg:top-10 left-2 w-[80%] translate-x-[.8rem] md:translate-x-[2rem] lg:translate-x-[3rem]"
                required
              />
            </div>
            {error && <p className="text-red-500 text-md">{error}</p>}
            {message && <p className="text-green-500 text-md">{message}</p>}
            <button
              type="submit"
              className="bg-blue-500 mt-14 text-white text-center justify-center items-center flex py-2 px-4 rounded"
            >
              change
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
