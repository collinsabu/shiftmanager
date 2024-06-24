import React, { useEffect, useState } from "react";
import RemoveShiftBtn from "./RemoveEvent";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Your Planed Shift
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-blue-100 mb-4 shadow-md"
          >
            <div className="flex gap-4">
              <div className="bg-green_3 flex justify-center items-center p-2 w-[50px]">
                <p className="text-white">{event.formattedDay}</p>
              </div>
              <div className="pr-2">
                <h3 className="text-md font-semibold">{event.title}</h3>
                <div className="flex justify-between ">
                  <div>
                  <p className="text-sm w-[160px] ">{event.description}</p>
                  </div>
                  
                  <div className="flex">
                  <p className="text-sm text-green_3 w-[40px] ">{event.formattedTime}</p>
                  <RemoveShiftBtn id={event._id}/>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

/* 
      <p>{event.description}</p>
            
           
 */
