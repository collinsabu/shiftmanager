import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb.mjs';
import Todo from '@/models/todoModel';

export async function POST(request) {
  try {
    await connectMongoDB();

    const { task, description, formattedDate, formattedTime } = await request.json();

    const newTodo = new Todo({
      task,
      description,
      formattedDate,
      formattedTime,
    });

    await newTodo.save();

    return NextResponse.json({ todo: newTodo }, { status: 201 });
  } catch (error) {
    console.error("Error adding todo:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all todos and select specific fields
    const todos = await Todo.find({}, 'task description formattedDate formattedTime');

    // Return the todos as JSON
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error fetching todos:", error.message);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}



export async function DELETE(request) {
  try {
    // Extract the id from the request query parameters
    const id = request.nextUrl.searchParams.get("id");

    // Connect to MongoDB
    await connectMongoDB();

    // Find the todo item by id and delete it
    await Todo.findByIdAndDelete(id);

    // Return a success message
    return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error deleting todo:", error.message);
    return NextResponse.error({ message: "Failed to delete todo" });
  }
}

