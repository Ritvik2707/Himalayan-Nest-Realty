"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import './styles.css'


const Navbar = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-4 h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-700">Himalayan Nest</span>
          </div>

          <div className='flex items-center space-x-6'>
            <div className={`bg-white items-center space-x-6 flex not-sm:hidden`}>
              <Link href="/" className="text-gray-700 hover:text-green-700 font-medium">Home</Link>
              <Link href="/properties" className="text-gray-700 hover:text-green-700 font-medium">Properties</Link>
              <Link href="/about" className="text-gray-700 hover:text-green-700 font-medium">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-700 font-medium">Contact</Link>
            </div>

            <Link href="/login" className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 font-medium">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export const MobileMenu = ({ onClick }) => {
  return (
    <div className="h-20 flex space-x-2 justify-around items-center sm:hidden fixed bottom-0 left-0 w-screen bg-white z-50 shadow-xl shadow-black">
      <Link href="/" className="text-gray-700 hover:text-green-700 font-medium">Home</Link>
      <Link href="/properties" className="text-gray-700 hover:text-green-700 font-medium">Properties</Link>
      <Link href="/about" className="text-gray-700 hover:text-green-700 font-medium">About</Link>
      <Link href="/contact" className="text-gray-700 hover:text-green-700 font-medium">Contact</Link>
    </div>
  )
}

export default Navbar
