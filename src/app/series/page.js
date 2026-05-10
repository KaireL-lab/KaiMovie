import { getTrendingSeries } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { Tv } from "lucide-react";

export const metadata = {
  title: "Series - KaiMovie",
};

export default async function SeriesPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const data = await getTrendingSeries(page);
  const series = data.results || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Tv className="w-6 h-6 text-accent" />
        <h1 className="text-2xl font-bold">Series Populer</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {series.map((item) => (
          <MovieCard key={item.id} movie={item} type="series" />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {page > 1 && (
          <a href={`/series?page=${page - 1}`} className="btn-secondary text-sm">
            Sebelumnya
          </a>
        )}
        {page < data.total_pages && (
          <a href={`/series?page=${page + 1}`} className="btn-secondary text-sm">
            Selanjutnya
          </a>
        )}
      </div>
    </div>
  );
}
