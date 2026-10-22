import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masjid Baitul Muqoddas - Desain Fasad & Lembar Kerja (Draf v3)",
  description: "Dokumentasi Desain Fasad & Lembar Kerja Masjid Baitul Muqoddas, Dusun Dampyak, Nyatnyono. Render tampak depan, exploded view, detail per bagian dan spesifikasi visual.",
  openGraph: {
    title: "Masjid Baitul Muqoddas - Desain Fasad & Lembar Kerja",
    description: "Dokumentasi interaktif desain fasad & spesifikasi teknis arsitektur Masjid Baitul Muqoddas.",
    images: ["/slides/page-1.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased selection:bg-[#DDB677]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
