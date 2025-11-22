"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../Component/Firebase";

function Page() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,

        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      localStorage.setItem(
        "userData",
        JSON.stringify({ userName, gender, email })
      );

      setMessage(
        "Registration successful! Please check your email for verification."
      );

      setUserName("");
      setEmail("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log("FIREBASE ERROR:", err);
      setError(err.message || "An unknown error occurred.");
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-3xl font-bold mt-6 mb-5">Signup Page</h1>

      <div className="grid bg-signup md:bg-none grid-cols-1 md:grid-cols-2">
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          className="w-4/5 mx-auto md:w-full bg-white border rounded-xl shadow-lg p-6 mt-6 md:mt-0"
        >
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl mb-4">
            Create an Account
          </h2>
          <p className="text-center text-gray-600 mb-8">
            To access live charts and trade crypto, sign up below.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-lg font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-lg font-medium">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
          </form>
        </motion.div>

        <div className="hidden md:flex justify-center items-center bg-signups text-white text-3xl font-semibold">
          Welcome to CryptoLive!
        </div>
      </div>
    </div>
  );
}

export default Page;
