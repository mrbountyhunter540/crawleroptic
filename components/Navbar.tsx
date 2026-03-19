"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-container-low/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-surface-container-low"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-secondary/20 rounded-md flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
            <Zap className="w-4 h-4 text-secondary" />
          </div>
          <span className="text-xl font-black tracking-[-0.04em] text-on-surface">
            Crawler<span className="text-primary-container">Optic</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#tool"
            className="text-primary-container font-semibold hover:text-secondary transition-colors duration-300 text-sm"
          >
            Features
          </Link>
          <Link
            href="/blog"
            className="text-on-surface/70 hover:text-secondary transition-colors duration-300 text-sm"
          >
            Blog
          </Link>
          <Link
            href="#how-it-works"
            className="text-on-surface/70 hover:text-secondary transition-colors duration-300 text-sm"
          >
            Docs
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#tool"
            className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:shadow-[0_0_20px_rgba(173,198,255,0.3)] active:scale-95"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-on-surface/70 hover:text-on-surface transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-container-low border-t border-outline-variant/10 px-6 py-4 space-y-3">
          <Link
            href="#tool"
            className="block text-primary-container font-semibold py-2"
            onClick={() => setMobileOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/blog"
            className="block text-on-surface/70 py-2"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="#how-it-works"
            className="block text-on-surface/70 py-2"
            onClick={() => setMobileOpen(false)}
          >
            Docs
          </Link>
          <Link
            href="#tool"
            className="block bg-primary-container text-on-primary-container px-5 py-2 rounded-lg text-sm font-bold text-center mt-4"
            onClick={() => setMobileOpen(false)}
          >
            Get Started Free
          </Link>
        </div>
      )}
    </nav>
  );
}
