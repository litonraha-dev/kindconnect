"use client"
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href={"/"}>
          <span className="text-2xl font-extrabold">
            Kind<span className="text-green-600">Connect</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link
            className="hover:text-green-600 transition-colors"
            href={"/home"}
          >
            Home
          </Link>
          <Link
            className="hover:text-green-600 transition-colors"
            href={"/events"}
          >
            Events
          </Link>
          <Link
            className="hover:text-green-600 transition-colors"
            href={"/about"}
          >
            About
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link 
              className="px-2 py-1 text-base  text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-lg hover:shadow-green-600/25 transition-all text-center" 
              href={"/sign-in"}
            >
              Login
            </Link>
            
            <Link 
              className="px-2 py-1 text-base  text-gray-800 bg-white border border-gray-200 hover:border-green-600 hover:text-green-600 rounded-xl shadow-sm transition-all text-center" 
              href={"/sign-up"}
            >
              Sign Up
            </Link>
        </div>
      </div>
       <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              // ক্রস বাটন (মেনু খোলা থাকলে)
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // হ্যামবার্গার বাটন (মেনু বন্ধ থাকলে)
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
          {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3 font-medium text-gray-700">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/events" 
              onClick={() => setIsOpen(false)}
              className="hover:text-green-600 transition-colors"
            >
              Events
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="hover:text-green-600 transition-colors"
            >
              About
            </Link>
          </nav>
          
          {/* <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <Link 
              href="/signin" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
