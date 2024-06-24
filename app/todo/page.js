"use client";
import React, { useState } from "react";
import Todolist from "@/components/Todolist.js";
import Nav from "@/components/Nav.js"

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-render

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate description word limit
    const wordCount = description.trim().split(/\s+/).length;
    if (wordCount > 10) {
      setError("Description should be limited to 10 words.");
      return;
    }

    // Get the current date and time
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}:${String(now.getMonth() + 1).padStart(2, '0')}:${now.getFullYear()}`;
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Create the new todo object
    const newTodo = {
      task,
      description,
      formattedDate,
      formattedTime,
    };

    try {
      const response = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      // Reset form and set success message
      setTask("");
      setDescription("");
      setError("");
      setSuccessMessage("Todo added successfully!");

      // Refresh the todo list by changing the state
      setRefreshKey((prevKey) => prevKey + 1);

      // Clear the success message after a delay
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    
    <main className="container mx-auto p-4 bg-blue_1 mb-4 ">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">My Todos</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-4">
          <label htmlFor="task" className="block text-sm font-bold mb-0 text-green_3">Task</label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-3 py-2 border-2 border-dark-grey rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold mb-2 text-green_3">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded border-2 border-dark-grey"
            rows="1"
            required
          />
        </div>
        <div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 mt-1">{description.trim().split(/\s+/).length} / 10 words</p>
          <button
            type="submit"
            className="bg-green_3 text-white px-4 py-2 rounded"
          >
            Add Todo
          </button>
        </div>
      </form>

      <div className="my-4 ">
        <Todolist key={refreshKey} />
      </div>
      <Nav className=" absolute bottom-0" />
    </main>
    
  );
};

export default TodoForm;
