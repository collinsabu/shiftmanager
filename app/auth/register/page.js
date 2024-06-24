import RegisterForm from "./RegisterForm";
import ShiftImage1 from "../../../public/shift-manager.png";
import Image from "next/image"


export default function Register() {

  return (
    <main className="bg-blue_1 flex justify-center items-center flex-col rounded-[30px]">
      <div className=" bg-white py-2 px-1 rounded-full my-6" >
         <Image src={ShiftImage1} 
          width="120"
          className="ml-3"
          alt="shift manager blue logo"
         />
      </div>
      <RegisterForm/>
    </main>
  )
}
