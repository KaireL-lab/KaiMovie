"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/browse");
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Isi username dan password");
      return;
    }
    if (password.length < 4) {
      setError("Password minimal 4 karakter");
      return;
    }
    const result = isRegister ? register(username.trim(), password) : login(username.trim(), password);
    if (result.error) setError(result.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #040714 0%, #0a1628 50%, #040714 100%)" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/20 mb-5">
            <span className="text-4xl font-black text-accent">K</span>
          </div>
          <h1 className="text-3xl font-black">
            Kai<span className="text-accent">Movie</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Nonton Film & Series Gratis</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6 text-center">
            {isRegister ? "Buat Akun Baru" : "Masuk ke Akun"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-accent/60 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-accent/60 transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-lg py-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              {isRegister ? "Daftar" : "Masuk"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
              className="text-sm text-gray-400 hover:text-accent transition-colors"
            >
              {isRegister ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}
            </button>
          </div>
        </div>

        {/* Skip login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/browse")}
            className="text-sm text-gray-600 hover:text-gray-400 transition-colors"
          >
            Lewati, lanjut tanpa login →
          </button>
        </div>
      </div>
    </div>
  );
}
