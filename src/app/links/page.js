import Link from "next/link";
import { Download, Globe, Heart, MessageCircle, Smartphone, Bookmark } from "lucide-react";

export const metadata = {
  title: "KaiMovie - Links",
  description: "Halaman resmi KaiMovie. Download APK, donasi, dan info penting.",
};

const LINKS = [
  {
    label: "KE HALAMAN KAIMOVIE",
    href: "https://kai-movie.vercel.app",
    icon: Globe,
    primary: true,
  },
  {
    label: "DOWNLOAD APK (AD-FREE)",
    href: "https://github.com/KaireL-lab/KaiMovie/actions",
    icon: Download,
    primary: false,
  },
  {
    label: "DONASI / SUPPORT",
    href: "https://saweria.co/kaimovie",
    icon: Heart,
    primary: false,
  },
  {
    label: "GITHUB",
    href: "https://github.com/KaireL-lab/KaiMovie",
    icon: Bookmark,
    primary: false,
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/favicon.svg" alt="KaiMovie" className="w-20 h-20" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Kai<span className="text-accent">Movie</span> Official
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Halaman resmi <strong className="text-white">KaiMovie</strong>. Pastikan kamu menyimpan alamat ini agar tidak ketinggalan update film terbaru.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 ${
                link.primary
                  ? "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
                  : "glass hover:bg-white/10 text-white hover:-translate-y-0.5"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </a>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 glass rounded-xl">
          <p className="text-xs text-center text-gray-400 leading-relaxed">
            <span className="text-accent font-bold">Tips:</span> Gunakan browser <strong className="text-white">Brave</strong> untuk pengalaman nonton tanpa iklan. Download APK untuk versi mobile dengan built-in ad blocker.
          </p>
        </div>

        {/* Bookmark notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Bookmark URL: <span className="text-accent font-medium">kai-movie.vercel.app</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-gray-600">
            &copy; {new Date().getFullYear()} KaiMovie. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
