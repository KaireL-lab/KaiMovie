import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { Search } from "lucide-react";

export function generateMetadata({ searchParams }) {
  return {
    title: `Hasil Pencarian "${searchParams.q || ""}" - KaiMovie`,
  };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const page = parseInt(searchParams.page) || 1;

  let results = { results: [], total_pages: 0, total_results: 0 };
  if (query) {
    results = await searchMovies(query, page);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Search className="w-6 h-6 text-accent" />
        <h1 className="text-2xl font-bold">
          {query ? `Hasil pencarian: "${query}"` : "Pencarian"}
        </h1>
      </div>

      {!query && (
        <p className="text-gray-400">Masukkan kata kunci di kolom pencarian untuk mencari film.</p>
      )}

      {query && results.results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Tidak ada hasil untuk &quot;{query}&quot;</p>
          <p className="text-gray-500 mt-2">Coba kata kunci lain</p>
        </div>
      )}

      {results.results.length > 0 && (
        <>
          <p className="text-gray-400 mb-6">
            Ditemukan {results.total_results} film
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          {results.total_pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {page > 1 && (
                <a
                  href={`/search?q=${query}&page=${page - 1}`}
                  className="btn-secondary text-sm"
                >
                  Sebelumnya
                </a>
              )}
              <span className="px-4 py-2 text-sm">
                Halaman {page} dari {results.total_pages}
              </span>
              {page < results.total_pages && (
                <a
                  href={`/search?q=${query}&page=${page + 1}`}
                  className="btn-secondary text-sm"
                >
                  Selanjutnya
                </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
