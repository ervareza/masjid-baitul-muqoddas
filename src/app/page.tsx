"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Grid,
  FileText,
  Share2,
  Check,
} from "lucide-react";

interface SlideInfo {
  page: number;
  title: string;
  category: string;
}

const SLIDES: SlideInfo[] = [
  { page: 1, title: "Cover Dokumen & Informasi Proyek", category: "Cover" },
  { page: 2, title: "Ringkasan Isi Dokumen & Konsep Desain", category: "Ringkasan" },
  { page: 3, title: "Render Utama: Tampak Depan", category: "Render" },
  { page: 4, title: "Penyesuaian terhadap Struktur SketchUp", category: "Struktur" },
  { page: 5, title: "Gambar Ukur dari File SketchUp (.skp)", category: "Ukuran" },
  { page: 6, title: "Kecocokan Render dengan Ukuran Asli", category: "Ukuran" },
  { page: 7, title: "Exploded View: Tampak Depan", category: "Komposisi" },
  { page: 8, title: "Exploded View: 3D Isometrik", category: "Komposisi" },
  { page: 9, title: "Detail 1/8: Tower Fasad & Panel Kisi", category: "Detail Arsitektur" },
  { page: 10, title: "Detail 2/8: Jendela Atas & Balkon", category: "Detail Arsitektur" },
  { page: 11, title: "Detail 3/8: Kubah Utama & Drum", category: "Detail Arsitektur" },
  { page: 12, title: "Detail 4/8: Menara Bertingkat", category: "Detail Arsitektur" },
  { page: 13, title: "Detail 5/8: Teras & Pintu Lengkung", category: "Detail Arsitektur" },
  { page: 14, title: "Detail 6/8: Papan Nama & Plakat", category: "Detail Arsitektur" },
  { page: 15, title: "Detail 7/8: Sayap Samping & Taman", category: "Detail Arsitektur" },
  { page: 16, title: "Detail 8/8: Tangga Depan & Halaman", category: "Detail Arsitektur" },
  { page: 17, title: "Lembar Kerja: Palet Warna Hex", category: "Spesifikasi" },
  { page: 18, title: "Lembar Kerja Spesifikasi Material & Ukuran", category: "Spesifikasi" },
  { page: 19, title: "Catatan & Hal yang Perlu Dikonfirmasi", category: "Penutup" },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalPages = SLIDES.length;
  const currentSlide = SLIDES[currentPage - 1];

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setZoomLevel(1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setZoomLevel(1);
    }
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const resetZoom = () => setZoomLevel(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") nextPage();
      if (e.key === "ArrowLeft" || e.key === "PageUp") prevPage();
      if (e.key === "Escape") {
        setShowThumbnails(false);
        resetZoom();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const copyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F141C] text-[#F1F4F9] flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#161C26]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#29384A] to-[#DDB677] flex items-center justify-center text-white font-bold shadow-md shadow-black/40">
            BM
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wide text-white leading-tight">
              Masjid Baitul Muqoddas
            </h1>
            <p className="text-[11px] text-[#DDB677] font-medium leading-tight">
              Dusun Dampyak, Nyatnyono · Draf v3
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
              showThumbnails
                ? "bg-[#DDB677] text-[#0F141C]"
                : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Daftar Halaman</span>
          </button>

          <button
            onClick={copyShareLink}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            title="Salin Tautan"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <a
            href="/Masjid-Baitul-Muqoddas-Desain-Fasad-Draf-v3.pdf"
            download="Masjid-Baitul-Muqoddas-Desain-Fasad-Draf-v3.pdf"
            className="px-3.5 py-1.5 rounded-full bg-[#DDB677] hover:bg-[#c9a363] text-[#0F141C] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Download PDF</span>
          </a>
        </div>
      </header>

      {/* Main Presentation Viewport */}
      <section className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden">
        {/* Floating Zoom & Page Badge Controls */}
        <div className="z-30 mb-3 flex items-center gap-2 bg-[#161C26]/90 border border-white/10 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-sm">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-medium px-2 text-white">
            {currentPage} <span className="text-white/40">/</span> {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          <button
            onClick={zoomOut}
            disabled={zoomLevel <= 1}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30"
            title="Perkecil"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-[#DDB677] min-w-[36px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={zoomLevel >= 2.5}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30"
            title="Perbesar"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoomLevel > 1 && (
            <button
              onClick={resetZoom}
              className="p-1 rounded-full hover:bg-white/10 text-white/70"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Document Canvas Container */}
        <div className="w-full max-w-5xl flex flex-col items-center">
          <div className="w-full bg-[#18202D] rounded-2xl border border-white/10 shadow-2xl overflow-auto max-h-[75vh] flex items-center justify-center relative p-2 sm:p-4">
            <div
              className="transition-transform duration-200 ease-out origin-center flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src={`/slides/page-${currentPage}.webp`}
                alt={currentSlide.title}
                width={1200}
                height={800}
                priority
                className="rounded-lg shadow-xl object-contain max-h-[70vh] w-auto h-auto"
              />
            </div>
          </div>

          {/* Subtitle & Caption */}
          <div className="w-full mt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 px-2 gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#DDB677]/20 text-[#DDB677] font-semibold text-[10px] tracking-wide uppercase">
                {currentSlide.category}
              </span>
              <span className="font-medium text-white">{currentSlide.title}</span>
            </div>
            <div className="text-[11px] text-white/50">
              Gunakan tombol panah ◀ ▶ keyboard untuk berpindah halaman
            </div>
          </div>
        </div>
      </section>

      {/* Slide Thumbnails Drawer Modal */}
      {showThumbnails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-[#161C26] border-t border-white/15 p-4 sm:p-6 max-h-[80vh] flex flex-col rounded-t-[2rem]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#DDB677]" />
                <h3 className="text-sm font-semibold text-white">
                  Daftar Seluruh Lembar Desain ({totalPages} Halaman)
                </h3>
              </div>
              <button
                onClick={() => setShowThumbnails(false)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
              >
                Tutup ✕
              </button>
            </div>

            <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-1">
              {SLIDES.map((slide) => (
                <button
                  key={slide.page}
                  onClick={() => {
                    setCurrentPage(slide.page);
                    setZoomLevel(1);
                    setShowThumbnails(false);
                  }}
                  className={`flex flex-col text-left p-2 rounded-xl border transition-all ${
                    currentPage === slide.page
                      ? "bg-[#DDB677]/15 border-[#DDB677] ring-1 ring-[#DDB677]"
                      : "bg-[#0F141C] border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full mb-1.5 overflow-hidden rounded-lg bg-black/40">
                    <Image
                      src={`/slides/page-${slide.page}.webp`}
                      alt={slide.title}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-mono text-white">
                      Hal. {slide.page}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#DDB677] font-medium leading-tight">
                    {slide.category}
                  </span>
                  <span className="text-xs text-white font-medium truncate w-full mt-0.5">
                    {slide.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Details */}
      <footer className="border-t border-white/10 bg-[#161C26]/60 px-4 py-2.5 text-center text-xs text-white/50 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px]">
          Dokumentasi Fasad Masjid Baitul Muqoddas · Dusun Dampyak, Nyatnyono
        </p>
        <div className="flex items-center gap-3 text-[11px]">
          <span>Format: Interaktif Web & PDF Asli</span>
          <span>·</span>
          <span>PT Selaras Digital Labs</span>
        </div>
      </footer>
    </main>
  );
}
