import { useEffect, useState } from 'react';

const getClockIns = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/clockin", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch clock-ins");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading clock-ins: ", error);
  }
};

const deleteClockIn = async (id) => {
  try {
    const res = await fetch("http://localhost:3000/api/clockin", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!res.ok) {
      throw new Error("Failed to delete clock-in");
    }

    return res.json();
  } catch (error) {
    console.log("Error deleting clock-in: ", error);
  }
};

export default function ClockInTable() {
  const [clockIns, setClockIns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getClockIns();
      setClockIns(data.clockins);
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteClockIn(id);
      setClockIns((prevClockIns) => prevClockIns.filter(clockIn => clockIn._id !== id));
      console.log("Clock-in deleted", id);
    } catch (error) {
      console.log("Error deleting clock-in: ", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="bg-white border border-gray-300 min-w-full">
        <thead className="text-xs md:text-sm">
          <tr className="bg-green_1 font-medium space-x-2">
            <th className="px-2 py-1 md:px-4 md:py-2 border-b">Date</th>
            <th className="px-2 py-1 md:px-4 md:py-2 border-b">Org</th>
            <th className="px-2 py-1 md:px-4 md:py-2 border-b">Shift</th>
            <th className="px-2 py-1 md:px-4 md:py-2 border-b">ClockIn</th>
            <th className="px-2 py-1 md:px-4 md:py-2 border-b">ClockOut</th>
            <th className="px-2 py-1 md:px-4 md:py-2 border-b">Earnings</th>
            <th className="px-2 py-1 md:px-4 md:py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs md:text-sm space-x-2">
          {clockIns.map((clockIn) => (
            <tr key={clockIn._id} className="hover:bg-gray-50 space-x-2">
              <td className="px-2 py-2 md:px-4 border-b">{clockIn.formattedDate}</td>
              <td className="px-2 py-2 md:px-4 border-b">{clockIn.organization}</td>
              <td className="px-2 py-2 md:px-4 border-b">{clockIn.shiftType}</td>
              <td className="px-2 py-2 md:px-4 border-b">{clockIn.formattedClockInTime}</td>
              <td className="px-2 py-2 md:px-4 border-b">{clockIn.formattedClockOutTime}</td>
              <td className="px-2 py-2 md:px-4 border-b">£{(clockIn.hourlyRate * 12).toFixed(2)}</td>
              <td className="px-2 py-2 md:px-4 border-b">
                <button onClick={() => handleDelete(clockIn._id)} className="text-red-500 text-xs md:text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
