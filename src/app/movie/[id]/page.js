import { getMovieDetails } from "@/lib/tmdb";
import { getImageUrl, getBackdropUrl } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import { Play, Star, Clock, Calendar, Globe } from "lucide-react";

export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id);
  return {
    title: `${movie.title} - KaiMovie`,
    description: movie.overview,
  };
}

export default async function MovieDetailPage({ params }) {
  const movie = await getMovieDetails(params.id);

  const directors = movie.credits?.crew?.filter((c) => c.job === "Director") || [];
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const similar = movie.similar?.results?.slice(0, 6) || [];

  return (
    <div>
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={getBackdropUrl(movie.backdrop_path) || ""}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-48 md:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl mx-auto md:mx-0">
              <Image
                src={getImageUrl(movie.poster_path, "w500")}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-gray-400 italic mb-4">&quot;{movie.tagline}&quot;</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {movie.vote_average?.toFixed(1)} / 10
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {movie.runtime} menit
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {movie.release_date}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {movie.production_countries?.[0]?.name || "N/A"}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className="bg-white/10 hover:bg-accent/80 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            {/* Watch button */}
            <div className="flex gap-3 mb-6">
              <Link href={`/watch/${movie.id}`} className="btn-primary flex items-center gap-2">
                <Play className="w-5 h-5 fill-white" />
                Nonton Sekarang
              </Link>
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Trailer
                </a>
              )}
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Sinopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || "Tidak ada sinopsis tersedia."}
              </p>
            </div>

            {/* Directors */}
            {directors.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold">Sutradara: </span>
                <span className="text-gray-300">{directors.map((d) => d.name).join(", ")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-12">
            <h2 className="section-title">Pemeran</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {cast.map((person) => (
                <div key={person.id} className="text-center">
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-secondary mb-2">
                    <Image
                      src={getImageUrl(person.profile_path, "w185")}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium">{person.name}</p>
                  <p className="text-xs text-gray-400">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="section-title">Film Serupa</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similar.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
