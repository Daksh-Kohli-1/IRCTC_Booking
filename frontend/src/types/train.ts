export type SeatClass = "SL" | "3A" | "2A" | "1A";

export interface Train {
  id: string;
  name: string;
  number: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  classesAvailable: SeatClass[];
}