import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tmdbId = searchParams.get("id");
  const type = searchParams.get("type") || "movie";
  const season = searchParams.get("s") || "1";
  const episode = searchParams.get("e") || "1";

  if (!tmdbId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    // Try fetching Indonesian subtitle from subtitle API
    const subUrl =
      type === "movie"
        ? `https://sub.wyzie.ru/search?id=${tmdbId}&language=id&format=webvtt`
        : `https://sub.wyzie.ru/search?id=${tmdbId}&season=${season}&episode=${episode}&language=id&format=webvtt`;

    const res = await fetch(subUrl, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ subtitles: [] });
    }

    const data = await res.json();

    // Return subtitle list with download URLs
    return NextResponse.json({
      subtitles: Array.isArray(data) ? data : [],
    });
  } catch (err) {
    return NextResponse.json({ subtitles: [] });
  }
}
