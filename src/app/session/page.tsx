
"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  LogOut,
} from "lucide-react";

const SessionPage = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Sign out failed");
        return;
      }

      toast.success("Signed out successfully!");
      router.push("/sign-in");
      router.refresh();

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading session...</p>
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">
          You are not logged in!
        </h2>

        <button
          onClick={() => router.push("/sign-in")}
          className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  const { user, session } = data;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            My Session
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account and session information.
          </p>
        </div>

        {/* User Profile */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col items-center gap-4 border-b pb-6 sm:flex-row">

            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <User className="h-10 w-10 text-emerald-600" />
              </div>
            )}

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>

              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                <ShieldCheck size={14} />
                Active Session
              </span>
            </div>

          </div>

          {/* Account Information */}
          <div className="mt-6 space-y-5">

            <div className="flex items-start gap-4">
              <User className="mt-1 text-emerald-600" size={20} />

              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1 text-emerald-600" size={20} />

              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 text-emerald-600" size={20} />

              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="break-all font-medium text-gray-900">
                  {user.id}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="mt-1 text-emerald-600" size={20} />

              <div>
                <p className="text-sm text-gray-500">Session Expires</p>
                <p className="font-medium text-gray-900">
                  {new Date(session.expiresAt).toLocaleString()}
                </p>
              </div>
            </div>

          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            <LogOut size={18} />
            {loading ? "Signing Out..." : "Sign Out"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default SessionPage;
