import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiCalendarAccount, mdiHome } from "@mdi/js";
import { LuListTodo } from "react-icons/lu";
import { MdPreview, MdEvent } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import SignoutNav from "./SignoutNav";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <main className="mt-10 fixed bottom-0 right-0 left-0 z-100">
      <div
        className={`sidebar bg-blue_1 flex flex-col text-white gap-8 p-5 mb-10 w-[70%] fixed top-0 left-0 h-full transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/" className="cursor-pointer border-b border-white pb-2">
          Home
        </Link>
        <Link href="/event" className="cursor-pointer border-b border-white pb-2">
          Shift Planner
        </Link>
        <Link href="/todo" className="cursor-pointer border-b border-white pb-2">
          TodoApp
        </Link>
        <div className="cursor-pointer border-b border-white pb-2">
          <SignoutNav/>
        </div>
        <Link href="/" className="cursor-pointer border-b border-white pb-2">
          Watch Tutorial
        </Link>
        <button className="closesidebar bg-blue-400" onClick={closeSidebar}>
          Close Menu
        </button>
      </div>
      <nav className="bg-blue_1 flex justify-around items-center rounded-t-2xl py-1">
        <div className="flex justify-center items-center gap-5">
          <Link href="/event">
            <MdEvent className="text-white font-bold text-[23px] cursor-pointer" />
          </Link>
          <button className="opensidebar" onClick={openSidebar}>
            <IoMenu className="text-white font-bold text-[25px] cursor-pointer" />
          </button>
        </div>
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <Link href="/">
            <Icon path={mdiHome} size={1.3} />
          </Link>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Link href="/todo">
            <LuListTodo className="text-white font-bold text-[23px] cursor-pointer" />
          </Link>
          <Link href="/actualclockout">
            <MdPreview className="text-white font-bold text-[23px] cursor-pointer" />
          </Link>
        </div>
      </nav>
    </main>
  );
}
