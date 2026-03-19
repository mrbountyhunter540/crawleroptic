import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="relative mb-8">
          <div className="text-[120px] font-black text-surface-container-high leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-secondary text-5xl font-black tracking-tight">
              Lost
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-on-surface mb-3">
          Page Not Found
        </h1>
        <p className="text-on-surface-variant mb-8 max-w-sm">
          This page doesn&apos;t exist. Even AI crawlers couldn&apos;t index it.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="bg-surface-container-low text-on-surface px-6 py-3 rounded-lg font-bold border border-outline-variant/10 hover:border-primary/20 transition-all"
          >
            Read Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
