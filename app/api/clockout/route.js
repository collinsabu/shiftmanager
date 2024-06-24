// pages/api/clockout.js
import connectMongoDB from "@/libs/mongodb.mjs";
import clockout from "@/models/clockout";
import { NextResponse } from "next/server";

function formatTime(date) {
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${hour}:${minute}`;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}:${month}:${year}`;
}

export async function POST(request) {
  try {
    // Extract data from the request body
    const { organization } = await request.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Current date and time
    const now = new Date();
    const formattedDate = formatDate(now);
    const formattedTime = formatTime(now);

    // Create a new clock-out document using the ClockOut model/schema
    await clockout.create({
      organization,
      formattedDate,
      formattedTime,
    });

    // Return a success response
    return NextResponse.json({ message: "Clock-out recorded successfully" }, { status: 201 });
  } catch (error) {
    // Handle errors
    console.error("Error recording clock-out:", error.message);
    return NextResponse.error(error);
  }
}


export async function GET(request) {
  try {
    await connectMongoDB();

    const clockouts = await clockout.find({}); // Correctly refer to the ClockOut model

    console.log("Fetched Clock-outs:", clockouts);

    return NextResponse.json({ clockouts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching clock-outs:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 }); // Correct error handling
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await connectMongoDB();

    const result = await clockout.findByIdAndDelete(id);
    if (result) {
      return NextResponse.json({ message: "Clock-out deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Clock-out not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting clock-out:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

