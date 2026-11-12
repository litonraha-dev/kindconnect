import Link from 'next/link';
import EventsCard from '../components/events/EventsCard';
import { Event } from '../types/types';
// interface EventsProps{
//     event:Event;
// }


const Events = async() => {
    const res = await fetch('http://localhost:8000/events');
    const events = await res.json()
    console.log(events);
    return (
        <main className="max-w-7xl mx-auto px-4 py-12">

            {/* Page Heading */}
            <div className=" flex justify-between mb-8">
               <div>
                 <h1 className="text-3xl md:text-4xl font-bold">
                    Discover Events
                </h1>
                <p className="text-gray-500 mt-2">
                    Find opportunities to make a difference.
                </p>
               </div>
                 <div>
                <Link href={'create-events'} className='text-3xl md:text-4xl font-bold'>Add Events</Link>
            </div>
            </div>
           

            {/* Search */}
            <div className="w-full md:w-80 mb-8">
                <input
                    type="text"
                    placeholder="Search events or locations..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-green-600 shadow-sm text-sm"
                />
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                 {events.map((event:Event) => (
          <EventsCard key={event._id} event={event} />
        ))}

            </div>

        </main>
    );
};

export default Events;