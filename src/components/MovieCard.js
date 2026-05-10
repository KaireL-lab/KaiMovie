import Link from "next/link";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb";

export default function MovieCard({ movie, type = "movie" }) {
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;
  const year = date ? new Date(date).getFullYear() : "";
  const href = type === "movie" ? `/movie/${movie.id}` : `/series/${movie.id}`;
  const watchHref = type === "movie" ? `/watch/${movie.id}` : `/watch-series/${movie.id}`;

  return (
    <div className="movie-card group">
      <Link href={href} className="block">
        <div className="relative aspect-[2/3] bg-secondary/50 rounded-xl overflow-hidden">
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay always visible at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

          {/* Rating badge */}
          {movie.vote_average > 0 && (
            <div className="absolute top-2.5 left-2.5 glass rounded-lg px-2 py-1 flex items-center gap-1 text-xs font-semibold">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          )}

          {/* Quality badge */}
          <div className="absolute top-2.5 right-2.5 bg-accent/90 rounded-lg px-2 py-0.5 text-[10px] font-bold tracking-wider">
            HD
          </div>

          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 bg-accent/90 rounded-full flex items-center justify-center shadow-2xl shadow-accent/30 scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 fill-white text-white ml-0.5" />
            </div>
          </div>

          {/* Bottom info on hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="font-bold text-sm line-clamp-2 drop-shadow-lg">{title}</h3>
            <p className="text-[11px] text-gray-300 mt-1 font-medium">{year}</p>
          </div>
        </div>
      </Link>

      {/* Title below card */}
      <div className="mt-2.5 px-0.5">
        <Link href={href}>
          <h3 className="text-[13px] font-semibold line-clamp-1 hover:text-accent transition-colors">{title}</h3>
        </Link>
        <p className="text-[11px] text-gray-500 mt-0.5">{year}</p>
      </div>
    </div>
  );
}
