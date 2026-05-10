import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-primary" />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/favicon.svg" alt="KaiMovie" className="w-10 h-10" />
              <span className="text-2xl font-extrabold tracking-tight">
                Kai<span className="text-accent">Movie</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Nonton film dan series favorit kamu secara gratis dengan subtitle Indonesia. 
              Streaming HD kualitas terbaik, update setiap hari.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Navigasi</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <Link href="/" className="hover:text-white hover:translate-x-1 transition-all duration-200">Home</Link>
              <Link href="/genre" className="hover:text-white hover:translate-x-1 transition-all duration-200">Genre</Link>
              <Link href="/series" className="hover:text-white hover:translate-x-1 transition-all duration-200">Series</Link>
              <Link href="/search" className="hover:text-white hover:translate-x-1 transition-all duration-200">Pencarian</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Disclaimer</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              KaiMovie tidak menyimpan file film di server kami. Semua konten disediakan oleh pihak ketiga yang tidak berafiliasi.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} KaiMovie. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Powered by TMDB API
          </p>
        </div>
      </div>
    </footer>
  );
}
