import { getGenres } from "@/lib/tmdb";
import Link from "next/link";
import { Film } from "lucide-react";

export const metadata = {
  title: "Genre Film - KaiMovie",
};

const genreColors = [
  "from-red-500 to-orange-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-pink-500",
  "from-yellow-500 to-amber-500",
  "from-indigo-500 to-violet-500",
  "from-teal-500 to-green-500",
  "from-rose-500 to-red-500",
  "from-sky-500 to-blue-500",
  "from-fuchsia-500 to-purple-500",
];

export default async function GenrePage() {
  const data = await getGenres();
  const genres = data.genres || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Film className="w-6 h-6 text-accent" />
        <h1 className="text-2xl font-bold">Genre Film</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genres.map((genre, index) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${
              genreColors[index % genreColors.length]
            } hover:scale-105 transition-transform duration-200`}
          >
            <span className="font-semibold text-lg">{genre.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
