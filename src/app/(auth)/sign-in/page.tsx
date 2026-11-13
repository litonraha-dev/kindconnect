
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Heart } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const SignIn = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      toast.success("Signed in successfully!");

      router.push("/");
      router.refresh();

    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">

      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">

        {/* Logo */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <Heart className="h-7 w-7 fill-emerald-600 text-emerald-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue your KindConnect journey.
          </p>

        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
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
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don&npbs;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignIn;
