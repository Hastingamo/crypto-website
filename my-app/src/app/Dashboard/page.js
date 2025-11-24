"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { auth } from "../Component/Firebase";
import { Firestore, getDoc, setDoc } from "firebase/firestore";
// import { email } from 'better-auth/*';
// import { json } from 'stream/consumers';

function Page() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(Firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${userData.userName}`);
          setEmail(`${userData.email}`);
          setGender(`${userData.gender}`);
        }
      } else {
        router.push("/Login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/Login");
    } catch (error) {
      console.error("logout error", error);
    }
  };
  const handleChangePassword = () => {
    router.push("/ChangePassword");
  };
  if (loading) {
    <p>loading.........</p>;
  }
  return (
    <div>
      <h1>use client </h1>
      <h1>Dashboard</h1>
      {userName && (
        <div>
          <h1>Welcome: {userName}</h1>
        </div>
      )}

      {email && (
        <div>
          <h1>Email: {email}</h1>
        </div>
      )}
      {gender && (
        <div>
          <h1>Gender: {gender}</h1>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
}

export default Page;
