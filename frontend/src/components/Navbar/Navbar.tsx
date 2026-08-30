"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("loggedInUser"));
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-700 text-white shadow-md">
      <Link href="/" className="font-bold text-xl tracking-tight">
        RailBook
      </Link>
      <div className="flex gap-6 text-sm font-medium items-center">
        <Link href="/bookings" className="hover:text-white transition-colors">
          My Bookings
        </Link>
        {loggedInUser ? (
          <span className="text-white">{loggedInUser}</span>
        ) : (
          <Link href="/login" className="hover:text-white transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
