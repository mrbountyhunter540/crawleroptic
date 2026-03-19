"use client";

import { useState, useRef, useTransition, useCallback } from "react";
import {
  Bolt,
  Copy,
  Download,
  Check,
  AlertCircle,
  BookmarkCheck,
  Award,
  ArrowRight,
  Wrench,
  Eye,
  GraduationCap,
  Gauge,
  ChevronRight,
} from "lucide-react";
import { generateLlmsTxt, type CrawlResult } from "./actions/generate";
import AdSlot from "@/components/AdSlot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Processing steps ────────────────────────────────────────────
type ProcessStep = {
  label: string;
  detail: string;
  duration: number;
};

const PROCESS_STEPS: ProcessStep[] = [
  { label: "Crawling", detail: "Fetching page HTML…", duration: 1200 },
  { label: "Extracting", detail: "Parsing meta tags & headings…", duration: 1000 },
  { label: "Formatting", detail: "Generating llms.txt structure…", duration: 800 },
  { label: "Finalizing", detail: "Validating output…", duration: 600 },
];

// ─── Code editor line component ─────────────────────────────────
function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 group hover:bg-white/[0.02] -mx-4 px-4 rounded">
      <span className="text-outline-variant/30 select-none text-right min-w-[2rem] tabular-nums shrink-0">
        {String(n).padStart(2, "0")}
      </span>
      <span>{children}</span>
    </div>
  );
}

function renderLlmsTxtWithSyntax(content: string) {
  return content.split("\n").map((line, i) => {
    let rendered: React.ReactNode;

    if (line.startsWith("# ") && !line.startsWith("## ") && !line.startsWith("### ")) {
      rendered = <span className="text-secondary font-semibold">{line}</span>;
    } else if (line.startsWith("## ")) {
      rendered = <span className="text-primary-container font-semibold">{line}</span>;
    } else if (line.startsWith("### ")) {
      rendered = <span className="text-primary/80">{line}</span>;
    } else if (line.startsWith("> ")) {
      rendered = <span className="text-on-surface-variant italic">{line}</span>;
    } else if (line.startsWith("- **")) {
      const [, key, , val] =
        line.match(/^- \*\*(.+?)\*\*:?\s*(.*)/) || [];
      if (key) {
        rendered = (
          <>
            <span className="text-on-surface-variant">{"- "}</span>
            <span className="text-primary">{key}:</span>
            <span className="text-on-surface/80"> {val}</span>
          </>
        );
      } else {
        rendered = <span className="text-on-surface/80">{line}</span>;
      }
    } else if (line.startsWith("- ")) {
      rendered = (
        <>
          <span className="text-secondary">{"- "}</span>
          <span className="text-on-surface/80">{line.slice(2)}</span>
        </>
      );
    } else if (line === "") {
      rendered = <>&nbsp;</>;
    } else {
      rendered = <span className="text-on-surface/80">{line}</span>;
    }

    return <CodeLine key={i} n={i + 1}>{rendered}</CodeLine>;
  });
}

// ─── Badge embed code ────────────────────────────────────────────
function getBadgeCode(url: string): string {
  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();
  return `<!-- CrawlerOptic: AI-Ready Badge -->
<a href="https://crawleroptic.com" target="_blank" rel="noopener"
   title="${domain} is AI Crawler Optimized"
   style="display:inline-flex;align-items:center;gap:6px;
          background:#131b2e;border:1px solid rgba(78,222,163,0.3);
          border-radius:6px;padding:6px 12px;text-decoration:none;
          font-family:system-ui,sans-serif;font-size:12px;color:#4edea3;">
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
  AI-Ready · Verified by CrawlerOptic
</a>`;
}

