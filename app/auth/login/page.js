import Image from "next/image";
import ShiftImage1 from "@/public/shift-manager.png";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function Signin() {
  return (
    <main className="background px-4 py-7 mx-auto">
      <div className=" rounded-[40px]  flex flex-col justify-center element pt-5">
        <div className="text-center flex flex-col items-center mb-12">
          <Image
            src={ShiftImage1}
            width="150"
            className="ml-3"
            alt="shift manager blue logo"
          />
          <h1 className="text-xl font-extrabold mb-1 ">Shift Manager</h1>
          <p className="text-sm leading-4 ">
            Never Lose any shift to <br />
            employer...
          </p>
        </div>
        <div className="bg-blue_1 px-7 pt-7  mb-7 rounded-[30px] mx-auto">
           <LoginForm/>
          <p className="text-white text-sm text-center font-light mt-4 mb-10">Forgot password?</p>
           <div className="mb-5 flex justify-center">
            <Link href="/auth/register" className=" text-blue_1 bg-blue_light px-5 py-2 rounded-[20px] mb-[20px] cursor-pointer ">Create Account</Link>
           </div>
         
        </div>
      </div>
    </main>
  );
}
