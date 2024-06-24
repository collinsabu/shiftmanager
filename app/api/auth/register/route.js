import bcrypt from "bcryptjs";
import connectMongoDB from "@/libs/mongodb.mjs";
import User from "@/models/user"; // Assuming you have a User model/schema
import { NextResponse } from "next/server";

// POST method to create a new user
export async function POST(request) {
  try {
    // Extract data from the request body
    const {
      fullName,
      hourlyRate,
      monthlyTarget,
      email,
      password,
    } = await request.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document using the User model/schema
    await User.create({
      fullName,
      hourlyRate,
      monthlyTarget,
      email,
      password: hashedPassword,
    });

    // Return a success response
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET method to fetch all users
export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all users
    const users = await User.find({}, "fullName hourlyRate monthlyTarget email");

    // Return the users as JSON
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error fetching users:", error.message);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}
