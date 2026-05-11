"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Film, Tv, Home, User, LogOut, History } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const NavLink = ({ href, icon, label }) => (
    <Link href={href} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
      {icon} {label}
    </Link>
  );

  const MobileLink = ({ href, onClick, icon, label }) => (
    <Link href={href} onClick={onClick} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
      {icon} <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/browse" className="flex items-center gap-2.5 group">
            <img src="/favicon.svg" alt="KaiMovie" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-2xl font-extrabold tracking-tight">
              Kai<span className="text-accent">Movie</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/browse" icon={<Home className="w-4 h-4" />} label="Home" />
            <NavLink href="/genre" icon={<Film className="w-4 h-4" />} label="Genre" />
            <NavLink href="/series" icon={<Tv className="w-4 h-4" />} label="Series" />
          </div>

          {/* Search + Profile */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Cari film atau series..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full pl-5 pr-11 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/10 w-72 transition-all duration-300 placeholder:text-gray-500"
                />
                <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/history" className="p-2 rounded-full hover:bg-white/10 transition-colors" title="History">
                  <History className="w-5 h-5 text-gray-400" />
                </Link>
                <button onClick={logout} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5 text-gray-400" />
                </button>
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-sm font-bold">
                  {user.avatar}
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm font-medium hover:bg-accent/80 transition-colors">
                <User className="w-4 h-4" /> Masuk
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-5 border-t border-white/5 mt-2 pt-5 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari film atau series..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-5 pr-11 py-3 text-sm focus:outline-none focus:border-accent/60"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </form>
            <div className="flex flex-col gap-1">
              <MobileLink href="/browse" onClick={() => setMenuOpen(false)} icon={<Home className="w-4 h-4" />} label="Home" />
              <MobileLink href="/genre" onClick={() => setMenuOpen(false)} icon={<Film className="w-4 h-4" />} label="Genre" />
              <MobileLink href="/series" onClick={() => setMenuOpen(false)} icon={<Tv className="w-4 h-4" />} label="Series" />
              {user && <MobileLink href="/history" onClick={() => setMenuOpen(false)} icon={<History className="w-4 h-4" />} label="History" />}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              {user ? (
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-sm font-bold">{user.avatar}</div>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="p-2 rounded-lg hover:bg-white/10">
                    <LogOut className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 mx-4 py-3 bg-accent rounded-xl text-sm font-bold hover:bg-accent/80 transition-colors">
                  <User className="w-4 h-4" /> Masuk / Daftar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
