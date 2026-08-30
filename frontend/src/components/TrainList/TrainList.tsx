import { Train } from "@/types/train";
import TrainCard from "@/components/TrainCard/TrainCard";

interface TrainListProps {
  trains: Train[];
}

export default function TrainList({ trains }: TrainListProps) {
  if (trains.length === 0) {
    return <p className="text-white">No trains found.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
}