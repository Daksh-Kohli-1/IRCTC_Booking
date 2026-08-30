"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!from.trim() || !to.trim()) {
      alert("Please enter both From and To stations.");
      return;
    }

    const params = new URLSearchParams({ from: from.trim(), to: to.trim() });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
        className="border rounded-md px-3 py-2 text-black bg-white placeholder-gray-900"
      />
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
        className="border rounded-md px-3 py-2 text-black bg-white placeholder-gray-900"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Search
      </button>
    </form>
  );
}
