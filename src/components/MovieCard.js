import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb";

export default function MovieCard({ movie, type = "movie" }) {
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;
  const year = date ? new Date(date).getFullYear() : "";
  const href = type === "movie" ? `/movie/${movie.id}` : `/series/${movie.id}`;

  return (
    <Link href={href} className="movie-card group block">
      <div className="relative aspect-[2/3] bg-secondary rounded-lg overflow-hidden">
        <Image
          src={getImageUrl(movie.poster_path)}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover"
        />

        {/* Rating badge */}
        {movie.vote_average > 0 && (
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1 text-xs">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        )}

        {/* Quality badge */}
        <div className="absolute top-2 right-2 bg-accent rounded-md px-2 py-0.5 text-xs font-bold">
          HD
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-300 mt-1">{year}</p>
        </div>
      </div>

      {/* Title below card */}
      <div className="mt-2 px-1">
        <h3 className="text-sm font-medium line-clamp-1">{title}</h3>
        <p className="text-xs text-gray-400">{year}</p>
      </div>
    </Link>
  );
}
