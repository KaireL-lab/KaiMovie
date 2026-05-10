import { getSeriesDetails } from "@/lib/tmdb";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SafePlayer from "@/components/SafePlayer";
import AdBlockBanner from "@/components/AdBlockBanner";

export async function generateMetadata({ params }) {
  const series = await getSeriesDetails(params.id);
  return {
    title: `Nonton ${series.name} - KaiMovie`,
  };
}

export default async function WatchSeriesPage({ params, searchParams }) {
  const series = await getSeriesDetails(params.id);
  const season = searchParams.s || 1;
  const episode = searchParams.e || 1;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-primary/90 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href={`/series/${params.id}`}
            className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <h1 className="text-sm md:text-base font-medium truncate max-w-[60%]">
            {series.name} - S{season}E{episode}
          </h1>
        </div>
      </div>

      {/* Video Player with server switcher */}
      <SafePlayer tmdbId={params.id} type="tv" season={season} episode={episode} />

      {/* Episode selector */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AdBlockBanner />

        {/* Season & Episode selector */}
        <div className="bg-secondary/50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Pilih Episode:</h3>

          {/* Seasons */}
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">Season:</p>
            <div className="flex flex-wrap gap-2">
              {series.seasons?.filter(s => s.season_number > 0).map((s) => (
                <Link
                  key={s.id}
                  href={`/watch-series/${params.id}?s=${s.season_number}&e=1`}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    parseInt(season) === s.season_number
                      ? "bg-accent text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  S{s.season_number}
                </Link>
              ))}
            </div>
          </div>

          {/* Episodes */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Episode:</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                { length: series.seasons?.find(s => s.season_number === parseInt(season))?.episode_count || 10 },
                (_, i) => i + 1
              ).map((ep) => (
                <Link
                  key={ep}
                  href={`/watch-series/${params.id}?s=${season}&e=${ep}`}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    parseInt(episode) === ep
                      ? "bg-accent text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  E{ep}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
