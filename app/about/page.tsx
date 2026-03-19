import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import { Zap, Target, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CrawlerOptic is the leading free tool for generating llms.txt files and optimizing websites for AI crawlers. Learn about our mission and team.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute -top-16 right-0 w-72 h-72 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
          <span className="text-[10px] uppercase tracking-widest text-secondary font-label block mb-4">
            About CrawlerOptic
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-on-surface mb-5 max-w-2xl">
            Built for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              AI-First Web
            </span>
          </h1>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-2xl">
            CrawlerOptic was founded on a simple belief: every website deserves
            to be accurately represented in the AI systems that are increasingly
            shaping how people discover and consume information.
          </p>
        </section>

        {/* Mission section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              Our Mission
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              To democratize AI visibility. We believe that website owners of
              all sizes — from solo bloggers to enterprise teams — should have
              access to the same tools for communicating with AI crawlers that
              large tech companies build in-house.
            </p>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
              <Zap className="w-6 h-6 text-primary-container" />
            </div>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              Why We Built This
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              As AI-powered search began replacing traditional search engine
              results, we saw a gap: there was no simple, free tool for
              generating compliant <code>llms.txt</code> files. CrawlerOptic
              fills that gap — and does it better than anything else available.
            </p>
          </div>
        </section>

        {/* AdSense leaderboard */}
        <AdSlot format="leaderboard" slotId="9012345678" className="mb-16" />

        {/* What we do */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-8">
            What CrawlerOptic Does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                color: "secondary",
                bg: "bg-secondary/10",
                title: "Intelligent Crawling",
                body:
                  "Our crawler fetches your page's HTML and uses Cheerio-powered parsing to extract title, meta description, headings, canonical URLs, and Open Graph metadata.",
              },
              {
                icon: Zap,
                color: "primary-container",
                bg: "bg-primary/10",
                title: "Smart Formatting",
                body:
                  "We format extracted data into clean, structured Markdown following the community llms.txt standard — compatible with GPTBot, ClaudeBot, and Gemini crawlers.",
              },
              {
                icon: Users,
                color: "secondary",
                bg: "bg-secondary/10",
                title: "Always Free",
                body:
                  "The core tool is and will remain free to use. No account required, no rate-limit paywalls, no data harvesting. Your URLs are processed and discarded — not stored.",
              },
            ].map(({ icon: Icon, color, bg, title, body }) => (
              <div
                key={title}
                className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10"
              >
                <div
                  className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-5 h-5 text-${color}`} />
                </div>
                <h3 className="font-bold text-on-surface mb-2">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="glass-panel rounded-2xl p-10 border border-outline-variant/10 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Files Generated" },
              { value: "98%", label: "Uptime SLA" },
              { value: "3", label: "Major AI Platforms Supported" },
              { value: "Free", label: "Always" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-black text-on-surface mb-1 tracking-tight">
                  {value}
                </div>
                <div className="text-on-surface-variant text-sm font-label uppercase tracking-wider text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog section reference */}
        <section className="mb-16 blog-prose">
          <h2>The CrawlerOptic Blog</h2>
          <p>
            Beyond the tool, we maintain an active blog covering the evolving
            landscape of AI SEO, <code>llms.txt</code> best practices, and
            technical guides for optimizing your site for AI-powered search.
            Our team monitors updates from OpenAI, Anthropic, and Google to
            ensure our coverage stays ahead of the curve.
          </p>
          <p>
            If you have a topic request or want to contribute a guest post,
            reach out to{" "}
            <a href="mailto:editorial@crawleroptic.com">
              editorial@crawleroptic.com
            </a>
            .
          </p>

          <h2>Contact & Support</h2>
          <p>
            For general inquiries:{" "}
            <a href="mailto:hello@crawleroptic.com">hello@crawleroptic.com</a>
            <br />
            For privacy matters:{" "}
            <a href="mailto:privacy@crawleroptic.com">
              privacy@crawleroptic.com
            </a>
            <br />
            For legal inquiries:{" "}
            <a href="mailto:legal@crawleroptic.com">legal@crawleroptic.com</a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
