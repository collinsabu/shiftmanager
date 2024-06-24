"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const ClockoutModal = ({ setIsClockOutModalOpen }) => {
  const [organization, setOrganization] = useState("");

  const closeModal = () => {
    setIsClockOutModalOpen(false);
    console.log("clockout modal close")
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault();

 

    // Get the current date and time
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = now.toTimeString().split(" ")[0]; // HH:MM:SS

    try {
      const response = await fetch("http://localhost:3000/api/clockout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organization, formattedDate, formattedTime }),
      });

      if (response.status === 201) {
        console.log("Clock-out recorded successfully");
        setIsClockOutModalOpen(false); // Close the modal after successful submission
      } else {
        throw new Error("Failed to record clock-out");
      }
    } catch (error) {
      console.error("Error recording clock-out:", error.message);
    }
  };



  return (
    <div className="bg-black bg-opacity-50 h-screen px-6 flex items-center justify-center flex-col">
      <div className="text-center text-xl font-bold bg-green-400 p-2 w-full flex justify-between items-center px-4">
        <h2 >
          Actual Clockout Details
        </h2>
        <div>
          <IoClose className="cursor-pointer" onClick={closeModal} />
        </div>
      </div>

      <form onSubmit={handleModalSubmit} className="bg-white px-2">
        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="border-2 border-gray-400 w-full mb-3 p-2"
        />
        <button className="inline-block bg-green-700 px-6 py-2 rounded-full ml-4 my-3 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClockoutModal;
