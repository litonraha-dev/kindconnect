"use client";

import Link from "next/link";
import { authClient, signOut } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error("Logout failed");
      return;
    }

    toast.success("Logged out successfully!");

    router.push("/sign-in");
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">

      <Link href="/" className="text-2xl font-bold text-emerald-600">
        KindConnect
      </Link>

      <div className="flex items-center gap-5">

        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>

        {isPending ? (
          <span>Loading...</span>
        ) : session?.user ? (
          <>
            <Link href="/session" className="font-medium">
              {session.user.name}
            </Link>

            <button
              onClick={handleSignOut}
              className="rounded-lg bg-red-500 px-4 py-2 text-white"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/sign-in">Sign In</Link>

            <Link
              href="/sign-up"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;