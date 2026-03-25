// // import type { Metadata } from "next";
// // import "./globals.css";

// // export const metadata: Metadata = {
// //   title: {
// //     template: "%s | CrawlerOptic",
// //     default: "CrawlerOptic — AI Crawler Optimizer & llms.txt Generator",
// //   },
// //   description:
// //     "Generate professional llms.txt files for your website. Optimize your digital footprint for LLMs and AI crawlers like GPT, Claude, and Gemini in seconds.",
// //   keywords: [
// //     "llms.txt",
// //     "AI crawler",
// //     "AI SEO",
// //     "LLM optimization",
// //     "AI indexing",
// //     "GPT crawler",
// //     "Claude crawler",
// //     "website AI optimization",
// //   ],
// //   openGraph: {
// //     type: "website",
// //     locale: "en_US",
// //     url: "https://crawleroptic.com",
// //     siteName: "CrawlerOptic",
// //     title: "CrawlerOptic — AI Crawler Optimizer",
// //     description:
// //       "Generate professional llms.txt files. Optimize your website for GPT, Claude, and Gemini AI crawlers.",
// //   },
// //   twitter: {
// //     card: "summary_large_image",
// //     title: "CrawlerOptic — AI Crawler Optimizer",
// //     description: "Generate llms.txt files for your website in seconds.",
// //   },
// //   robots: {
// //     index: true,
// //     follow: true,
// //     googleBot: { index: true, follow: true },
// //   },
// //   metadataBase: new URL("https://crawleroptic.com"),
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en" className="dark">
// //       <head>
// //         <link rel="preconnect" href="https://fonts.googleapis.com" />
// //         <link
// //           rel="preconnect"
// //           href="https://fonts.gstatic.com"
// //           crossOrigin="anonymous"
// //         />
// //         {/* AdSense Script — replace ca-pub-XXXXXXXXXXXXXXXX with your Publisher ID */}
// //         {/* 
// //         <script
// //           async
// //           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
// //           crossOrigin="anonymous"
// //         />
// //         */}
// //       </head>
// //       <body className="bg-surface text-on-surface font-body antialiased min-h-screen">
// //         {children}
// //       </body>
// //     </html>
// //   );
// // }
// import type { Metadata } from "next";
// import "./globals.css";
// import GoogleAnalytics from "@/components/Googleanalytics";

// export const metadata: Metadata = {
//   title: {
//     template: "%s | CrawlerOptic",
//     default: "CrawlerOptic — AI Crawler Optimizer & llms.txt Generator",
//   },
//   description:
//     "Generate professional llms.txt files for your website. Optimize your digital footprint for LLMs and AI crawlers like GPT, Claude, and Gemini in seconds.",
//   keywords: [
//     "llms.txt",
//     "AI crawler",
//     "AI SEO",
//     "LLM optimization",
//     "AI indexing",
//     "GPT crawler",
//     "Claude crawler",
//     "website AI optimization",
//   ],
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://crawleroptic.com",
//     siteName: "CrawlerOptic",
//     title: "CrawlerOptic — AI Crawler Optimizer",
//     description:
//       "Generate professional llms.txt files. Optimize your website for GPT, Claude, and Gemini AI crawlers.",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "CrawlerOptic — AI Crawler Optimizer",
//     description: "Generate llms.txt files for your website in seconds.",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: { index: true, follow: true },
//   },
//   metadataBase: new URL("https://crawleroptic.com"),
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         {/* AdSense Script — replace ca-pub-XXXXXXXXXXXXXXXX with your Publisher ID */}
//         {/* 
//         <script
//           async
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
//           crossOrigin="anonymous"
//         />
//         */}
//       </head>
//       <body className="bg-surface text-on-surface font-body antialiased min-h-screen">
//         <GoogleAnalytics />
//         {children}
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/Googleanalytics";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | CrawlerOptic",
    default: "CrawlerOptic — AI Crawler Optimizer & llms.txt Generator",
  },
  description:
    "Generate professional llms.txt files for your website. Optimize your digital footprint for LLMs and AI crawlers like GPT, Claude, and Gemini in seconds.",
  keywords: [
    "llms.txt",
    "AI crawler",
    "AI SEO",
    "LLM optimization",
    "AI indexing",
    "GPT crawler",
    "Claude crawler",
    "website AI optimization",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crawleroptic.com",
    siteName: "CrawlerOptic",
    title: "CrawlerOptic — AI Crawler Optimizer",
    description:
      "Generate professional llms.txt files. Optimize your website for GPT, Claude, and Gemini AI crawlers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrawlerOptic — AI Crawler Optimizer",
    description: "Generate llms.txt files for your website in seconds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL("https://crawleroptic.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* AdSense Script — replace ca-pub-XXXXXXXXXXXXXXXX with your Publisher ID */}
        {/* 
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        */}
      </head>
      <body className="bg-surface text-on-surface font-body antialiased min-h-screen">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}