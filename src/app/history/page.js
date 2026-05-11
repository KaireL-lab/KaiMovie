"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Play, Trash2 } from "lucide-react";

export default function HistoryPage() {
  const { user, getHistory } = useAuth();
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    setHistory(getHistory());
  }, [user, router, getHistory]);

  const clearHistory = () => {
    if (!user) return;
    localStorage.removeItem(`kaimovie_history_${user.username}`);
    setHistory([]);
  };

  const timeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} menit lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-bold">History Nonton</h1>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
            <Trash2 className="w-4 h-4" /> Hapus Semua
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20">
          <Clock className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Belum ada history nonton</p>
          <Link href="/browse" className="inline-block mt-4 px-6 py-2 bg-accent rounded-full text-sm font-medium hover:bg-accent/80 transition-colors">
            Mulai Nonton
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {history.map((item, i) => (
            <Link
              key={i}
              href={item.type === "movie" ? `/movie/${item.id}` : `/series/${item.id}`}
              className="group relative rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="aspect-[2/3] relative">
                <img
                  src={item.poster ? `https://image.tmdb.org/t/p/w300${item.poster}` : "/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{timeAgo(item.watchedAt)}</p>
                {item.episode && (
                  <p className="text-xs text-accent mt-0.5">S{item.season} E{item.episode}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
