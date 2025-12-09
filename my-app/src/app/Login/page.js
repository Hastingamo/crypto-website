"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../Component/Firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Loader from "../Component/Loading";
import Button from "../Component/sumbit";

function Page() {
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; 

    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      await setDoc(userDocRef, {
        userId: user.uid,
        email: user.email || "",
        userName: user.displayName || "",
      });
    }

    console.log("Google login successful!");

  } catch (err) {
    console.log("Google Login Error:", err.message);
  }
};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Router = useRouter();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  //   event.preventDefault();
  //   setError(null);
  //   setMessage(null);

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;
  //     if (user.emailVerified) {
  //       const registrationData = localStorage.getItem("registrationData");
  //       const { email: storedEmail = "", password = "", userName = "" } = registrationData ? JSON.parse(registrationData) : {};
  //       const userDoc = await getDoc(doc(db, "users", user.uid));
  //       if (!userDoc.exists()) {
  //         await setDoc(doc(db, "users", user.uid), {
  //           password: password,
  //           email: user.email || storedEmail,
  //           userName : userName,
  //         });
  //            localStorage.removeItem("registrationData");
  //       }
  //       setMessage("Login successful!");
  //       alert("login successful")
  //       Router.push("/Dashboard");
  //     } else {
  //       // setError("Please verify your email before logging in.");
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setError(error.message);
  //     } else {
  //       setError("an unknown error occurred");
  //     }
  //   }
  // };

  const handleFormSubmit = async (event) => {
  event.preventDefault();
  setError(null);
  setMessage(null);
  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const registrationData = localStorage.getItem("registrationData");
    let storedEmail = "";
    let storedPassword = "";
    let storedUserName = "";

    if (registrationData) {
      const parsed = JSON.parse(registrationData);
      storedEmail = parsed.email || "";
      storedPassword = parsed.password || "";
      storedUserName = parsed.userName || "";
    }

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email || storedEmail,
        password: storedPassword,
        userName: storedUserName,
      });

      localStorage.removeItem("registrationData");
    }
    setLoading(false)
    setMessage("Login successful!");
    alert("login successful");
    Router.push("/Dashboard");

  } catch (error) {
    setLoading(false);
    setError(error.message || "An unknown error occurred");
  }
};

if(loading){
  return(
    <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
   <Loader/>

    </div>
)
}

  return (
    <div className="overflow-hidden">
      <h1>Login Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="w-4/5 ml-[2rem] md:ml-2 md:w-full border h-screen">
          <h1 className="text-center text-3xl md:text-4xl lg:text-5xl mt-14 lg:mt-28 xl:mt-10">
            Welcome Back
          </h1>
          <p className="text-center ml-[4rem] mt-2 md:text-2xl w-[60%] md:w-[80%] md:ml-[2rem] xl:ml-[5rem]">
            the best place to see live chart or trade crypto is here
          </p>
          <form onSubmit={handleFormSubmit} className=" space-y-4  py-5">
            <div>
              <label htmlFor="email" className="ml-[1rem] md:text-2xl ">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border relative top-8 md:top-4 lg:top-16 xl:top-10 py-2 md:py-4 xl:py-2 left-2 w-[80%] translate-x-[-3rem] md:translate-x-[2rem] lg:translate-x-[-3rem]"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <div className="mt-[3rem] md:mt-[3rem] lg:mt-[5rem] xl:mt-[3rem]">
              <label htmlFor="password" className=" ml-[1rem] ">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border relative py-2 md:py-4 xl:py-2 md:top-4 lg:top-14 left-2 w-[80%] translate-x-[.8rem] md:translate-x-[2rem] lg:translate-x-[-3rem]"
                required
              />
            </div>
            {error && <p className="text-red-500 text-md">{error}</p>}
            {message && <p className="text-green-500 text-md">{message}</p>}
            <button
              type="submit"
              className="mt-20"
            >
              
            <Button/>
            </button>
          </form>
          <button onClick={loginWithGoogle}>Signup with google</button>
        </div>
        <div className="bg-signup flex items-center justify-center h-screen text-white">
          <h1 className="text-4xl font-bold">Welcome to CryptoSpace</h1>
        </div>
      </div>
    </div>
  );
}
export default Page;
