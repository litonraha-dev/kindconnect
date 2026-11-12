import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FindEvent = () => {
    return (
       <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 space-y-10">
        
        {/* সেকশন হেডার ও সার্চ/ফিল্টার বার */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Find Events Near You
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              Discover opportunities to help your community.
            </p>
          </div>

          {/* সার্চ ইনপুট ফিল্ড */}
          <div className="w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search events or locations..." 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-green-600 shadow-sm text-sm"
            />
          </div>
        </div>

        {/* ক্যাটাগরি ফিল্টার ট্যাগস */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href={'/all'} className="px-5 py-2 text-sm font-semibold text-white bg-green-600 rounded-full shadow-sm transition-all">
            All
          </Link>
          <Link href={'/environment'} className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full transition-all shadow-sm">
            Environment
          </Link>
          <Link href={'/education'} className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full transition-all shadow-sm">
            Education
          </Link>
          <Link href={'/health'} className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-green-600 hover:text-green-600 rounded-full transition-all shadow-sm">
            Health
          </Link>
        </div>

        {/* সাব-হেডার এবং 'View All' বাটন */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <h4 className="text-xl font-bold text-gray-900">Upcoming Events</h4>
          <Link href={'/view-all'} className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
            View All &rarr;
          </Link>
        </div>

        {/* ইভেন্ট কার্ডসমূহ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* কার্ড ১: Community Cleanup */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div className="relative w-full h-48 bg-gray-100">
              <Image 
                src={'/images/community-cleanup.png'} 
                alt='community-cleanup' 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Community Cleanup
                </h3>
                <p className="text-gray-500 text-sm mt-1">Local Park</p>
              </div>
              <Link 
                href={'/join-event'}
                className="block w-full text-center py-2.5 px-4 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-all text-sm"
              >
                Join Event
              </Link>
            </div>
          </div>

          {/* কার্ড ২: Tree Plantation */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div className="relative w-full h-48 bg-gray-100">
              <Image 
                src={'/images/tree-plantation.png'} 
                alt='tree-plantation' 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Tree Plantation
                </h3>
                <p className="text-gray-500 text-sm mt-1">City Park</p>
              </div>
              <Link 
                href={'/join-event'}
                className="block w-full text-center py-2.5 px-4 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-all text-sm"
              >
                Join Event
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
    );
};

export default FindEvent ;