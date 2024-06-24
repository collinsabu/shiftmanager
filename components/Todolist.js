"use client";
import React, { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/todo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        setTodos(data.todos); // Assuming the response has a 'todos' field
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="container mt-4 ">
      {error && <p className="text-red-500">{error}</p>}
      <div className="">
        {todos.length > 0 ? (
          <div className="  ">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="mb-4 bg-green-200 w-full py-1 px-2"
              >
                <div className="flex justify-between items-center">
                  <p className="mb-0 text-[16px] font-semibold ">{todo.task}</p>
                  <div>
                  <RemoveBtn id={todo._id}/>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className=" text-[14px] w-[200px]">{todo.description}</p>
                  <div className="flex font-semibold">
                    <p className="text-[11px] mx-2 ">{todo.formattedDate}</p>
                    <p className="text-[11px]">{todo.formattedTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
