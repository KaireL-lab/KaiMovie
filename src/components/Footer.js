import { Film } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Film className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold">
                Kai<span className="text-accent">Movie</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Nonton film dan series favorit kamu secara gratis dengan subtitle Indonesia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Navigasi</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/genre" className="hover:text-white transition-colors">Genre</Link>
              <Link href="/series" className="hover:text-white transition-colors">Series</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-3">Informasi</h3>
            <p className="text-sm text-gray-400">
              KaiMovie tidak menyimpan file film di server kami. Semua konten disediakan oleh pihak ketiga yang tidak berafiliasi.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} KaiMovie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
