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
    return data.clockins; // Ensure this matches the response structure from the API
  } catch (error) {
    console.log("Error loading clock-in data: ", error);
    return [];
  }
};

const TAX_RATE = 0.2; // Assuming a 20% tax rate

export default function MonthlyEarningTax() {
  const [monthlyTotalEarnings, setMonthlyTotalEarnings] = useState(0);

  useEffect(() => {
    async function calculateMonthlyEarnings() {
      const clockIns = await fetchClockInData();

      // Ensure clockIns is defined before processing
      if (clockIns) {
        // Get current month and year
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Calculate total earnings for the current month
        let totalEarnings = 0;
        clockIns.forEach(clockIn => {
          const clockInDate = new Date(clockIn.clockInTime);
          const clockInMonth = clockInDate.getMonth();
          const clockInYear = clockInDate.getFullYear();

          // Check if the clock-in is within the current month and year
          if (clockInMonth === currentMonth && clockInYear === currentYear) {
            totalEarnings += clockIn.hourlyRate * 12; // Assuming each clock-in is 12 hours
          }
        });

        // Deduct tax
        const earningsAfterTax = totalEarnings * (1 - TAX_RATE);

        setMonthlyTotalEarnings(earningsAfterTax); // Updating the total earnings variable
      }
    }

    calculateMonthlyEarnings();
  }, []);

  return (
    <div>£{monthlyTotalEarnings.toFixed(2)}</div>
  );
}
