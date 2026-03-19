import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-secondary/20 rounded-md flex items-center justify-center">
                <Zap className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-lg font-black tracking-[-0.04em] text-on-surface">
                Crawler<span className="text-primary-container">Optic</span>
              </span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              The professional tool for optimizing your website&apos;s
              visibility to AI crawlers. Generate llms.txt files in seconds.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_rgba(78,222,163,0.6)]" />
              <span className="text-secondary text-xs font-label uppercase tracking-wider">
                All systems operational
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-on-surface font-semibold text-sm mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              {["Features", "Blog", "Documentation", "Changelog"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Blog" ? "/blog" : "#"}
                    className="text-on-surface-variant text-sm hover:text-secondary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-on-surface font-semibold text-sm mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-on-surface-variant text-sm hover:text-secondary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-on-surface-variant text-sm hover:text-secondary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-on-surface-variant text-sm hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-xs">
            © {new Date().getFullYear()} CrawlerOptic. All rights reserved.
          </p>
          <p className="text-on-surface-variant/40 text-xs">
            Built for the AI-first web
          </p>
        </div>
      </div>
    </footer>
  );
}
