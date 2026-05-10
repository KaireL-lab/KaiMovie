import { getMoviesByGenre, getGenres } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export async function generateMetadata({ params }) {
  const data = await getGenres();
  const genre = data.genres?.find((g) => g.id === parseInt(params.id));
  return {
    title: `Film ${genre?.name || "Genre"} - KaiMovie`,
  };
}

export default async function GenreMoviesPage({ params, searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const [moviesData, genresData] = await Promise.all([
    getMoviesByGenre(params.id, page),
    getGenres(),
  ]);

  const genre = genresData.genres?.find((g) => g.id === parseInt(params.id));
  const movies = moviesData.results || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">Film {genre?.name || "Genre"}</h1>
      <p className="text-gray-400 mb-8">
        Halaman {page} dari {moviesData.total_pages}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {page > 1 && (
          <a
            href={`/genre/${params.id}?page=${page - 1}`}
            className="btn-secondary text-sm"
          >
            Sebelumnya
          </a>
        )}
        {page < moviesData.total_pages && (
          <a
            href={`/genre/${params.id}?page=${page + 1}`}
            className="btn-secondary text-sm"
          >
            Selanjutnya
          </a>
        )}
      </div>
    </div>
  );
}
