import React, { useState } from "react";

const EventForm = ({ selectedDate, closeForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate description word limit
    const wordCount = description.trim().split(/\s+/).length;
    if (wordCount > 100) {
      setError("Description should be limited to 100 words.");
      return;
    }

    // Correctly format the date and time
    const formattedDay = `${selectedDate.getDate()}${
      ["th", "st", "nd", "rd"][((selectedDate.getDate() % 100) - 20) % 10] ||
      "th"
    }`;
    // Get current time
    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    // Create the new event object
    const newEvent = {
      title,
      description,
      date: selectedDate.toISOString(), // Ensure date includes time
      formattedDay,
      formattedTime,
      userEmail,
    };

    try {
      const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      // Reset form and set success message
      setTitle("");
      setDescription("");
      setUserEmail("");
      setError("");
      setSuccessMessage("Event added successfully!");

      // Clear the success message after a delay
      setTimeout(() => {
        setSuccessMessage("");
        closeForm();
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h3 className="text-xl font-bold mb-4">
        Add Event for {selectedDate.toDateString()}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border-2 border-dark-grey rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border-2 border-dark-grey rounded"
            rows="3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-sm font-bold mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-3 py-2 border-2 border-dark-grey rounded"
            required
          />
        </div>
        <div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green_3 text-white px-4 py-2 rounded"
          >
            Add Event
          </button>
          <button
            type="button"
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
            onClick={closeForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
