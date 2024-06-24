"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  // State variables to hold form data
  const [formData, setFormData] = useState({
    fullName: "",
    hourlyRate: "",
    monthlyTarget: "",
    email: "",
    password: ""
  });

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send form data to the API route for registering users
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // If the request is successful, log the response
      if (response.status === 201) {
        console.log("User registered successfully");
        router.push("/auth/verify");
      } else {
        // If the request fails, throw an error
        throw new Error("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <form className="flex flex-col w-[275px]" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="text-white">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="w-full"
          placeholder="Enter your full name..."
          onChange={handleChange}
          value={formData.fullName}
          required
        />
      </div>



      <div className="mb-5">
        <label className="text-white">Hourly Rate</label>
        <input
          type="number"
          name="hourlyRate"
          className="w-full"
          placeholder="Enter your hourly pay..."
          onChange={handleChange}
          value={formData.hourlyRate}
          required
        />
      </div>

      <div className="mb-5">
        <label className="text-white">Monthly Target</label>
        <input
          type="number"
          name="monthlyTarget"
          className="w-full"
          placeholder="Enter your monthly target..."
          onChange={handleChange}
          value={formData.monthlyTarget}
          required
        />
      </div>

      <div className="mb-5">
        <label className="text-white">Email</label>
        <input
          type="email"
          name="email"
          className="w-full"
          placeholder="Enter your email..."
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>

      <div className="mb-5">
        <label className="text-white">Password</label>
        <input
          type="password"
          name="password"
          className="w-full"
          placeholder="Enter your password..."
          onChange={handleChange}
          value={formData.password}
          required
        />
      </div>

      <button className="text-white font-semibold border-4 w-[55%] py-1 rounded-[30px] text-center mx-auto mt-4 mb-14 drop-shadow-shadow bg-blue_1 cursor-pointer">
        Submit
      </button>
    </form>
  );
}
