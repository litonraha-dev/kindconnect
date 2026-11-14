import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import EditEvent from "@/app/components/events/EditEvent";
import DeleteEvent from "@/app/components/events/DeleteEvent";
import Link from "next/link";

export const instant = false;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}`,
    {
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  const event = await res.json();
  console.log(event.id, "from id");
  return (
    <main>
       <div className="container mx-auto flex justify-end mt-5 max-w-4xl">
        <EditEvent  event={event} />
        <DeleteEvent event = {event}/>
       </div>
      <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
        {/* Event Image */}
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="flex justify-between">
            <p className="absolute top-5 left-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              {event.category}
            </p>
             
          </div>
          
        </div>

        {/* Event Information */}
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {event.title}
          </h1>

         
          
        
          <p className="mt-4 text-gray-600 leading-7">{event.description}</p>

          {/* Details Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <CalendarDays className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-500">Event Date</p>
                <p className="font-semibold text-gray-800">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <Clock className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-500">Event Time</p>
                <p className="font-semibold text-gray-800">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <MapPin className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-gray-800">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <Users className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-500">Participants</p>
                <p className="font-semibold text-gray-800">
                  {event.participants} People
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href={'/join-event'} className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition">
              Join Event
            </Link>

            <button className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition">
              Share Event
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
