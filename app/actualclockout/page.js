"use client";
import Nav from "@/components/Nav";
import React, { useState, useEffect } from "react";

const ClockoutList = () => {
  const [clockouts, setClockouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClockouts = async () => {
      try {
        const response = await fetch("/api/clockout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch clockouts");
        }

        const data = await response.json();
        setClockouts(data.clockouts); // Assuming the response has a 'clockouts' field
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClockouts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/clockout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the clockout");
      }

      // Remove the deleted clockout from the state
      setClockouts(clockouts.filter((clockout) => clockout._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="container mx-auto p-4 bg-blue_1 h-[600px] mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Actual ClockOut Time
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white shadow-md rounded-lg  overflow-x-auto">
        {clockouts.length > 0 ? (
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-green_3">
              <tr>
                <th className="py-1 px-2 border-b border-gray-200 text-left">Date</th>
                <th className="py-1 px-2 border-b border-gray-200 text-left">Time</th>
                <th className="py-1 px-2 border-b border-gray-200 text-left">Organization</th>
                <th className="py-1 px-2 border-b border-gray-200 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clockouts.map((clockout) => (
                <tr key={clockout._id}>
                  <td className="py-1 px-2 border-b border-gray-200">{clockout.formattedDate}</td>
                  <td className="py-1 px-2 border-b border-gray-200">{clockout.formattedTime}</td>
                  <td className="py-1 px-2 border-b border-gray-200">{clockout.organization}</td>
                  <td className="py-1 px-2 border-b border-gray-200">
                    <button
                      onClick={() => handleDelete(clockout._id)}
                      className="text-red-500 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm">No clockouts found.</p>
        )}
      </div>
      <Nav />
    </main>
  );
};

export default ClockoutList;
