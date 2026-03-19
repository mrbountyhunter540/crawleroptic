import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import AdSlot from "@/components/AdSlot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — AI SEO & llms.txt Insights",
  description:
    "Expert insights on AI crawler optimization, llms.txt best practices, and the future of AI-powered search. Stay ahead with CrawlerOptic.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute -top-16 right-0 w-72 h-72 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="inline-flex items-center gap-2 bg-surface-container-low border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-primary-container text-xs font-label uppercase tracking-widest">
              The Laboratory Journal
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] mb-4 max-w-3xl">
            AI SEO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary">
              Insights
            </span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl font-light">
            Expert analysis on llms.txt, AI crawler behavior, and optimizing
            your digital footprint for the AI-first web.
          </p>
        </section>

        {/* Leaderboard Ad */}
        <AdSlot format="leaderboard" slotId="4567890123" className="mb-12" />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Posts */}
          <div className="lg:col-span-8">
            {/* Featured post */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block mb-10">
                <article className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 hover:border-secondary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(78,222,163,0.05)]">
                  {/* Featured image placeholder */}
                  <div className="w-full h-52 bg-surface-container-high flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10" />
                    <span className="text-outline-variant/30 text-xs uppercase tracking-wider z-10">
                      Featured Post
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      {featured.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-on-surface-variant/50 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {featured.date}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-on-surface group-hover:text-primary-container transition-colors mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-secondary text-sm font-semibold">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Post list */}
            <div className="space-y-6">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 hover:border-primary/10 transition-all duration-300 flex gap-6">
                    <div className="w-24 h-24 bg-surface-container-high rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {post.tags?.slice(0, 1).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-widest text-primary-container bg-primary/10 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="text-on-surface-variant/50 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min read
                        </span>
                      </div>
                      <h3 className="font-bold text-on-surface group-hover:text-primary-container transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="bg-surface-container-low rounded-xl p-12 text-center border border-outline-variant/10">
                <p className="text-on-surface-variant">
                  No posts yet. Check back soon!
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Topics */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <h3 className="text-base font-bold mb-5 text-on-surface">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "llms.txt",
                  "AI SEO",
                  "Crawler Optimization",
                  "LLM Indexing",
                  "Schema Markup",
                  "Web Vitals",
                  "Content Strategy",
                  "GPT Crawlers",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-full hover:text-secondary hover:bg-secondary/10 transition-colors cursor-pointer"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-secondary/10 relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/10 blur-[40px] rounded-full pointer-events-none" />
              <h3 className="text-base font-bold mb-2 text-on-surface relative z-10">
                Stay AI-Optimized
              </h3>
              <p className="text-on-surface-variant text-sm mb-4 relative z-10">
                Weekly insights on AI SEO, crawler updates, and llms.txt best
                practices.
              </p>
              <div className="flex gap-2 relative z-10">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-surface-container-lowest text-on-surface text-sm px-3 py-2 rounded-lg border-none focus:ring-1 focus:ring-secondary/50 focus:outline-none placeholder:text-outline-variant/40"
                />
                <button className="bg-secondary text-on-secondary px-4 py-2 rounded-lg text-sm font-bold hover:shadow-[0_0_15px_rgba(78,222,163,0.3)] transition-all">
                  Join
                </button>
              </div>
            </div>

            {/* Sidebar ad */}
            <AdSlot format="rectangle" slotId="5678901234" />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
