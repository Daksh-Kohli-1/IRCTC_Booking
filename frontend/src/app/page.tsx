import Image from "next/image";
import SearchForm from "@/components/SearchForm/SearchForm";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center bg-gray-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
        Book Your Train Tickets
      </h1>
      <p className="text-gray-950 mb-10 text-center max-w-md">
        Search trains between stations and book your journey in minutes.
      </p>
      <SearchForm />
      <div className="relative mt-12 h-56 w-full max-w-4xl overflow-hidden rounded-lg shadow-md sm:h-72">
        <Image
          src="/hero-train.jpg"
          alt="Train at a station"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
