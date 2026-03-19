import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import AdSlot from "@/components/AdSlot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Split content at the halfway point for in-article ad
  const paragraphs = post.contentHtml.split("</p>");
  const midpoint = Math.floor(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, midpoint).join("</p>") + (midpoint > 0 ? "</p>" : "");
  const secondHalf = paragraphs.slice(midpoint).join("</p>");

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Article */}
          <article className="lg:col-span-8">
            {/* Article header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-on-surface-variant/50 text-xs flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="text-on-surface-variant/50 text-xs flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-on-surface mb-5 leading-tight">
                {post.title}
              </h1>

              <p className="text-on-surface-variant text-lg font-light leading-relaxed border-l-2 border-secondary/50 pl-4">
                {post.excerpt}
              </p>
            </header>

            {/* Hero image placeholder */}
            <div className="w-full h-64 bg-surface-container-low rounded-xl mb-10 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-surface-container to-primary/10" />
              <span className="text-outline-variant/30 text-xs uppercase tracking-wider z-10">
                Article Cover Image
              </span>
            </div>

            {/* Article content — first half */}
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: firstHalf }}
            />

            {/* In-article ad */}
            <AdSlot
              format="in-article"
              slotId="6789012345"
              className="my-10"
            />

            {/* Article content — second half */}
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: secondHalf }}
            />

            {/* Article footer */}
            <div className="mt-12 pt-8 border-t border-outline-variant/10">
              <div className="flex flex-wrap gap-2">
                <span className="text-on-surface-variant text-sm mr-2">Tags:</span>
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <section className="mt-16">
                <h2 className="text-xl font-bold mb-6 text-on-surface">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="group bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 hover:border-secondary/20 transition-all"
                    >
                      <div className="w-full h-24 bg-surface-container-high rounded-lg mb-4 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
                      </div>
                      <h3 className="font-semibold text-on-surface group-hover:text-primary-container transition-colors text-sm line-clamp-2 mb-2">
                        {rp.title}
                      </h3>
                      <span className="text-secondary text-xs flex items-center gap-1">
                        Read
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 lg:self-start">
            {/* Sticky ad */}
            <AdSlot format="rectangle" slotId="7890123456" />

            {/* CTA card */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-secondary/10 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary/10 blur-[40px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-secondary text-xl">⚡</span>
                </div>
                <h3 className="font-bold text-on-surface mb-2">
                  Generate Your llms.txt
                </h3>
                <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
                  Instantly optimize your website for AI crawlers. Free, no
                  signup required.
                </p>
                <Link
                  href="/#tool"
                  className="block w-full text-center bg-secondary text-on-secondary py-2.5 rounded-lg text-sm font-bold hover:shadow-[0_0_15px_rgba(78,222,163,0.3)] transition-all"
                >
                  Try CrawlerOptic Free
                </Link>
              </div>
            </div>

            {/* Skyscraper ad */}
            <AdSlot format="skyscraper" slotId="8901234567" />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
