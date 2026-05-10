import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "KaiMovie - Nonton Film & Series Gratis Sub Indo",
  description: "Nonton film dan series terbaru gratis dengan subtitle Indonesia. Streaming HD kualitas terbaik.",
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
