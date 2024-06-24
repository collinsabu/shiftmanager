"use client"
// pages/auth/error.js
// pages/auth/error.js
import React from "react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Error</h1>
      <p>There was an error during the authentication process. Please try again.</p>
      <button onClick={() => router.push('/auth/login')}>Go Back to Login</button>
    </div>
  );
}

