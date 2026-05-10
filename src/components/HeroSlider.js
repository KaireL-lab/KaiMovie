"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getBackdropUrl } from "@/lib/tmdb";

export default function HeroSlider({ movies }) {
  const [current, setCurrent] = useState(0);
  const slides = movies.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  const movie = slides[current];
  if (!movie) return null;

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(movie.backdrop_path) || ""}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {movie.vote_average?.toFixed(1)}
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded">
              {movie.release_date?.split("-")[0]}
            </span>
            <span className="bg-accent px-2 py-0.5 rounded text-xs font-bold">HD</span>
          </div>

          <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-6">
            {movie.overview || "Tidak ada deskripsi tersedia."}
          </p>

          <div className="flex gap-3">
            <Link href={`/watch/${movie.id}`} className="btn-primary flex items-center gap-2">
              <Play className="w-5 h-5 fill-white" />
              Nonton
            </Link>
            <Link href={`/movie/${movie.id}`} className="btn-secondary flex items-center gap-2">
              <Info className="w-5 h-5" />
              Detail
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-accent w-8" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
