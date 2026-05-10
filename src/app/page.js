import { getTrending, getPopular, getNowPlaying, getTopRated, getUpcoming } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, TrendingUp, Clapperboard, Flame, Award, Calendar } from "lucide-react";
import { getBackdropUrl } from "@/lib/tmdb";

export default async function HomePage() {
  const [trending, popular, nowPlaying, topRated, upcoming] = await Promise.all([
    getTrending(),
    getPopular(),
    getNowPlaying(),
    getTopRated(),
    getUpcoming(),
  ]);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider movies={trending.results} />

      {/* Movie Sections */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-16 relative z-10 space-y-14 pb-10">
        {/* Trending */}
        <MovieSection
          title="Trending Minggu Ini"
          icon={<TrendingUp className="w-5 h-5 text-accent" />}
          movies={trending.results}
          count={12}
        />

        {/* Now Playing */}
        <MovieSection
          title="Sedang Tayang"
          icon={<Clapperboard className="w-5 h-5 text-accent" />}
          movies={nowPlaying.results}
          count={12}
        />

        {/* Popular - Featured row */}
        <MovieSection
          title="Film Populer"
          icon={<Flame className="w-5 h-5 text-accent" />}
          movies={popular.results}
          count={18}
        />

        {/* Top Rated */}
        <MovieSection
          title="Rating Tertinggi"
          icon={<Award className="w-5 h-5 text-accent" />}
          movies={topRated.results}
          count={12}
        />

        {/* Upcoming */}
        <MovieSection
          title="Segera Tayang"
          icon={<Calendar className="w-5 h-5 text-accent" />}
          movies={upcoming.results}
          count={12}
        />
      </div>
    </div>
  );
}

function MovieSection({ title, icon, movies, count = 12 }) {
  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
        {movies.slice(0, count).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
