"use client";

import { useState } from "react";
import { Passenger } from "@/types/passenger";

interface PassengerFormProps {
  seats: string[];
  seatClass: string;
  onConfirm: (passengers: Passenger[]) => void;
}

export default function PassengerForm({ seats, seatClass, onConfirm }: PassengerFormProps) {
  // One Passenger object per seat, all starting empty.
  const [passengers, setPassengers] = useState<Passenger[]>(
    seats.map(() => ({ name: "", age: 0, gender: "male", seatClass }))
  );

  function updatePassenger(index: number, field: keyof Passenger, value: string) {
    setPassengers((prev) =>
      prev.map((passenger, i) => {
        if (i !== index) return passenger; // leave every other passenger untouched
        return {
          ...passenger,
          [field]: field === "age" ? Number(value) : value,
        };
      })
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const allValid = passengers.every((p) => p.name.trim() !== "" && p.age > 0);
    if (!allValid) {
      alert("Please fill in a valid name and age for every passenger.");
      return;
    }

    onConfirm(passengers);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {seats.map((seat, index) => (
        <div key={seat} className="border border-gray-700 bg-gray-800 text-white rounded-lg p-4">
          <p className="font-medium mb-3">Passenger for seat {seat}</p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Full name"
              value={passengers[index].name}
              onChange={(e) => updatePassenger(index, "name", e.target.value)}
              className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 flex-1"
            />
            <input
              type="number"
              placeholder="Age"
              value={passengers[index].age || ""}
              onChange={(e) => updatePassenger(index, "age", e.target.value)}
              className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 w-20"
            />
            <select
              value={passengers[index].gender}
              onChange={(e) => updatePassenger(index, "gender", e.target.value)}
              className="border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors self-start"
      >
        Continue to review
      </button>
    </form>
  );
}