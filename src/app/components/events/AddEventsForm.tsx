
"use client";

import { useState, type FormEvent } from "react";

const AddEventsForm = () => {
    const today = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().slice(0, 5);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    date: today,
    time: currentTime,
    description: "",
    image: "",
    participants: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "participants" ? Number(value) : value,
    }));
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

const res = await fetch('http://localhost:8000/create-events',{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(formData)
}

  )
  const data = await res.json()

//   console.log(data);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Create an Event
        </h1>
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
            <label className="block text-sm font-medium mb-2">
              Category *
            </label>
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
            <label className="block text-sm font-medium mb-2">
              Location *
            </label>
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
            <label className="block text-sm font-medium mb-2">
              Event Date *
            </label>
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
            <label className="block text-sm font-medium mb-2">
              Event Time *
            </label>
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
