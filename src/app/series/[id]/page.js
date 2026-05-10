import { getSeriesDetails } from "@/lib/tmdb";
import { getImageUrl, getBackdropUrl } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Play, Star, Calendar, Tv } from "lucide-react";

export async function generateMetadata({ params }) {
  const series = await getSeriesDetails(params.id);
  return {
    title: `${series.name} - KaiMovie`,
    description: series.overview,
  };
}

export default async function SeriesDetailPage({ params }) {
  const series = await getSeriesDetails(params.id);
  const cast = series.credits?.cast?.slice(0, 10) || [];

  return (
    <div>
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={getBackdropUrl(series.backdrop_path) || ""}
          alt={series.name}
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
                src={getImageUrl(series.poster_path, "w500")}
                alt={series.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{series.name}</h1>
            {series.tagline && (
              <p className="text-gray-400 italic mb-4">&quot;{series.tagline}&quot;</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {series.vote_average?.toFixed(1)} / 10
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {series.first_air_date}
              </span>
              <span className="flex items-center gap-1">
                <Tv className="w-4 h-4" />
                {series.number_of_seasons} Season
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {series.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/10 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Watch button */}
            <div className="flex gap-3 mb-6">
              <Link href={`/watch-series/${series.id}`} className="btn-primary flex items-center gap-2">
                <Play className="w-5 h-5 fill-white" />
                Nonton Sekarang
              </Link>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Sinopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {series.overview || "Tidak ada sinopsis tersedia."}
              </p>
            </div>

            {/* Seasons */}
            {series.seasons && series.seasons.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Seasons</h3>
                <div className="flex flex-wrap gap-2">
                  {series.seasons.map((season) => (
                    <span
                      key={season.id}
                      className="bg-white/10 px-3 py-2 rounded-lg text-sm"
                    >
                      {season.name} ({season.episode_count} eps)
                    </span>
                  ))}
                </div>
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
      </div>
    </div>
  );
}
