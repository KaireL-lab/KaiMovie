# KaiMovie 🎬

Website nonton film & series gratis dengan subtitle Indonesia. Dibangun dengan Next.js + TMDB API.

## Fitur

- 🎬 Streaming film & series
- 🔍 Pencarian film
- 🎭 Filter berdasarkan genre
- 📱 Responsive (mobile & desktop)
- ⭐ Rating & info lengkap
- 🎬 Multiple server streaming

## Cara Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Dapatkan TMDB API Key (GRATIS)

1. Buka https://www.themoviedb.org/signup
2. Daftar akun (gratis)
3. Pergi ke Settings > API
4. Copy API Key (v3 auth)

### 3. Setup Environment

Edit file `.env.local` dan ganti `YOUR_TMDB_API_KEY_HERE` dengan API key kamu:

```
NEXT_PUBLIC_TMDB_API_KEY=api_key_kamu_disini
```

### 4. Jalankan

```bash
npm run dev
```

Buka http://localhost:3000

## Tech Stack

- **Next.js 14** - React Framework
- **TailwindCSS** - Styling
- **TMDB API** - Data film
- **VidSrc** - Embed streaming player
- **Lucide React** - Icons

## Struktur Folder

```
src/
├── app/
│   ├── page.js              # Homepage
│   ├── layout.js            # Root layout
│   ├── movie/[id]/page.js   # Detail film
│   ├── watch/[id]/page.js   # Nonton film
│   ├── series/              # Halaman series
│   ├── watch-series/        # Nonton series
│   ├── search/page.js       # Pencarian
│   └── genre/               # Filter genre
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── MovieCard.js
│   └── HeroSlider.js
└── lib/
    └── tmdb.js              # TMDB API helper
```
