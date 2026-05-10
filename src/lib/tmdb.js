const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (path, size = "w500") => {
  if (!path) return "/no-poster.png";
  return `${IMAGE_BASE}/${size}${path}`;
};

export const getBackdropUrl = (path) => {
  if (!path) return null;
  return `${IMAGE_BASE}/original${path}`;
};

async function fetchTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "id-ID");
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export async function getTrending(page = 1) {
  return fetchTMDB("/trending/movie/week", { page });
}

export async function getPopular(page = 1) {
  return fetchTMDB("/movie/popular", { page });
}

export async function getNowPlaying(page = 1) {
  return fetchTMDB("/movie/now_playing", { page });
}

export async function getTopRated(page = 1) {
  return fetchTMDB("/movie/top_rated", { page });
}

export async function getUpcoming(page = 1) {
  return fetchTMDB("/movie/upcoming", { page });
}

export async function getMovieDetails(id) {
  return fetchTMDB(`/movie/${id}`, { append_to_response: "credits,videos,similar,recommendations" });
}

export async function searchMovies(query, page = 1) {
  return fetchTMDB("/search/movie", { query, page });
}

export async function getGenres() {
  return fetchTMDB("/genre/movie/list");
}

export async function getMoviesByGenre(genreId, page = 1) {
  return fetchTMDB("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });
}

export async function getTrendingSeries(page = 1) {
  return fetchTMDB("/trending/tv/week", { page });
}

export async function getSeriesDetails(id) {
  return fetchTMDB(`/tv/${id}`, { append_to_response: "credits,videos,similar" });
}

export async function searchSeries(query, page = 1) {
  return fetchTMDB("/search/tv", { query, page });
}
