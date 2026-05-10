"use client";

import { useState } from "react";

const SERVERS = [
  { label: "Server 1", getUrl: (type, id, s, e) => type === "movie" ? `https://vidsrc.to/embed/movie/${id}` : `https://vidsrc.to/embed/tv/${id}/${s}/${e}` },
  { label: "Server 2", getUrl: (type, id, s, e) => type === "movie" ? `https://vidsrc.xyz/embed/movie/${id}` : `https://vidsrc.xyz/embed/tv/${id}/${s}/${e}` },
  { label: "Server 3", getUrl: (type, id, s, e) => type === "movie" ? `https://multiembed.mov/?video_id=${id}&tmdb=1` : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}` },
  { label: "Server 4", getUrl: (type, id, s, e) => type === "movie" ? `https://www.2embed.cc/embed/${id}` : `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}` },
];

export default function SafePlayer({ tmdbId, type = "movie", season = 1, episode = 1 }) {
  const [activeServer, setActiveServer] = useState(0);
  const embedUrl = SERVERS[activeServer].getUrl(type, tmdbId, season, episode);

  return (
    <div>
      {/* Player */}
      <div className="w-full max-w-6xl mx-auto bg-black">
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

      {/* Server buttons */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <p className="text-sm text-gray-400 mb-2">Pilih Server (ganti kalau ada iklan/error):</p>
        <div className="flex flex-wrap gap-2">
          {SERVERS.map((server, i) => (
            <button
              key={i}
              onClick={() => setActiveServer(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === activeServer
                  ? "bg-accent text-white"
                  : "bg-white/10 hover:bg-white/20 text-gray-300"
              }`}
            >
              {server.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
