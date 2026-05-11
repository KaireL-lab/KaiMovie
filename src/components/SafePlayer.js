"use client";

import { useState, useRef, useCallback } from "react";

const NX_KEY = "nx_7cdacbf0bdd9240042f0871f07c4f317";

const SERVERS = [
  {
    label: "NexStream",
    desc: "No ads, HD",
    getUrl: (type, id, s, e) =>
      type === "movie"
        ? `https://api.codespecters.com/embed/movie/${id}?apikey=${NX_KEY}`
        : `https://api.codespecters.com/embed/tv/${id}/${s}/${e}?apikey=${NX_KEY}`,
  },
  {
    label: "VidLink",
    desc: "Bersih",
    getUrl: (type, id, s, e) =>
      type === "movie"
        ? `https://vidlink.pro/movie/${id}?primaryColor=E50914&secondaryColor=170000&iconColor=E50914&autoplay=true`
        : `https://vidlink.pro/tv/${id}/${s}/${e}?primaryColor=E50914&secondaryColor=170000&iconColor=E50914&autoplay=true&nextbutton=true`,
  },
  {
    label: "VidSrc ICU",
    desc: "Minimal ads",
    getUrl: (type, id, s, e) =>
      type === "movie"
        ? `https://vidsrc.icu/embed/movie/${id}`
        : `https://vidsrc.icu/embed/tv/${id}/${s}/${e}`,
  },
  {
    label: "VidSrc Pro",
    desc: "Stabil",
    getUrl: (type, id, s, e) =>
      type === "movie"
        ? `https://vidsrc.pro/embed/movie/${id}`
        : `https://vidsrc.pro/embed/tv/${id}/${s}/${e}`,
  },
  {
    label: "VidSrc To",
    desc: "Backup",
    getUrl: (type, id, s, e) =>
      type === "movie"
        ? `https://vidsrc.to/embed/movie/${id}`
        : `https://vidsrc.to/embed/tv/${id}/${s}/${e}`,
  },
  {
    label: "SuperEmbed",
    desc: "Banyak source",
    getUrl: (type, id, s, e) =>
      type === "movie"
        ? `https://multiembed.mov/?video_id=${id}&tmdb=1`
        : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}`,
  },
];

export default function SafePlayer({ tmdbId, type = "movie", season = 1, episode = 1 }) {
  const [activeServer, setActiveServer] = useState(0);
  const [shieldActive, setShieldActive] = useState(true);
  const clickCount = useRef(0);
  const embedUrl = SERVERS[activeServer].getUrl(type, tmdbId, season, episode);

  const handleShieldClick = useCallback(() => {
    clickCount.current += 1;
    if (clickCount.current >= 2) {
      setShieldActive(false);
    }
  }, []);

  const handleServerChange = (i) => {
    setActiveServer(i);
    setShieldActive(true);
    clickCount.current = 0;
  };

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
          {/* Click shield - blocks first click (ad redirect), second click removes it */}
          {shieldActive && (
            <div
              onClick={handleShieldClick}
              className="absolute inset-0 cursor-pointer z-10"
              style={{ background: "transparent" }}
            />
          )}
        </div>
        {shieldActive && (
          <p className="text-center text-xs text-gray-500 mt-2">Klik 2x pada player untuk mulai nonton</p>
        )}
      </div>

      {/* Server buttons */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <p className="text-sm text-gray-400 mb-2">Pilih Server (ganti kalau ada iklan/error):</p>
        <div className="flex flex-wrap gap-2">
          {SERVERS.map((server, i) => (
            <button
              key={i}
              onClick={() => handleServerChange(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === activeServer
                  ? "bg-accent text-white"
                  : "bg-white/10 hover:bg-white/20 text-gray-300"
              }`}
            >
              {server.label}
              <span className="block text-[10px] opacity-60">{server.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
