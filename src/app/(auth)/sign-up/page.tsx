
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Image as ImageIcon, Heart } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const SignUp = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image || undefined,
      });

      if (error) {
        toast.error(error.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully!");

      router.push("/");
      router.refresh();

    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">

      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">

        {/* Logo */}
        <div className="mb-7 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <Heart className="h-7 w-7 fill-emerald-600 text-emerald-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Join KindConnect
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create an account and start making a difference.
          </p>

        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-700">
              Profile Image URL (Optional)
            </label>

            <div className="relative">
              <ImageIcon className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Sign In */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUp;
