import { Passenger } from "./passenger";
import { Train } from "./train";

export type PaymentStatus = "pending" | "success" | "failed";
export type BookingStatus = "confirmed" | "cancelled";

export interface Booking {
  id: string;
  train: Train;
  seatClass: string;
  seats: string[];
  passengers: Passenger[];
  totalFare: number;
  status: PaymentStatus;
  bookingStatus: BookingStatus;
}