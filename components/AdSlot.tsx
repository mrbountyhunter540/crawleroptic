"use client";

import { useEffect } from "react";

type AdFormat = "leaderboard" | "rectangle" | "skyscraper" | "native" | "in-article";

interface AdSlotProps {
  format: AdFormat;
  slotId?: string;
  className?: string;
  label?: string;
}

const AD_DIMENSIONS: Record<AdFormat, { width: number; height: number; label: string }> = {
  leaderboard: { width: 728, height: 90, label: "Leaderboard 728×90" },
  rectangle: { width: 300, height: 250, label: "Medium Rectangle 300×250" },
  skyscraper: { width: 300, height: 600, label: "Half Page 300×600" },
  native: { width: 0, height: 0, label: "Responsive Native Ad" },
  "in-article": { width: 0, height: 0, label: "In-Article Ad" },
};

/**
 * AdSlot — Reusable AdSense placeholder component.
 *
 * Usage:
 * 1. Replace `data-ad-client` with your Publisher ID: ca-pub-XXXXXXXXXXXXXXXX
 * 2. Replace `data-ad-slot` with your Ad Unit slot ID from AdSense dashboard
 * 3. Enable the `<ins>` block and disable the placeholder `<div>` below
 *
 * For approval: Keep placeholders visible until AdSense is approved.
 * After approval, uncomment the <ins> block and remove the placeholder div.
 */
export default function AdSlot({
  format,
  slotId = "0000000000",
  className = "",
  label,
}: AdSlotProps) {
  const adConfig = AD_DIMENSIONS[format];
  const displayLabel = label || adConfig.label;
  const isResponsive = format === "native" || format === "in-article";

  useEffect(() => {
    // Uncomment when AdSense is approved and <ins> block is enabled:
    // try {
    //   (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    //   (window as any).adsbygoogle.push({});
    // } catch (e) {
    //   console.error("AdSense error:", e);
    // }
  }, []);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Label */}
      <span className="text-[10px] uppercase tracking-widest text-outline-variant/60 mb-2 font-label">
        Advertisement
      </span>

      {/* 
        ── ADSENSE BLOCK (enable after approval) ──
        Replace ca-pub-XXXXXXXXXXXXXXXX and slot IDs from your AdSense dashboard.
        
        <ins
          className="adsbygoogle"
          style={{ display: isResponsive ? "block" : "inline-block", width: isResponsive ? "100%" : adConfig.width, height: isResponsive ? "auto" : adConfig.height }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format={isResponsive ? "fluid" : "fixed"}
          data-full-width-responsive="true"
        />
      */}

      {/* ── PLACEHOLDER (remove after AdSense approval) ── */}
      <div
        className="border-2 border-dashed border-outline-variant/20 rounded-lg flex flex-col items-center justify-center bg-surface-container-lowest/50 gap-2"
        style={{
          width: isResponsive ? "100%" : `min(${adConfig.width}px, 100%)`,
          height: isResponsive ? "120px" : `${adConfig.height}px`,
          maxWidth: "100%",
        }}
        aria-label={`Ad placeholder: ${displayLabel}`}
        role="complementary"
      >
        <span className="text-outline-variant/40 font-label text-xs tracking-wide">
          {displayLabel}
        </span>
        <span className="text-outline-variant/20 text-[10px]">
          Slot: {slotId}
        </span>
      </div>
    </div>
  );
}
