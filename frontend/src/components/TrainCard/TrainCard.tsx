import Link from "next/link";
import { Train } from "@/types/train";

interface TrainCardProps {
  train: Train;
}

export default function TrainCard({ train }: TrainCardProps) {
  return (
    <Link
      href={`/trains/${train.id}`}
      className="block border rounded-lg p-4 flex justify-between items-center bg-white hover:border-blue-500 hover:shadow-md transition-all"
    >
      <div>
        <p className="font-semibold text-black">
          {train.name} ({train.number})
        </p>
        <p className="text-sm text-black">
          {train.from} → {train.to}
        </p>
        <p className="text-xs text-gray-950 mt-1">
          Classes: {train.classesAvailable.join(", ")}
        </p>
      </div>
      <p className="text-sm font-medium text-black">
        {train.departureTime} - {train.arrivalTime}
      </p>
    </Link>
  );
}
