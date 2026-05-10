import { getMovieDetails } from "@/lib/tmdb";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id);
  return {
    title: `Nonton ${movie.title} - KaiMovie`,
    description: `Streaming ${movie.title} sub Indo gratis di KaiMovie.`,
  };
}

export default async function WatchPage({ params }) {
  const movie = await getMovieDetails(params.id);
  const embedUrl = `https://vidsrc.xyz/embed/movie/${params.id}`;

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

      {/* Video Player */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
            referrerPolicy="origin"
          />
        </div>
      </div>

      {/* Info below player */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200">
            <p className="font-semibold mb-1">Catatan:</p>
            <p>Jika video tidak muncul, coba matikan AdBlocker atau gunakan browser lain. Server video disediakan oleh pihak ketiga.</p>
          </div>
        </div>

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

        {/* Server alternatives */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Pilih Server:</h3>
          <div className="flex flex-wrap gap-2">
            <ServerButton label="Server 1" url={`https://vidsrc.xyz/embed/movie/${params.id}`} active />
            <ServerButton label="Server 2" url={`https://vidsrc.to/embed/movie/${params.id}`} />
            <ServerButton label="Server 3" url={`https://multiembed.mov/?video_id=${params.id}&tmdb=1`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServerButton({ label, url, active }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-accent text-white"
          : "bg-white/10 hover:bg-white/20 text-gray-300"
      }`}
    >
      {label}
    </a>
  );
}
