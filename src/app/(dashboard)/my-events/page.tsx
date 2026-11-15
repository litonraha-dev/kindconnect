
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { CalendarDays, MapPin, Pencil, Trash2, Users, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

interface JoinedEvent {
  _id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  status: string;
  location?: string;
  date?: string;
}

const MyEventsPage = () => {
  const { data: session, isPending } = useSession();

  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    const fetchMyEvents = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/join-event?userId=${session.user.id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [session?.user?.id, isPending]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this registration?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/join-event/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Failed to delete registration");
      }

      setEvents((prev) => prev.filter((event) => event._id !== id));
      toast.success("Registration deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete registration");
    }
  };

  if (isPending || loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!session?.user) {
    return <p className="text-center py-20">Please sign in first.</p>;
  }

  return (
   
 <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Dashboard / My Events
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Events
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage and track all your event registrations.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Explore Events
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Registrations
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {events.length}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <CalendarDays size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Your Participation
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {events.length > 0 ? "Active" : "None"}
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Users size={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Registered Events
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your event registration history.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {events.length} Events
            </span>
          </div>

          {events.length === 0 ? (
            <div className="px-5 py-20 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CalendarDays size={30} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                No events yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                You haven&nbsp;t joined any events. Discover exciting
                opportunities and become part of your community.
              </p>

              <Link
                href="/events"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Events
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Participant</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Location</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {events.map((event) => (
                      <tr
                        key={event._id}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="px-6 py-5">
                          <span className="font-semibold text-slate-900">
                            {event.name}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
                          {event.email}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
                          <span className="flex items-center gap-2">
                            <MapPin size={15} />
                            {event.location || "Not specified"}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
                          {event.date || "Not specified"}
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {event.status || "Pending"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/my-events/edit/${event._id}`}
                              title="Edit registration"
                              className="rounded-lg border border-slate-200 p-2.5 text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                            >
                              <Pencil size={17} />
                            </Link>

                            <button
                              onClick={() => handleDelete(event._id)}
                              title="Delete registration"
                              className="rounded-lg border border-slate-200 p-2.5 text-red-500 transition hover:border-red-200 hover:bg-red-50"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 p-4 md:hidden">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="rounded-xl border border-slate-200 p-4 transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {event.name}
                        </h3>
                        <p className="mt-1 break-all text-sm text-slate-500">
                          {event.email}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {event.status || "Pending"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-500">
                      <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        {event.location || "Not specified"}
                      </p>

                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        {event.date || "Not specified"}
                      </p>
                    </div>

                    <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                      <Link
                        href={`/my-events/edit/${event._id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(event._id)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </section>

  );
};

export default MyEventsPage;
