"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info, ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";
import { getBackdropUrl } from "@/lib/tmdb";

export default function HeroSlider({ movies }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slides = movies.slice(0, 6);

  const goTo = useCallback((index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const movie = slides[current];
  if (!movie) return null;

  return (
    <div className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <Image
          src={getBackdropUrl(movie.backdrop_path) || ""}
          alt={movie.title}
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary" />
      </div>

      {/* Content */}
      <div className={`relative h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-end pb-24 md:pb-32 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent/90 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase">Trending</span>
            <span className="text-sm text-gray-300 font-medium">#{current + 1} Trending Minggu Ini</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-[1.1] tracking-tight">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 mb-5 text-sm">
            <span className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full font-semibold">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-gray-400 font-medium">
              {movie.release_date?.split("-")[0]}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-wider">HD</span>
          </div>

          <p className="text-gray-300/90 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-8 leading-relaxed max-w-xl">
            {movie.overview || "Tidak ada deskripsi tersedia."}
          </p>

          <div className="flex gap-3">
            <Link href={`/watch/${movie.id}`} className="btn-primary flex items-center gap-2.5 text-base">
              <Play className="w-5 h-5 fill-white" />
              Nonton Sekarang
            </Link>
            <Link href={`/movie/${movie.id}`} className="btn-secondary flex items-center gap-2.5 text-base">
              <Info className="w-5 h-5" />
              Selengkapnya
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button onClick={prev} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 glass hover:bg-white/10 p-3 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100 md:opacity-60 hover:scale-110">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 glass hover:bg-white/10 p-3 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100 md:opacity-60 hover:scale-110">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress bar + dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === current ? 48 : 16 }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full" />
            {i === current && (
              <div className="absolute inset-0 bg-accent rounded-full animate-[progress_7s_linear]" 
                style={{ animation: "progress 7s linear" }} />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
