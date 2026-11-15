
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {  useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      toast.success("Logged out successfully!");
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
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
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
    <Button
      variant="outline"
      className="flex items-center gap-2 rounded-full px-3"
    >
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={session.user.image || ""}
          alt={session.user.name || "User"}
        />
        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
          {session.user.name?.charAt(0).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <span className="max-w-32 truncate">
        {session.user.name}
      </span>
    </Button>
  }
            />

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => router.push("/dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
