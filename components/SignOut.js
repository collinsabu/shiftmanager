"use client";
import { signOut } from "next-auth/react";

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOut() {
  return (
    <button
      className="flex text-white items-center cursor-pointer"
      onClick={() => signOut()}
    >
      <div className="mr-1">SignOut</div>
      <FaSignOutAlt />
    </button>
  );
}
