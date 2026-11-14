
import Link from 'next/link';
import React, { Suspense } from 'react';
import EventsCard from './events/EventsCard';

export const FindEvent = async() => {

const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`,{
        cache:"no-store"
    });
if(!res.ok){
    throw new Error("Failed to fetch events");
}

    const events = await res.json()
    console.log(events, "nwe");
    const slicedEvents = events.slice(0,3)
   return <EventsCard events = {slicedEvents}/>

  
    }



export function EventsSkeleton() {
  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="h-12 w-96 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-4 h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-sm border border-border bg-muted/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}




   const FindEventSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto space-y-10 px-6">

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Find Events Near You
            </h3>

            <p className="text-base text-gray-600 md:text-lg">
              Discover opportunities to help your community.
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search events or locations..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-green-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-3">
          {["All", "Environment", "Education", "Health"].map(
            (category) => (
              <Link
                key={category}
                href={
                  category === "All"
                    ? "/all"
                    : `/${category.toLowerCase()}`
                }
                className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-green-600 hover:text-green-600"
              >
                {category}
              </Link>
            )
          )}
        </div>

        {/* Upcoming Events */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <h4 className="text-xl font-bold text-gray-900">
            Upcoming Events
          </h4>

          <Link
            href="/events"
            className="text-sm font-semibold text-green-600"
          >
            View All →
          </Link>
        </div>

        {/* Events */}
        <Suspense fallback={<EventsSkeleton />}>
          <FindEvent />
        </Suspense>

      </div>
    </section>
  );
};

export default FindEventSection;