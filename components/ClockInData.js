import { useState, useEffect } from 'react';

const fetchClockInData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/clockin", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch clock-in data");
    }

    const data = await res.json();
    console.log("API Data:", data);
    return data.clockins; // Ensure this matches the response structure from the API
  } catch (error) {
    console.log("Error loading clock-in data: ", error);
    return [];
  }
};

export default function ClockInData() {
  const [totalHours, setTotalHours] = useState(0); // Total hours variable

  useEffect(() => {
    async function calculateTotalHours() {
      const clockIns = await fetchClockInData();

      // Ensure clockIns is defined before processing
      if (clockIns) {
        // Get current month and year
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        console.log("Current Month:", currentMonth);
        console.log("Current Year:", currentYear);
        console.log("Clock-ins Data:", clockIns);

        // Calculate total hours for the current month
        let total = 0;
        clockIns.forEach(clockIn => {
          const clockInDate = new Date(clockIn.clockInTime);
          const clockInMonth = clockInDate.getMonth();
          const clockInYear = clockInDate.getFullYear();

          console.log("Clock-in Date:", clockInDate);
          console.log("Clock-in Month:", clockInMonth);
          console.log("Clock-in Year:", clockInYear);

          // Check if the clock-in is within the current month and year
          if (clockInMonth === currentMonth && clockInYear === currentYear) {
            total += 12; // Assuming each clock-in is 12 hours
          }
        });

        console.log("Total Hours Calculated:", total);
        setTotalHours(total); // Updating the total hours variable
      }
    }

    calculateTotalHours();
  }, []);

  return (
    <div>{totalHours}</div>
  );
}
