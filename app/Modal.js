"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ setIsModalOpen }) => {
  const [organization, setOrganization] = useState("");
  const [shiftType, setShiftType] = useState(""); // "regular" or "overtime"
  const [hourlyRate, setHourlyRate] = useState(""); // New state for hourly rate
  const [clockOutTime, setClockOutTime] = useState(""); // New state for clock-out time

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/clockin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organization, hourlyRate, shiftType, clockOutTime }),
      });
      if (response.status === 201) {
        console.log("Clock-in recorded successfully");
        setIsModalOpen(false); // Close the modal after successful submission
      } else {
        throw new Error("Failed to record clock-in");
      }
    } catch (error) {
      console.error("Error recording clock-in:", error.message);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 h-screen px-6 flex items-center justify-center flex-col">
      <div className="text-center text-xl font-bold bg-green-400 p-2 w-full flex justify-between items-center px-7">
        <div>Enter Details</div> 
        <div><IoClose onClick={handleCloseModal} className="cursor-pointer" /></div>
      </div>
      <form onSubmit={handleModalSubmit} className="bg-white px-2 py-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="border-2 border-gray-400 w-full mb-3 p-2"
          required
        />
        <input
          type="number"
          placeholder="Hourly Rate"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          className="border-2 border-gray-400 w-full mb-3 p-2"
          required
        />
        <label className="block mb-1 text-sm font-medium text-gray-700">Clock Out Time</label>
        <input
          type="time"
          value={clockOutTime}
          onChange={(e) => setClockOutTime(e.target.value)}
          className="border-2 border-gray-400 w-full mb-3 p-2"
          required
        />
        <select
          value={shiftType}
          onChange={(e) => setShiftType(e.target.value)}
          className="border-2 border-gray-400 w-full mb-3 p-2"
          required
        >
          <option value="">Select Shift Type</option>
          <option value="regular">Regular</option>
          <option value="overtime">Overtime</option>
          <option value="annual_leave">Annual Leave</option>
        </select>

        <button className="inline-block bg-green-700 px-6 py-2 rounded-full ml-4 my-3 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Modal;
