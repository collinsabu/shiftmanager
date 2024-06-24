"use client"

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import EventForm from "@/components/EventForm";
import 'react-calendar/dist/Calendar.css'; // Import the default styles
import '@/components/CalendarStyles.css'; // Import your custom styles
import EventList from "@/components/EventList"; // Import the EventList component
import Nav from "@/components/Nav.js";
import "../globals.css"

const EventPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    // Fetch event dates from the database
    const fetchEventDates = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEventDates(data.map(event => new Date(event.date)));
      } catch (error) {
        console.error("Error fetching event dates:", error);
      }
    };

    fetchEventDates();
  }, []);

  const handleDateClick = (date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set the current time to midnight for comparison

    if (date < now) {
      setError("Event can't be set on a past date.");
      setShowForm(false);
    } else {
      setSelectedDate(date);
      setError("");
      setShowForm(true);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (eventDates.find(d => d.toDateString() === date.toDateString())) {
        return 'event-date'; // Custom class for event dates
      }
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4 bg-blue-100 rounded-lg shadow-md h-screen overflow-y-auto relative">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Calendar 
          onClickDay={handleDateClick} 
          className="react-calendar" 
          tileClassName={tileClassName} // Add the tileClassName prop
        />
      </div>
      {showForm && (
        <div className="mt-4">
          <EventForm
            selectedDate={selectedDate}
            closeForm={() => setShowForm(false)}
          />
        </div>
      )}

      <EventList /> {/* Include the EventList component */}
      <div>
        <Nav className="absolute bottom-0" />
      </div>
    </div>
  );
};

export default EventPlanner;
