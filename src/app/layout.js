import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "KaiMovie - Nonton Film & Series Gratis Sub Indo",
    template: "%s | KaiMovie",
  },
  description: "Nonton film dan series terbaru gratis dengan subtitle Indonesia. Streaming HD kualitas terbaik di KaiMovie.",
  keywords: ["nonton film", "streaming", "sub indo", "film gratis", "series", "KaiMovie", "layarkaca21"],
  openGraph: {
    title: "KaiMovie - Nonton Film & Series Gratis Sub Indo",
    description: "Nonton film dan series terbaru gratis dengan subtitle Indonesia.",
    siteName: "KaiMovie",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
