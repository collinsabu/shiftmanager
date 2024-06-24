"use client";
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiClockCheck } from "@mdi/js";
import { mdiClockRemove } from "@mdi/js";
import { mdiArrowDownDropCircleOutline } from "@mdi/js";
import Link from "next/link";
import Modal from "./Modal.js";
import ClockoutModal from "@/components/ClockoutModal.js";
import CloctTimes from "@/components/CloctTimes.js";
import ClockInData from "@/components/ClockInData.js";
import MonthlyEarning from "@/components/MonthlyEarning.js";
import MonthlyEarningTax from "@/components/MonthEarningTax.js";
import getCurrentTimeDetails from "@/components/getCurrentTimeDetails.js";
import SignOut from "@/components/SignOut.js"

import Nav from "@/components/Nav.js"

const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data.users;
  } catch (error) {
    console.log("Error loading users: ", error);
    return [];
  }
};

export default function Home() {
  const timeDetails = getCurrentTimeDetails();
  console.log(timeDetails);

  const [user, setUser] = useState(null); // Change to hold a single user object
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClockOutModalOpen, setIsClockOutModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers();
      if (users.length > 0) {
        setUser(users[0]); // Set the first user or handle as needed
        console.log(user);
      }
    }

    fetchData();
  }, []);

  const handleClockIn = () => {
    setIsModalOpen(true);
    console.log("clocked in");
  };

  const handleClockOut = () => {
    setIsClockOutModalOpen(true);
    console.log("clocked out");
  };

  if (isModalOpen) {
    return <Modal setIsModalOpen={setIsModalOpen} />;
  } else if (isClockOutModalOpen) {
    return <ClockoutModal setIsClockOutModalOpen={setIsClockOutModalOpen} />;
  } else {
    return (
      <main className="relative ">
        <section className="bg-blue_1 pt-6 rounded-t-[25px]">
          <div className="flex justify-between mx-5">
            <div>
              <h1 className="text-white font-medium text-lg">
                {" "}
                Hi {user && user.fullName}
              </h1>
            </div>
            <div >
              
              <div>
                <SignOut/>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-5">
            <div className="bg-green_1 flex flex-col justify-center items-center w-[150px] h-[150px] rounded-full border-8 border-green-700">
              <h1 className="font-bold text-3xl">
                {timeDetails.Hour}:{timeDetails.minutes}
                <span className="text-sm font-normal">
                  {timeDetails.dayPeriod}
                </span>
              </h1>
              <p className="font-bold text-md">
                {timeDetails.weekNumber} <span>{timeDetails.weekDay}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-between mx-6">
            <div
              className="bg-white w-[70px] h-[70px] flex flex-col items-center rounded-full pt-2 mb-4"
              onClick={handleClockIn}
            >
              <Icon path={mdiClockCheck} size={1} color="blue" />
              <p className="clockin font-bold text-md">IN</p>
            </div>

            <div className="text-center mt-4">
              <p className="text-white  text-sm">Monthly Target</p>
              <h4 className="text-white font-semibold text-2xl">
              £{user && user.monthlyTarget}
              </h4>
            </div>
            <Link href="/">
              <div
                className="bg-white w-[70px] h-[70px] flex flex-col items-center rounded-full pt-2 mb-4"
                onClick={handleClockOut}
              >
                <Icon path={mdiClockRemove} size={1} color="red" />
                <p className="clockout font-bold text-md">OUT</p>
              </div>
            </Link>
          </div>
        </section>

        <section className="bg-blue-400 p-1">
         <div className="flex justify-between p-3 bg-white shadow-md mx-1 mt-2">
         <div>
            <p className="text-[12px] font-normal">Total Hours</p>
            <div className="bg-blue py-1 px-4 text-center">
              <h4 className="font-bold text-[17px] ">
                <ClockInData />
              </h4>
            </div>
          </div>



          <div className="text-center">
            <p className="text-[12px] font-normal">Earnings + Tax </p>
            <div className="bg-blue py-1 px-4 text-center">
              <h4 className="font-bold text-[17px] ">
              <MonthlyEarning />
              </h4>
            </div>
          </div>


          <div className="text-center">
            <p className="text-[12px] font-normal">Earnings - Tax </p>
            <div className="bg-blue py-1 px-4 text-center">
              <h4 className="font-bold text-[17px] ">
                <MonthlyEarningTax />
              </h4>
            </div>
          </div>
         </div>
          
        </section>

        <section className="data bg-slate-300 mt-3 mb-3 h-46">
          <CloctTimes />
    
        </section>
        <Nav  />
      </main>
    );
  }
}
