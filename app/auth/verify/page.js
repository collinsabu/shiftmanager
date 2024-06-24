import React from 'react'
import Link from 'next/link'
export default function page() {
  return (
    <main className='flex flex-col justify-center items-center bg-green_1  h-screen px-3'>
      <h1 className='text-white text-2xl mb-3'> Registration  Successful!</h1>
      <p className='text-white text-center text-md '>Please click the link to login </p>
       <Link href="/auth/login" className=' bg-green_3 text-white px-10 py-2 mt-3'>LOGIN</Link>
    </main>
  )
}
