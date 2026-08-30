"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Train } from "@/types/train";
import { searchTrains } from "@/services/api";
import TrainList from "@/components/TrainList/TrainList";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrains() {
      setLoading(true);
      const results = await searchTrains(from, to);
      setTrains(results);
      setLoading(false);
    }
    loadTrains();
  }, [from, to]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1 text-gray-900">
        {from} → {to}
      </h1>
      <p className="text-gray-950 mb-6">
        {loading ? "Searching..." : `${trains.length} train(s) found`}
      </p>

      {loading ? (
        <p className="text-gray-950">Loading trains...</p>
      ) : (
        <TrainList trains={trains} />
      )}
    </div>
  );
}
