import { getTrending, getPopular, getNowPlaying, getTopRated } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function HomePage() {
  const [trending, popular, nowPlaying, topRated] = await Promise.all([
    getTrending(),
    getPopular(),
    getNowPlaying(),
    getTopRated(),
  ]);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider movies={trending.results} />

      {/* Movie Sections */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* Trending */}
        <MovieSection title="Trending Minggu Ini" movies={trending.results} />

        {/* Now Playing */}
        <MovieSection title="Sedang Tayang" movies={nowPlaying.results} />

        {/* Popular */}
        <MovieSection title="Film Populer" movies={popular.results} />

        {/* Top Rated */}
        <MovieSection title="Rating Tertinggi" movies={topRated.results} />
      </div>
    </div>
  );
}

function MovieSection({ title, movies, href }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">{title}</h2>
        {href && (
          <Link href={href} className="text-accent text-sm flex items-center gap-1 hover:underline">
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.slice(0, 12).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
