// "use client"
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { useRouter } from 'next/navigation'
// import { Router } from 'next/router';
// import React, { useEffect, useState } from 'react'
// import { auth } from '../Component/Firebase';
// import { Firestore, getDoc, setDoc } from 'firebase/firestore';

// // import { email } from 'better-auth/*';
// // import { json } from 'stream/consumers';

// function Page() {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [userName, setUserName] = useState(null);
//   // const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);
//           const userDoc = await getDoc(doc(Firestore, "users", user.uid));

//           if (!userDoc.exists()) {
//             const userData = userDoc.data();
//             setUserName(`${userData.userName}`); 
//           }

//       } else {
//         router.push("/Login");
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [router]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("LogOut error: ", error);
//     }
//   };

//    const handleChangePassword = () => {
//     router.push("/ChangePasssword");
//    }
//    if(loading){
//     return<p>loading......</p>
//    }
//   return (
//     <div>
//         <h1>use client </h1>
//         <h1>Dashboard</h1>
//         {loading ? <p>Loading...</p> : <p>Welcome, {user?.email || "Guest"}!</p>}
//     </div>
//   )
// }

// export default Page
