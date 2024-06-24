// /pages/auth/login.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("/")
    } catch (error) {
      console.log(error)
    }

  
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email..."
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        type="password"
        placeholder="Enter your password..."
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <button
        className="text-white font-semibold border-4 w-[55%] py-1 rounded-[30px] text-center mx-auto mt-4 drop-shadow-shadow bg-blue_1 cursor-pointer"
        type="submit"
      >
        Login
      </button>
       {error && (
         <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
       )

       }
     
    </form>
  );
}
