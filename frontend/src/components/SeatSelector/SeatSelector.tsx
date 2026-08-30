"use client";

import { useState } from "react";

interface SeatSelectorProps {
  totalSeats?: number;
  maxSelectable: number;
  onConfirm: (selectedSeats: string[]) => void;
}

const bookedSeats = new Set(["S4", "S9", "S18", "S25", "S31"]);

export default function SeatSelector({
  totalSeats = 32,
  maxSelectable,
  onConfirm,
}: SeatSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggleSeat(seatLabel: string) {
    setSelected((prev) => {
      if (prev.includes(seatLabel)) {
        return prev.filter((s) => s !== seatLabel);
      }
      if (prev.length >= maxSelectable) {
        return prev;
      }
      return [...prev, seatLabel];
    });
  }

  const seatLabels = Array.from({ length: totalSeats }, (_, i) => `S${i + 1}`);
  const berthLabels = ["LB", "MB", "UB", "SL", "SU"];
  const rows = Array.from({ length: Math.ceil(seatLabels.length / 8) }, (_, i) =>
    seatLabels.slice(i * 8, i * 8 + 8)
  );

  function renderSeat(seat: string, berth: string) {
    const isSelected = selected.includes(seat);
    const isBooked = bookedSeats.has(seat);

    return (
      <button
        key={seat}
        type="button"
        disabled={isBooked}
        aria-pressed={isSelected}
        onClick={() => toggleSeat(seat)}
        className={`flex h-14 min-w-0 flex-col items-center justify-center rounded-md border text-xs font-semibold transition-colors ${
          isBooked
            ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-900"
            : isSelected
              ? "border-green-600 bg-green-600 text-white"
              : "border-blue-200 bg-white text-gray-800 hover:border-blue-500 hover:bg-blue-50"
        }`}
      >
        <span>{seat}</span>
        <span className={`text-[10px] ${isSelected ? "text-white" : "text-gray-900"}`}>
          {berth}
        </span>
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-950">Select your seats</h2>
          <p className="text-sm text-gray-900">
            Choose up to {maxSelectable} seat{maxSelectable > 1 ? "s" : ""}. {selected.length} selected.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-900">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-sm border border-blue-200 bg-white" />
            Available
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-sm bg-green-600" />
            Selected
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-sm bg-gray-200" />
            Booked
          </span>
        </div>
      </div>

      <div className="mb-4 rounded-md border border-dashed border-gray-300 bg-gray-50 p-3">
        <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase text-gray-900">
          <span>Entry</span>
          <span>Coach Layout</span>
        </div>

        <div className="flex flex-col gap-3">
          {rows.map((row, rowIndex) => {
            const cabinSeats = row.slice(0, 6);
            const sideSeats = row.slice(6, 8);

            return (
              <div
                key={rowIndex}
                className="grid grid-cols-[1fr_28px_76px] items-center gap-2 sm:grid-cols-[1fr_44px_96px]"
              >
                <div className="grid grid-cols-3 gap-2">
                  {cabinSeats.map((seat, seatIndex) =>
                    renderSeat(seat, berthLabels[seatIndex % 3])
                  )}
                </div>
                <div className="flex h-full items-center justify-center">
                  <span className="h-full w-px bg-gray-300" />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {sideSeats.map((seat, seatIndex) =>
                    renderSeat(seat, berthLabels[seatIndex + 3])
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mb-4 min-h-5 text-sm font-medium text-gray-950">
        {selected.length > 0
          ? `Selected seats: ${selected.join(", ")}`
          : "No seats selected yet."}
      </p>

      <button
        type="button"
        disabled={selected.length === 0}
        onClick={() => onConfirm(selected)}
        className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue with {selected.length} seat{selected.length !== 1 ? "s" : ""}
      </button>
    </div>
  );
}
