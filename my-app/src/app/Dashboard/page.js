"use client"
import { onAuthStateChanged, } from 'firebase/auth';
import { useRouter } from 'next/navigation'
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth } from '../Component/Firebase';
import { Firestore, getDoc, setDoc } from 'firebase/firestore';
// import { email } from 'better-auth/*';
// import { json } from 'stream/consumers';

function Page() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.emailVerified) {
          const userDoc = await getDoc(doc(Firestore, "users", currentUser.uid));
          if (!userDoc.exists()) {
            const registrationData = localStorage.getItem("registration");
            const { userName = "", email = "", gender = "" } = registrationData
              ? JSON.parse(registrationData)
              : {};
            await setDoc(doc(Firestore, "users", currentUser.uid), {
              userName,
              email,
              gender,
            });
            localStorage.removeItem("registration");
          }
        }
        setUser(currentUser);
        router.push("/Dashboard");
      } else {
        setUser(null);
        router.push("/Login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  return (
    <div>
        <h1>use client </h1>
        <h1>Dashboard</h1>
        {loading ? <p>Loading...</p> : <p>Welcome, {user?.email || "Guest"}!</p>}
    </div>
  )
}

export default Page
