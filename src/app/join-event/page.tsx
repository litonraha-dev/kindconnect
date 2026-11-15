
"use client";

import React, { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

const JoinEvent = () => {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  const handleJoinEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const joinEvent = {
      userId: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      phone: formData.get("phone"),
      address: formData.get("address"),
      message: formData.get("message"),
    };

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/join-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(joinEvent),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to join event");
      }

      toast.success("Successfully joined the event!");
      form.reset();

    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
    console.log(joinEvent, "from join-event")
  };

  if (isPending) {
    return <p className="py-20 text-center">Loading...</p>;
  }

  if (!session?.user) {
    return (
      <p className="py-20 text-center">
        Please login to join this event.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Join Event
          </h1>
          <p className="mt-2 text-gray-500">
            Complete your information to participate in this event.
          </p>
        </div>

        {/* User Information */}
        <div className="mb-8 flex items-center gap-4 rounded-xl bg-blue-50 p-4">
          {session.user.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="h-14 w-14 rounded-full object-cover"
            />
          )}

          <div>
            <h3 className="font-semibold text-gray-900">
              {session.user.name}
            </h3>
            <p className="text-sm text-gray-500">
              {session.user.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleJoinEvent} className="space-y-5">

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Address
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="Enter your address"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Why do you want to join?
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="Write your message..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Event"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default JoinEvent;
