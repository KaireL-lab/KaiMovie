"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Film, Tv, Home } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Film className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold">
              Kai<span className="text-accent">Movie</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link href="/genre" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Film className="w-4 h-4" />
              Genre
            </Link>
            <Link href="/series" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Tv className="w-4 h-4" />
              Series
            </Link>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari film..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-accent w-64 transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </form>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari film..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-accent"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </form>
            <div className="flex flex-col gap-3">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-accent">
                <Home className="w-4 h-4" /> Home
              </Link>
              <Link href="/genre" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-accent">
                <Film className="w-4 h-4" /> Genre
              </Link>
              <Link href="/series" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-accent">
                <Tv className="w-4 h-4" /> Series
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
