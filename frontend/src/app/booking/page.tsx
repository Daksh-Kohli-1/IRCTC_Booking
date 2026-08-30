"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Train, SeatClass } from "@/types/train";
import { Passenger } from "@/types/passenger";
import { getTrainById, createBooking } from "@/services/api";
import { calculateFare } from "@/lib/mockData";
import SeatSelector from "@/components/SeatSelector/SeatSelector";
import PassengerForm from "@/components/PassengerForm/PassengerForm";

type BookingStep = "seats" | "passengers" | "review";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainId = searchParams.get("trainId") ?? "";
  const seatClass = (searchParams.get("class") ?? "SL") as SeatClass;

  const [train, setTrain] = useState<Train | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<BookingStep>("seats");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  useEffect(() => {
    async function loadTrain() {
      setLoading(true);
      const result = await getTrainById(trainId);
      setTrain(result ?? null);
      setLoading(false);
    }
    if (trainId) loadTrain();
  }, [trainId]);

  function handleSeatsConfirmed(seats: string[]) {
    setSelectedSeats(seats);
    setStep("passengers");
  }

  function handlePassengersConfirmed(confirmedPassengers: Passenger[]) {
    setPassengers(confirmedPassengers);
    setStep("review");
  }

  async function handleConfirmBooking() {
    if (!train) return;

    const booking = await createBooking(train, seatClass, selectedSeats, passengers);

    sessionStorage.setItem("latestBooking", JSON.stringify(booking));
    router.push("/booking/confirmation");
  }

  if (loading) {
    return <p className="p-6 text-gray-950">Loading train details...</p>;
  }

  if (!train) {
    return <p className="p-6 text-red-600">Train not found. Please search again.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-1">
        {train.name} — Class {seatClass}
      </h1>
      <p className="text-gray-950 mb-6">
        {train.from} → {train.to} · {train.departureTime} - {train.arrivalTime}
      </p>

      {step === "seats" && (
        <SeatSelector maxSelectable={4} onConfirm={handleSeatsConfirmed} />
      )}

      {step === "passengers" && (
        <PassengerForm
          seats={selectedSeats}
          seatClass={seatClass}
          onConfirm={handlePassengersConfirmed}
        />
      )}

      {step === "review" && (
        <div className="border rounded-lg p-5 bg-white">
          <h2 className="text-lg font-semibold text-black mb-3">Review your booking</h2>
          <ul className="flex flex-col gap-2 mb-4">
            {passengers.map((p, i) => (
              <li key={i} className="text-sm text-black">
                Seat {selectedSeats[i]}: {p.name}, {p.age} yrs, {p.gender}
              </li>
            ))}
          </ul>
          <p className="font-semibold text-black mb-4">
            Total Fare: ₹{calculateFare(seatClass, passengers.length)}
          </p>
          <button
            onClick={handleConfirmBooking}
            className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
          >
            Confirm & Pay
          </button>
        </div>
      )}
    </div>
  );
}
