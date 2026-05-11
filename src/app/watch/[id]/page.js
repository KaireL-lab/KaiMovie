import { getMovieDetails } from "@/lib/tmdb";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SafePlayer from "@/components/SafePlayer";
import AdBlockBanner from "@/components/AdBlockBanner";

export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id);
  return {
    title: `Nonton ${movie.title} - KaiMovie`,
    description: `Streaming ${movie.title} sub Indo gratis di KaiMovie.`,
  };
}

export default async function WatchPage({ params }) {
  const movie = await getMovieDetails(params.id);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-primary/90 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href={`/movie/${params.id}`}
            className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Detail
          </Link>
          <h1 className="text-sm md:text-base font-medium truncate max-w-[60%]">
            {movie.title}
          </h1>
        </div>
      </div>

      {/* Video Player with server switcher */}
      <SafePlayer tmdbId={params.id} type="movie" title={movie.title} poster={movie.poster_path} />

      {/* Info below player */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AdBlockBanner />

        <div className="bg-secondary/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genres?.map((g) => (
              <span key={g.id} className="bg-white/10 px-2 py-1 rounded text-xs">
                {g.name}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
