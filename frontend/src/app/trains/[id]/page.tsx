import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrainById } from "@/services/api";

export default async function TrainDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const train = await getTrainById(id);

  if (!train) {
    notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/search" className="text-blue-600 text-sm hover:underline">
        ← Back to results
      </Link>

      <h1 className="text-2xl font-bold text-black mt-2">{train.name}</h1>
      <p className="text-gray-950 mb-6">Train No. {train.number}</p>

      <div className="border rounded-lg p-5 flex justify-between items-center mb-6 bg-white">
        <div>
          <p className="text-sm text-gray-950">From</p>
          <p className="text-lg font-semibold text-black">{train.from}</p>
          <p className="text-sm text-gray-950 mt-1">{train.departureTime}</p>
        </div>
        <div className="text-gray-950">→</div>
        <div className="text-right">
          <p className="text-sm text-gray-950">To</p>
          <p className="text-lg font-semibold text-black">{train.to}</p>
          <p className="text-sm text-gray-950 mt-1">{train.arrivalTime}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-black mb-3">Select a class</h2>
      <div className="flex gap-3 flex-wrap">
        {train.classesAvailable.map((seatClass) => (
          <Link
            key={seatClass}
            href={`/booking?trainId=${train.id}&class=${seatClass}`}
            className="border rounded-md px-4 py-2 text-black bg-white hover:bg-blue-50 hover:border-blue-500 transition-colors"
          >
            {seatClass}
          </Link>
        ))}
      </div>
    </div>
  );
}
