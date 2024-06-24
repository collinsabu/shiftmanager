// pages/api/events.js
import connectMongoDB from "@/libs/mongodb.mjs"; // Ensure you have this utility to connect to MongoDB
import Event from "@/models/eventSchema"; // Ensure the Event model/schema is correctly imported
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function POST(request) {
  try {
    // Extract data from the request body
    const { title, description, date, formattedDay, formattedTime, userEmail } = await request.json();

    // Check if all required fields are provided
    if (!title || !description || !date || !formattedDay || !formattedTime || !userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Create a new event document using the Event model/schema
    const event = new Event({
      title,
      description,
      date: new Date(date), // Ensure date includes time
      formattedDay,
      formattedTime,
      userEmail,
    });

    // Save the event to the database
    await event.save();

    // Return a success response
    return NextResponse.json({ message: "Event Created", event }, { status: 201 });
  } catch (error) {
    // Handle errors
    console.error("Error creating event:", error.message);
    return NextResponse.json({ error: "Error creating event" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectMongoDB();
    const events = await Event.find({});

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return NextResponse.error({ message: error.message });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await connectMongoDB();

    const result = await Event.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


