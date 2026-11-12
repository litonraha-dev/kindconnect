import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50/50 to-white py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* বাম পাশ: টেক্সট এবং বাটনসমূহ */}
        <div className="space-y-6 text-center md:text-left">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 font-semibold text-xs md:text-sm tracking-wider uppercase rounded-full">
            MAKE A DIFFERENCE
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Small Actions,<br /> <span className="text-green-600">Big Changes.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
            Join your local community and make a positive impact together.
          </p>

          {/* বাটনগুলো এখন টেক্সটের ঠিক নিচেই সুন্দরভাবে থাকবে */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
            <Link 
              className="px-6 py-3.5 text-base font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-lg hover:shadow-green-600/25 transition-all text-center" 
              href={"/explore-events"}
            >
              Explore Events
            </Link>
            
            <Link 
              className="px-6 py-3.5 text-base font-semibold text-gray-800 bg-white border border-gray-200 hover:border-green-600 hover:text-green-600 rounded-xl shadow-sm transition-all text-center" 
              href={"/create-event"}
            >
              Create Event
            </Link>
          </div>
        </div>

        {/* ডান পাশ: ব্যানার ইমেজ */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-lg aspect-[5/4]">
            <Image
              src={"/images/banner.png"}
              alt="banner"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;
