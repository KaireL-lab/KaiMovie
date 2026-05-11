"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const NX_KEY = "nx_7cdacbf0bdd9240042f0871f07c4f317";

function getVidLinkUrl(type, id, s, e, subUrl) {
  const base = type === "movie"
    ? `https://vidlink.pro/movie/${id}?primaryColor=0089FF&secondaryColor=0A1128&iconColor=0089FF&autoplay=true`
    : `https://vidlink.pro/tv/${id}/${s}/${e}?primaryColor=0089FF&secondaryColor=0A1128&iconColor=0089FF&autoplay=true&nextbutton=true`;
  if (subUrl) {
    return `${base}&sub_file=${encodeURIComponent(subUrl)}&sub_label=Indonesia`;
  }
  return base;
}

const SERVERS = [
  {
    label: "VidLink",
    desc: "HD + Sub Indo",
    id: "vidlink",
    getUrl: (type, id, s, e) =>
      getVidLinkUrl(type, id, s, e, null),
  },
  {
    label: "NexStream",
    desc: "No ads, HD",
    id: "nexstream",
    getUrl: (type, id, s, e) =>
      type === "movie"
        ? `https://api.codespecters.com/embed/movie/${id}?apikey=${NX_KEY}`
        : `https://api.codespecters.com/embed/tv/${id}/${s}/${e}?apikey=${NX_KEY}`,
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

export default function SafePlayer({ tmdbId, type = "movie", season = 1, episode = 1, title = "", poster = "" }) {
  const [activeServer, setActiveServer] = useState(0);
  const [shieldActive, setShieldActive] = useState(true);
  const [subUrl, setSubUrl] = useState(null);
  const clickCount = useRef(0);
  const { addToHistory } = useAuth();

  // Save to watch history
  useEffect(() => {
    if (tmdbId && title) {
      addToHistory({
        id: tmdbId,
        type,
        title,
        poster,
        season: type === "tv" ? season : undefined,
        episode: type === "tv" ? episode : undefined,
      });
    }
  }, [tmdbId, type, season, episode]);

  // Fetch Indonesian subtitle
  useEffect(() => {
    async function fetchSub() {
      try {
        const params = new URLSearchParams({ id: tmdbId, type, s: season, e: episode });
        const res = await fetch(`/api/subtitle?${params}`);
        const data = await res.json();
        if (data.subtitles && data.subtitles.length > 0) {
          const sub = data.subtitles[0];
          setSubUrl(sub.url || sub.download_url || null);
        }
      } catch (e) {}
    }
    fetchSub();
  }, [tmdbId, type, season, episode]);

  // Build embed URL - inject subtitle for VidLink
  const getEmbedUrl = () => {
    const server = SERVERS[activeServer];
    if (server.id === "vidlink" && subUrl) {
      return getVidLinkUrl(type, tmdbId, season, episode, subUrl);
    }
    return server.getUrl(type, tmdbId, season, episode);
  };
  const embedUrl = getEmbedUrl();

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
          <p className="text-center text-xs text-yellow-500/80 mt-2 animate-pulse">Klik area player 2x untuk membuka video (ini memblokir iklan pop-up)</p>
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
              <span className="block text-[10px] opacity-60">
                {server.id === "vidlink" && subUrl ? "HD + Sub Indo ✓" : server.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
