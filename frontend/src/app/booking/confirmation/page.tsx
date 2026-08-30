"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Booking } from "@/types/booking";

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("latestBooking");
    if (stored) {
      setBooking(JSON.parse(stored) as Booking);
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p className="p-6 text-gray-950">Loading...</p>;
  }

  if (!booking) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 mb-4">No booking found.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="border-2 border-green-500 rounded-lg p-6 text-center mb-6">
        <p className="text-green-600 font-semibold text-lg mb-1">✓ Booking Confirmed</p>
        <p className="text-gray-950 text-sm">Booking ID: {booking.id}</p>
      </div>

      <h1 className="text-xl font-bold mb-1">{booking.train.name}</h1>
      <p className="text-gray-950 mb-4">
        {booking.train.from} → {booking.train.to} · {booking.train.departureTime} -{" "}
        {booking.train.arrivalTime} · Class {booking.seatClass}
      </p>

      <div className="border rounded-lg p-4 mb-4">
        <p className="font-medium mb-2">Passengers</p>
        <ul className="flex flex-col gap-1">
          {booking.passengers.map((p, i) => (
            <li key={i} className="text-sm text-gray-950">
              Seat {booking.seats[i]}: {p.name}, {p.age} yrs, {p.gender}
            </li>
          ))}
        </ul>
      </div>

      <p className="font-semibold text-lg mb-6">Total Paid: ₹{booking.totalFare}</p>

      <Link
        href="/"
        className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
      >
        Book another ticket
      </Link>
    </div>
  );
}