// ─── Main page ───────────────────────────────────────────────────
export default function HomePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<CrawlResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [processStep, setProcessStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [badgeCopied, setBadgeCopied] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const runProcess = useCallback(async (targetUrl: string) => {
    setResult(null);
    setProcessStep(0);

    // Animate through steps
    for (let i = 0; i < PROCESS_STEPS.length; i++) {
      setProcessStep(i);
      await new Promise((r) => setTimeout(r, PROCESS_STEPS[i].duration));
    }

    startTransition(async () => {
      const res = await generateLlmsTxt(targetUrl);
      setResult(res);
      setProcessStep(PROCESS_STEPS.length);
      setTimeout(
        () => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    const normalized = url.startsWith("http") ? url : `https://${url}`;
    runProcess(normalized);
  };

  const handleCopy = async () => {
    if (!result?.llmsTxt) return;
    await navigator.clipboard.writeText(result.llmsTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!result?.llmsTxt) return;
    const blob = new Blob([result.llmsTxt], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "llms.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleBadgeCopy = async () => {
    if (!result?.url) return;
    await navigator.clipboard.writeText(getBadgeCode(result.url));
    setBadgeCopied(true);
    setTimeout(() => setBadgeCopied(false), 2500);
  };

  const isProcessing = isPending || (processStep > 0 && processStep < PROCESS_STEPS.length);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">

        {/* ── Hero Section ─────────────────────────── */}
        <section
          id="tool"
          className="flex flex-col items-center text-center py-16 md:py-24 relative overflow-hidden"
        >
          {/* Background glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Badge chip */}
          <div className="inline-flex items-center gap-2 bg-surface-container-low border border-secondary/20 rounded-full px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(78,222,163,0.8)]" />
            <span className="text-secondary text-xs font-label uppercase tracking-widest">
              AI-First Web Optimization
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] mb-6 leading-tight max-w-4xl">
            Make Your Website{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-container">
              AI-Ready
            </span>
          </h1>

          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
            Optimize your digital footprint for LLMs and AI crawlers. Generate
            professional <code className="text-secondary bg-surface-container-lowest px-1.5 py-0.5 rounded text-base">llms.txt</code> files
            in seconds to ensure accurate citations and maximum AI visibility.
          </p>

          {/* ── URL Input ──────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative"
          >
            <div
              className={`flex flex-col md:flex-row gap-3 p-2 bg-surface-container-lowest rounded-xl shadow-2xl relative z-10 transition-all duration-300 ${
                inputFocused
                  ? "shadow-[0_0_0_1px_rgba(78,222,163,0.3),0_0_30px_rgba(78,222,163,0.1)]"
                  : ""
              }`}
            >
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="https://yourwebsite.com"
                required
                disabled={isProcessing}
                className="url-input flex-grow bg-transparent border-none focus:ring-0 text-primary px-4 py-4 placeholder:text-outline-variant/50 text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isProcessing || !url.trim()}
                className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 group hover:shadow-[0_0_25px_rgba(78,222,163,0.4)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 shrink-0"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-on-secondary/30 border-t-on-secondary rounded-full animate-spin" />
                    <span>Processing…</span>
                  </>
                ) : (
                  <>
                    <span>Generate</span>
                    <Bolt className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-outline-variant/50 text-xs mt-4">
            Free to use · No account required · Results in seconds
          </p>
        </section>

        {/* ── Ad Slot 1 — Leaderboard ─────────────── */}
        <AdSlot format="leaderboard" slotId="1234567890" className="my-10" />

        {/* ── Processing State ─────────────────────── */}
        {isProcessing && (
          <section className="mt-8 bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
              <span className="text-secondary font-label uppercase tracking-widest text-sm">
                {PROCESS_STEPS[processStep]?.label || "Processing"}
              </span>
            </div>
            <div className="space-y-4">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      i < processStep
                        ? "bg-secondary/20"
                        : i === processStep
                        ? "bg-secondary/10 ring-1 ring-secondary/50"
                        : "bg-surface-container-high"
                    }`}
                  >
                    {i < processStep ? (
                      <Check className="w-3 h-3 text-secondary" />
                    ) : i === processStep ? (
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-outline-variant/30" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium transition-colors ${
                          i <= processStep ? "text-on-surface" : "text-on-surface-variant/50"
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="text-xs text-on-surface-variant/50">
                        {step.detail}
                      </span>
                    </div>
                    {i === processStep && (
                      <div className="h-0.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-secondary to-primary-container rounded-full progress-bar" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Result Section ───────────────────────── */}
        {result && !isProcessing && (
          <section ref={resultRef} className="mt-8 scroll-mt-24">
            {result.success && result.llmsTxt ? (
              <>
                {/* Code Editor Window */}
                <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 shadow-2xl">
                  {/* Window chrome */}
                  <div className="bg-surface-container-high px-6 py-3 flex justify-between items-center border-b border-outline-variant/5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-error/50" />
                      <span className="w-3 h-3 rounded-full bg-secondary/50" />
                      <span className="w-3 h-3 rounded-full bg-primary/50" />
                      <span className="ml-4 font-mono text-xs text-on-surface-variant tracking-wider">
                        llms.txt — {result.url}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleCopy}
                        className="text-secondary text-sm font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="text-primary text-sm font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Code content */}
                  <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto max-h-[520px] overflow-y-auto code-editor-content">
                    <div className="min-w-0">
                      {renderLlmsTxtWithSyntax(result.llmsTxt)}
                    </div>
                  </div>
                </div>

                {/* ── Success Info Panel ─────────────── */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.title && (
                    <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-label">
                        Page Title
                      </p>
                      <p className="text-on-surface font-medium text-sm truncate">
                        {result.title}
                      </p>
                    </div>
                  )}
                  {result.description && (
                    <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 md:col-span-2">
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-label">
                        Meta Description
                      </p>
                      <p className="text-on-surface text-sm line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                  )}
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-label">
                      H1 Tags Found
                    </p>
                    <p className="text-secondary font-bold text-2xl">
                      {result.h1Tags?.length ?? 0}
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-label">
                      H2 Tags Found
                    </p>
                    <p className="text-primary font-bold text-2xl">
                      {result.h2Tags?.length ?? 0}
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-label">
                      Crawled At
                    </p>
                    <p className="text-on-surface text-sm">
                      {new Date(result.crawledAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* ── Deployment Reminder ────────────── */}
                <div className="mt-6 bg-surface-container-low rounded-xl p-6 border border-secondary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 blur-[60px] rounded-full pointer-events-none" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <BookmarkCheck className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">
                        Next Step — Deploy to Your Server
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        Download the <code className="text-secondary bg-surface-container-lowest px-1.5 py-0.5 rounded">llms.txt</code> file above
                        and place it at the root of your domain:{" "}
                        <code className="text-primary-container bg-surface-container-lowest px-1.5 py-0.5 rounded">
                          {result.url.replace(/\/$/, "")}/llms.txt
                        </code>
                        . AI crawlers will automatically discover and use it.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Verified Badge Section ─────────── */}
                <div className="mt-6 bg-surface-container-low rounded-xl p-6 border border-primary/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-primary-container" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface">
                        &ldquo;Verified AI-Ready&rdquo; Badge
                      </h3>
                      <p className="text-on-surface-variant text-xs mt-0.5">
                        Add this badge to your website to show visitors you&apos;re optimized for AI.
                      </p>
                    </div>
                  </div>

                  {/* Badge preview */}
                  <div className="bg-surface-container-highest rounded-lg p-4 mb-4 flex items-center justify-center">
                    <a
                      href="https://crawleroptic.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-surface-container-low border border-secondary/30 rounded-md px-3 py-1.5 text-secondary text-xs font-medium no-underline hover:border-secondary/60 transition-colors"
                    >
                      <Bolt className="w-3 h-3" />
                      AI-Ready · Verified by CrawlerOptic
                    </a>
                  </div>

                  {/* Badge code */}
                  <div className="bg-surface-container-lowest rounded-lg p-4 font-mono text-xs text-on-surface-variant overflow-x-auto relative">
                    <pre className="whitespace-pre-wrap break-all">
                      {getBadgeCode(result.url)}
                    </pre>
                    <button
                      onClick={handleBadgeCopy}
                      className="absolute top-3 right-3 bg-surface-container p-1.5 rounded-md text-on-surface-variant hover:text-secondary transition-colors"
                    >
                      {badgeCopied ? (
                        <Check className="w-3.5 h-3.5 text-secondary" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Error State */
              <div className="bg-surface-container-low rounded-xl p-8 border border-error/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-error" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface mb-2">Crawl Failed</h3>
                    <p className="text-on-surface-variant text-sm">{result.error}</p>
                    <button
                      onClick={() => setResult(null)}
                      className="mt-4 text-secondary text-sm font-semibold hover:opacity-80 transition-opacity"
                    >
                      Try again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ── Two Column Content + Sidebar ─────────── */}
        <section id="how-it-works" className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="blog-prose max-w-none">
              <h2>How AI Crawlers Work in 2026</h2>
              <p>
                In the rapidly evolving landscape of 2026, AI crawlers have
                transitioned from simple text parsers to semantic reasoning
                engines. They no longer just &ldquo;index&rdquo; content — they
                understand context, intent, and relationships between data
                points.
              </p>
              <p>
                GPT, Claude, and Gemini crawlers are constantly re-indexing the
                web to build richer, more accurate models. Without explicit
                guidance via an{" "}
                <code>llms.txt</code> file, these systems may misattribute,
                summarize incorrectly, or skip your high-value pages entirely.
                Implementing a standardized{" "}
                <code>llms.txt</code> file has become the gold standard for
                webmasters seeking to maintain authority in an automated search
                ecosystem.
              </p>

              <h2>Benefits of llms.txt</h2>
              <p>
                The <code>llms.txt</code> standard gives webmasters direct
                control over how AI systems interpret and cite their content.
                Think of it as a structured handshake between your website and
                every major AI crawler.
              </p>
              <ul>
                <li>
                  Direct control over what AI agents prioritize for training data
                  and live retrieval augmentation.
                </li>
                <li>
                  Enhanced citation accuracy in AI-generated search snapshots and
                  response cards.
                </li>
                <li>
                  Reduced crawl overhead by guiding bots to summarized content
                  versions.
                </li>
                <li>
                  Faster inclusion in new AI model fine-tuning datasets, boosting
                  your domain authority in LLM-space.
                </li>
                <li>
                  A clean semantic summary that allows LLMs to accurately
                  attribute quotes and data to your source.
                </li>
              </ul>

              <h2>What CrawlerOptic Extracts</h2>
              <p>
                Our crawler fetches your page HTML and uses intelligent parsing
                to extract: page title, meta description, canonical URL,
                Open Graph metadata, H1/H2/H3 heading hierarchy, and keyword
                signals. This is assembled into a valid, clean{" "}
                <code>llms.txt</code> file following the emerging community
                standard.
              </p>
            </div>

            {/* Ad between content */}
            <AdSlot format="in-article" slotId="2345678901" className="my-8" />

            <div className="blog-prose max-w-none">
              <h2>The llms.txt Standard Explained</h2>
              <p>
                The <code>llms.txt</code> format uses a simple Markdown
                structure to communicate your site&apos;s identity, purpose, and
                key content locations to AI systems. It should be served at
                the root of your domain, similar to <code>robots.txt</code> or{" "}
                <code>sitemap.xml</code>.
              </p>
              <p>
                Unlike <code>robots.txt</code>, which restricts crawler access,{" "}
                <code>llms.txt</code> proactively guides AI systems toward your
                most valuable, accurate, and authoritative content — maximizing
                your presence in AI-generated answers.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Related Tools */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <h3 className="text-base font-bold mb-5 flex items-center gap-2 text-on-surface">
                <Wrench className="w-4 h-4 text-primary-container" />
                Related Tools
              </h3>
              <ul className="space-y-1">
                {[
                  "Robots.txt Validator",
                  "Sitemap Optimizer",
                  "Metadata Enhancer",
                  "Schema Markup Tester",
                  "Core Web Vitals Checker",
                ].map((tool) => (
                  <li key={tool}>
                    <a
                      href="#"
                      className="group flex justify-between items-center p-3 rounded-lg hover:bg-surface-container transition-colors"
                    >
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                        {tool}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar ad */}
            <AdSlot format="skyscraper" slotId="3456789012" />
          </aside>
        </section>

        {/* ── Feature Cards ────────────────────────── */}
        <section className="mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-on-surface mb-4">
              Everything you need to go{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                AI-native
              </span>
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Built for developers, marketers, and publishers who want their
              content accurately represented in the AI era.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                color: "primary",
                bg: "bg-primary/10",
                title: "AI Visibility",
                body: "Ensure your high-value pages are prioritized by GPT, Claude, and Gemini crawlers for real-time indexing and citation.",
              },
              {
                icon: GraduationCap,
                color: "secondary",
                bg: "bg-secondary/10",
                title: "Better Citations",
                body: "Provide clean, semantic summaries that allow LLMs to attribute quotes and data accurately to your source.",
              },
              {
                icon: Gauge,
                color: "primary-container",
                bg: "bg-primary-container/10",
                title: "Low Overhead",
                body: "Optimized crawl paths reduce server load by preventing bots from exploring redundant or low-value URL structures.",
              },
            ].map(({ icon: Icon, color, bg, title, body }) => (
              <div
                key={title}
                className="bg-surface-container-low p-10 rounded-xl hover:bg-surface-container-high transition-all duration-500 border border-outline-variant/5 group"
              >
                <div
                  className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 text-${color}`} />
                </div>
                <h4 className="text-xl font-bold mb-3">{title}</h4>
                <p className="text-on-surface-variant leading-relaxed font-light text-sm">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ad Slot — Content Recommendation ─────── */}
        <div className="my-24">
          <div className="w-full p-4 border border-outline-variant/10 rounded-xl bg-surface-container-lowest/30">
            <p className="text-[10px] uppercase tracking-widest text-outline-variant text-center mb-3">
              Recommended Content
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video bg-surface-container-low rounded-lg flex flex-col p-3 gap-2"
                >
                  <div className="w-full h-2/3 bg-surface-container-high rounded flex items-center justify-center">
                    <div className="w-6 h-6 rounded bg-outline-variant/20" />
                  </div>
                  <div className="h-2 w-3/4 bg-outline-variant/20 rounded" />
                  <div className="h-2 w-1/2 bg-outline-variant/10 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA Section ──────────────────────────── */}
        <section className="py-24 text-center glass-panel rounded-3xl border border-outline-variant/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 pointer-events-none" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-4xl font-black mb-6 relative z-10 tracking-[-0.03em]">
            Ready to secure your AI presence?
          </h2>
          <p className="text-on-surface-variant mb-10 max-w-xl mx-auto relative z-10">
            Join 10,000+ developers and marketers who are optimizing their
            sites for the future of AI-powered search.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() =>
                document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:shadow-[0_0_25px_rgba(78,222,163,0.4)] transition-all active:scale-95"
            >
              Generate llms.txt Now
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="/blog"
              className="text-primary-container font-semibold flex items-center gap-2 hover:text-secondary transition-colors"
            >
              Read the Blog
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
