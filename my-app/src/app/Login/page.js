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

function Page() {
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = async () =>{
    try{
      await signInWithPopup (auth, provider);
      const user = auth.currentUser;
      if(user){
        const userDocRef = doc (db, "users", user.id);
        const userDocSnapshot = await getDoc(userDocRef);
        if(!userDocSnapshot.exists()){
          await setDoc (userDocRef, {
            userId: user.uid,
            email: user.email
          })

        }
      }
    }catch(err){
      console.log(err)
    }
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const Router = useRouter();
 const [error, setError] = useState(null);
 const [message, setMessage] = useState(null);
  const handeleFormSumbit = async (event) => {
     event.preventDefault();
     setError(null);
     setMessage(null);

     try {
       const userCredential = await signInWithEmailAndPassword(
         auth,
         email,
         password
       );
       const user = userCredential.user;
       if (user.emailVerified) {
         const registrationData = localStorage.getItem("registrationData");
         const {
           userName = "",
           gender = "",
           email: storedEmail = "",
         } = registrationData ? JSON.parse(registrationData) : {};
         const userDoc = await getDoc(doc(firestore, "users", user.uid));
         if (!userDoc.exists()) {
           await setDoc(doc(firestore, "users", user.uid), {
             userName,
             email: storedEmail,
             gender,
           });
           localStorage.removeItem("registrationData");
         }
         setMessage("Login successful!");
         Router.push("/Register");
       } else {
         setError("Please verify your email before logging in.");
       }
     } catch (error) {if (error instanceof Errorr) {
        setError(error.message);
      } else {
        setError("an unknown error occurred");
      }
     }
    }
      
  
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
          <form onSubmit={handeleFormSumbit} className=" space-y-4  py-5">
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
                      {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <button type="submit" className="bg-blue-500 text-white text-center justify-center items-center flex py-2 px-4 rounded">
              Login
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
