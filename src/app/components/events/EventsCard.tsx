
import Link from "next/link";
import {
  MapPin,
  Users,
  ArrowRight,
  CalendarDays,
  Tag,
} from "lucide-react";
import Image from "next/image";

interface Event {
  _id: string;
  title: string;
  category: string;
  location: string;
  participants: number;
  date?: string;
  image?: string;
}

interface EventsCardProps {
  events: Event[];
}

const EventsCard = ({ events }: EventsCardProps) => {
  console.log(events, "from events card")
  if (!events || events.length === 0) {
    return (
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CalendarDays size={30} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            No Events Found
          </h2>

          <p className="mt-2 text-gray-500">
            There are no events available right now.
            Check back later for upcoming events.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-wider text-green-600">
            KindConnect Community
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Events
          </h2>

          <p className="mt-3 max-w-2xl text-gray-500">
            Discover meaningful events, connect with people,
            and make a positive impact in your community.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event._id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Event Image */}
              <div className="relative h-52 overflow-hidden bg-green-50">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    height={100}
                    width={100}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <CalendarDays
                      size={55}
                      className="text-green-300"
                    />
                  </div>
                )}

                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-700 shadow-sm">
                    <Tag size={13} />
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="flex flex-1 flex-col p-6">

                <h3 className="line-clamp-2 text-xl font-bold text-gray-900 transition group-hover:text-green-700">
                  {event.title}
                </h3>

                {/* Event Information */}
                <div className="mt-5 space-y-3">

                  <div className="flex items-start gap-3 text-sm text-gray-500">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Users
                      size={18}
                      className="shrink-0 text-green-600"
                    />
                    <span>
                      {event.participants} Participants Joined
                    </span>
                  </div>

                  {event.date && (
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <CalendarDays
                        size={18}
                        className="shrink-0 text-green-600"
                      />
                      <span>
                        {new Date(event.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}

                </div>

                {/* Details Button */}
                <div className="mt-auto pt-6">
                  <Link
                    href={`/events/${event._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                  >
                    View Details
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Total Events */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Showing {events.length} events
        </p>

      </div>
    </section>
  );
};

export default EventsCard;
