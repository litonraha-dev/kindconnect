
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  LogOut,
  LayoutDashboard,
  CalendarDays,
  Settings,
  Home,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

const SessionPage = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <p className="text-gray-500">Loading dashboard...</p>
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
          className="rounded-lg bg-emerald-600 px-6 py-3 text-white"
        >
          Sign In
        </button>
      </div>
    );
  }

  const { user, session } = data;

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Events",
      href:"/my-events",
      icon: CalendarDays,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b bg-white p-4 lg:hidden">
        <h1 className="text-xl font-bold text-emerald-600">
          Dashboard
        </h1>

        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex">

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-white p-5 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* <h1 className="mb-10 text-2xl font-bold text-emerald-600">
            My Dashboard
          </h1> */}

          {/* User */}
          <div className="mb-8 flex items-center gap-3 border-b pb-6">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <User className="text-emerald-600" />
              </div>
            )}

            <div className="min-w-0">
              <h3 className="truncate font-semibold">
                {user.name}
              </h3>
              <p className="truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    item.name === "Dashboard"
                      ? "bg-emerald-50 font-semibold text-emerald-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </nav>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          >
            <LogOut size={19} />
            {loading ? "Signing Out..." : "Sign Out"}
          </button>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-8">

          {/* Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome, {user.name}!
              </h2>
              <p className="mt-2 text-gray-500">
                Manage your account and event activities.
              </p>
            </div>

            <div className="rounded-lg bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              <ShieldCheck className="mr-1 inline" size={16} />
              Active Account
            </div>
          </div>

          {/* Overview Cards */}
          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <User size={22} />
              </div>
              <p className="text-sm text-gray-500">Account Name</p>
              <h3 className="mt-1 text-xl font-bold">
                {user.name}
              </h3>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Mail size={22} />
              </div>
              <p className="text-sm text-gray-500">Email Address</p>
              <h3 className="mt-1 break-all text-lg font-bold">
                {user.email}
              </h3>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Calendar size={22} />
              </div>
              <p className="text-sm text-gray-500">Session Expires</p>
              <h3 className="mt-1 text-lg font-bold">
                {new Date(session.expiresAt).toLocaleDateString()}
              </h3>
            </div>

          </div>

          {/* Profile Information */}
          <div className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Account Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Your personal account details.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Full Name
                </p>
                <p className="font-semibold">{user.name}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Email Address
                </p>
                <p className="break-all font-semibold">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  User ID
                </p>
                <p className="break-all font-semibold">
                  {user.id}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Email Verified
                </p>
                <p className="font-semibold">
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Account Created
                </p>
                <p className="font-semibold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Session Status
                </p>
                <p className="font-semibold text-emerald-600">
                  Active
                </p>
              </div>

            </div>

          </div>

          {/* Quick Action */}
          <div className="mt-8 rounded-xl bg-emerald-600 p-6 text-white sm:p-8">
            <h3 className="text-xl font-bold">
              Ready to explore events?
            </h3>

            <p className="mt-2 text-emerald-50">
              Discover upcoming events and participate in your
              favorite activities.
            </p>

            <Link
              href="/events"
              className="mt-5 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Explore Events
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
};

export default SessionPage;
