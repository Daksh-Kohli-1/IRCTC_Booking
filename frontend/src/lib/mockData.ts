import { Train } from "@/types/train";
import { SeatClass } from "@/types/train";

// Very simplified fare logic — a real backend would have actual pricing tables.
const FARE_PER_CLASS: Record<SeatClass, number> = {
  SL: 500,
  "3A": 1200,
  "2A": 1800,
  "1A": 3000,
};

export function calculateFare(seatClass: SeatClass, numberOfPassengers: number): number {
  return FARE_PER_CLASS[seatClass] * numberOfPassengers;
}
export const mockTrains: Train[] = [
  {
    id: "1",
    name: "Rajdhani Express",
    number: "12301",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "16:00",
    arrivalTime: "08:30",
    classesAvailable: ["SL", "3A", "2A", "1A"],
  },
  {
    id: "2",
    name: "Shatabdi Express",
    number: "12002",
    from: "Delhi",
    to: "Chandigarh",
    departureTime: "07:20",
    arrivalTime: "10:45",
    classesAvailable: ["3A", "2A"],
  },
];