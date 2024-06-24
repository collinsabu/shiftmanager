import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import EventForm from "./EventForm";

const EventPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    if (date < today) {
      setError("You cannot set an event for a past date.");
      setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds
      return;
    }

    setSelectedDate(date);
    setShowForm(true);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventExists = events.some(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );
      if (eventExists) {
        return <div className="event-indicator"></div>;
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Event Planner</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Calendar onClickDay={handleDateClick} tileContent={tileContent} />
      {showForm && (
        <EventForm
          selectedDate={selectedDate}
          closeForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default EventPlanner;
