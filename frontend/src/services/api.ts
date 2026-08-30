import { Train } from "@/types/train";
import { Passenger } from "@/types/passenger";
import { Booking } from "@/types/booking";
import { mockTrains, calculateFare } from "@/lib/mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USE_REAL_API = Boolean(API_BASE_URL);
const BOOKINGS_STORAGE_KEY = "railbook_bookings";

// --- Local helpers for the mock "database" of bookings ---
// Only used while USE_REAL_API is false. Once a real backend exists,
// these are replaced by actual fetch() calls, same as everything else here.

function readAllBookingsFromStorage(): Booking[] {
  if (typeof window === "undefined") return []; // safety check for server-side calls
  const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Booking[]) : [];
}

function writeAllBookingsToStorage(bookings: Booking[]) {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

export async function searchTrains(from: string, to: string): Promise<Train[]> {
  if (USE_REAL_API) {
    const res = await fetch(
      `${API_BASE_URL}/trains?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
    if (!res.ok) throw new Error("Failed to search trains");
    return res.json();
  }

  return mockTrains.filter(
    (t) => t.from.toLowerCase() === from.toLowerCase() && t.to.toLowerCase() === to.toLowerCase()
  );
}

export async function getTrainById(id: string): Promise<Train | undefined> {
  if (USE_REAL_API) {
    const res = await fetch(`${API_BASE_URL}/trains/${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error("Failed to fetch train");
    return res.json();
  }

  return mockTrains.find((t) => t.id === id);
}

export async function createBooking(
  train: Train,
  seatClass: string,
  seats: string[],
  passengers: Passenger[]
): Promise<Booking> {
  if (USE_REAL_API) {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trainId: train.id, seatClass, seats, passengers }),
    });
    if (!res.ok) throw new Error("Failed to create booking");
    return res.json();
  }

  const booking: Booking = {
    id: `BK${Date.now()}`,
    train,
    seatClass,
    seats,
    passengers,
    totalFare: calculateFare(seatClass as never, passengers.length),
    status: "success",
    bookingStatus: "confirmed",
  };

  // Mock "save to database": append to the running list in localStorage.
  const allBookings = readAllBookingsFromStorage();
  allBookings.push(booking);
  writeAllBookingsToStorage(allBookings);

  return booking;
}

export async function getUserBookings(): Promise<Booking[]> {
  if (USE_REAL_API) {
    const res = await fetch(`${API_BASE_URL}/bookings`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
  }

  return readAllBookingsFromStorage();
}

export async function cancelBooking(bookingId: string): Promise<void> {
  if (USE_REAL_API) {
    const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to cancel booking");
    return;
  }

  const allBookings = readAllBookingsFromStorage();
  const updated = allBookings.map((b) =>
    b.id === bookingId ? { ...b, bookingStatus: "cancelled" as const } : b
  );
  writeAllBookingsToStorage(updated);
}

export async function loginUser(email: string, password: string): Promise<{ email: string }> {
  if (USE_REAL_API) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid email or password");
    return res.json();
  }

  return { email };
}