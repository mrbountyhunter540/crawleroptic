import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
  author: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? "Untitled",
        excerpt: data.excerpt ?? content.slice(0, 160).replace(/[#*_`]/g, "").trim() + "…",
        date: data.date ? new Date(data.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) : "Unknown",
        tags: data.tags ?? [],
        readTime: estimateReadTime(content),
        author: data.author ?? "CrawlerOptic Team",
      } satisfies PostMeta;
    })
    .sort((a, b) => {
      // Sort by raw date string descending
      return b.date.localeCompare(a.date);
    });

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const contentHtml = marked(content) as string;

  return {
    slug,
    title: data.title ?? "Untitled",
    excerpt: data.excerpt ?? content.slice(0, 160).replace(/[#*_`]/g, "").trim() + "…",
    date: data.date
      ? new Date(data.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Unknown",
    tags: data.tags ?? [],
    readTime: estimateReadTime(content),
    author: data.author ?? "CrawlerOptic Team",
    contentHtml,
  };
}
