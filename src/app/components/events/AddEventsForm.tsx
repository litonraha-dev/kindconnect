"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";

const AddEventsForm = () => {
  // ১. স্টেট এবং আজকের তারিখ ও সময় ইনিশিয়ালাইজ করা
  const [today, setToday] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    time: "",
    description: "",
    image: "",
    participants: 1,
  });

  // ২. কম্পোনেন্ট মাউন্ট হওয়ার পর ক্লায়েন্টে ডেট ও টাইম সেট হবে
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().slice(0, 5);

    setToday(currentDate);
    setFormData((prev) => ({
      ...prev,
      date: currentDate,
      time: currentTime,
    }));
  }, []);

  // ৩. ইনপুট পরিবর্তন হ্যান্ডেল করার জন্য ফাংশন
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ৪. ফর্ম সাবমিট হ্যান্ডেল করার জন্য ফাংশন
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Event Created Successfully:", data);
        alert("Event created successfully!");
        // চাইলে এখানে ফর্ম রিসেট বা অন্য পেজে রিডাইরেক্ট করতে পারেন
      } else {
        console.error("Failed to create event:", data);
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error. Please try again later.");
    }
  }; // অতিরিক্ত ব্র্যাকেটটি এখানে সঠিকভাবে বন্ধ করা হয়েছে

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create an Event</h1>
        <p className="text-gray-500 mt-2">
          Bring people together and make a positive impact.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
      >
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Category and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
            >
              <option value="">Select category</option>
              <option value="Environment">Environment</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Community">Community</option>
              <option value="Animal Welfare">Animal Welfare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Event Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Event Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event..."
            rows={5}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600 resize-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Event Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Participants */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Maximum Participants *
          </label>
          <input
            type="number"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            min={1}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AddEventsForm;