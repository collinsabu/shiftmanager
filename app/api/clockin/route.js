// pages/api/clockin.js
import connectMongoDB from "@/libs/mongodb.mjs";
import ClockIn from "@/models/clockin";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

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

async function deleteExpiredClockIns() {
  try {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    await connectMongoDB();

    const expiredClockIns = await ClockIn.deleteMany({
      $or: [
        { "clockInTime.getMonth": { $lt: currentMonth }, "clockInTime.getFullYear": { $lte: currentYear } },
        { "clockInTime.getFullYear": { $lt: currentYear } }
      ]
    });

    console.log(`Deleted ${expiredClockIns.deletedCount} expired clock-ins.`);
  } catch (error) {
    console.error("Error deleting expired clock-ins:", error.message);
  }
}

export async function POST(request) {
  try {
    const { organization, hourlyRate, shiftType, clockOutTime } = await request.json();

    await connectMongoDB();

    const now = new Date();
    const currentDate = formatDate(now);
    const formattedClockInTime = formatTime(now);
    const clockInTime = now;

    const clockOutDateTime = new Date(`${currentDate.split(":").reverse().join("-")}T${clockOutTime}`);
    const formattedClockOutTime = formatTime(clockOutDateTime);

    await ClockIn.create({
      organization,
      hourlyRate,
      shiftType,
      clockInTime,
      clockOutTime: clockOutDateTime,
      formattedClockInTime,
      formattedClockOutTime,
      formattedDate: currentDate,
    });

    return NextResponse.json({ message: "Clock-in recorded successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error recording clock-in:", error.message);
    return NextResponse.error({ message: error.message });
  }
}

export async function GET(request) {
  try {
    await deleteExpiredClockIns(); // Automatically delete expired clock-ins before fetching data

    await connectMongoDB();

    const clockins = await ClockIn.find({}).sort({ clockInTime: -1 });

    console.log("Fetched Clock-ins:", clockins);

    return NextResponse.json({ clockins }, { status: 200 });
  } catch (error) {
    console.error("Error fetching clock-ins:", error.message);
    return NextResponse.error({ message: error.message });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await connectMongoDB();

    await ClockIn.findByIdAndDelete(id);

    return NextResponse.json({ message: "Clock-in deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting clock-in:", error.message);
    return NextResponse.error({ message: error.message });
  }
}
