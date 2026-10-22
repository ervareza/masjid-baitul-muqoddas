"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronUp,
  FileText,
  Share2,
  Check,
} from "lucide-react";

const TOTAL_PAGES = 19;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  page: i + 1,
  src: `/slides/page-${i + 1}.webp`,
  title: `Lembar Kerja ${i + 1}`,
}));

export default function Home() {
  const [zoom, setZoom] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Deteksi halaman aktif saat pengguna scroll
  useEffect(() => {
    const handleScroll = () => {
      const pageElements = document.querySelectorAll<HTMLElement>("[data-page-num]");
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      pageElements.forEach((el) => {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const pageNum = parseInt(el.getAttribute("data-page-num") || "1", 10);

        if (scrollPosition >= top && scrollPosition < top + height) {
          setCurrentPage(pageNum);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPage = (pageNum: number) => {
    const el = document.getElementById(`page-${pageNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Desain Fasad Masjid Baitul Muqoddas",
          text: "Dokumen teknis desain fasad dan lembar kerja Masjid Baitul Muqoddas (Draf v3)",
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 20, 200));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 20, 60));
  const resetZoom = () => setZoom(100);

  return (
    <div className="min-h-screen bg-[#323639] text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Top Floating Sticky Header ala Google Chrome / Adobe PDF Reader */}
      <header className="sticky top-0 z-50 bg-[#202124]/95 backdrop-blur-md border-b border-black/40 px-3 sm:px-6 py-2.5 shadow-md flex items-center justify-between">
        {/* Left Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
              Masjid Baitul Muqoddas
            </h1>
            <p className="text-[10px] text-slate-400 truncate hidden sm:block">
              Desain Fasad & Lembar Kerja • Draf v3 (19 Halaman)
            </p>
          </div>
        </div>

        {/* Center: Page Jump Counter */}
        <div className="flex items-center bg-[#2c2d30] border border-white/10 rounded-full px-3 py-1 shadow-inner text-xs">
          <span className="text-slate-400 mr-1.5 hidden xs:inline">Hal</span>
          <select
            value={currentPage}
            onChange={(e) => scrollToPage(Number(e.target.value))}
            className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer pr-1 text-xs"
          >
            {PAGES.map((p) => (
              <option key={p.page} value={p.page} className="bg-[#202124] text-white">
                {p.page}
              </option>
            ))}
          </select>
          <span className="text-slate-400 font-medium">/ {TOTAL_PAGES}</span>
        </div>

        {/* Right Actions: Zoom & Download */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom controls for desktop/tablet */}
          <div className="hidden md:flex items-center bg-[#2c2d30] border border-white/10 rounded-full px-1.5 py-1 text-xs">
            <button
              onClick={zoomOut}
              disabled={zoom <= 60}
              className="p-1 hover:text-white text-slate-400 disabled:opacity-30 transition-colors"
              title="Perkecil (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] text-slate-300 min-w-[42px] text-center">
              {zoom}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoom >= 200}
              className="p-1 hover:text-white text-slate-400 disabled:opacity-30 transition-colors"
              title="Perbesar (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoom !== 100 && (
              <button
                onClick={resetZoom}
                className="p-1 hover:text-emerald-400 text-slate-400 transition-colors border-l border-white/10 ml-0.5"
                title="Reset Zoom (100%)"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={handleShare}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#2c2d30] hover:bg-[#383a3e] border border-white/10 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5"
            title="Bagikan Tautan"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {copied ? "Tersalin!" : "Bagikan"}
            </span>
          </button>

          <a
            href="/Masjid-Baitul-Muqoddas-Desain-Fasad-Draf-v3.pdf"
            download
            className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-colors flex items-center gap-1.5"
            title="Download Dokumen PDF Asli"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Unduh PDF</span>
          </a>
        </div>
      </header>

      {/* Main Continuous Document View: Vertically Stacked Pages ala PDF Reader */}
      <main className="flex-1 w-full max-w-[1300px] mx-auto px-2 sm:px-6 py-4 sm:py-8 flex flex-col items-center gap-4 sm:gap-6">
        {PAGES.map((item) => (
          <div
            key={item.page}
            id={`page-${item.page}`}
            data-page-num={item.page}
            style={{ width: `${zoom}%`, maxWidth: "100%" }}
            className="relative transition-all duration-150 ease-out flex flex-col items-center"
          >
            {/* Real Page Canvas with authentic PDF drop shadow */}
            <div className="relative w-full bg-white rounded-sm shadow-[0_4px_24px_rgba(0,0,0,0.5)] border border-black/30 overflow-hidden">
              <Image
                src={item.src}
                alt={`Halaman ${item.page} - Desain Fasad Masjid Baitul Muqoddas`}
                width={2000}
                height={1414}
                quality={90}
                priority={item.page <= 3}
                className="w-full h-auto block select-none pointer-events-auto"
                loading={item.page <= 3 ? "eager" : "lazy"}
              />
            </div>

            {/* Subtle Page Number Footer */}
            <div className="mt-2 text-[11px] text-slate-400 font-medium tracking-wide">
              Halaman {item.page} dari {TOTAL_PAGES}
            </div>
          </div>
        ))}
      </main>

      {/* Floating Bottom Quick-Jump Button on Scroll */}
      {currentPage > 1 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#202124]/90 hover:bg-emerald-600 text-white shadow-xl border border-white/10 backdrop-blur-md transition-all hover:scale-105"
          title="Kembali ke atas"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Subtle Bottom Credit */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-black/30 bg-[#25282a]">
        <p>Masjid Baitul Muqoddas • Dokumen Desain Fasad & Lembar Kerja Arsitektur (Draf v3)</p>
      </footer>
    </div>
  );
}
