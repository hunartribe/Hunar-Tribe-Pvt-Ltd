import React from "react";
import { useSection } from "../../cms/SiteContent";

const MarqueeScroll = () => {
  const marquee = useSection("marquee");

  // The list is rendered twice so the CSS animation can loop seamlessly.
  const tags = marquee.items;
  if (tags.length === 0) return null;

  return (
    <section className="relative w-full  bg-accent2 overflow-hidden py-2">
      {/* Wrapper for positioning */}
      <div className="flex items-center justify-center gap-8 animate-marquee">
        {[...Array(2)].map((_, repeatIndex) =>
          [...tags, ...tags].map((tag, index) => (
            <div
              key={`${repeatIndex}-${index}`}
              className="flex items-center justify-center gap-8"
            >
              <span className="text-white">{tag.text}</span>
              <div className="w-2 h-2 bg-accent3 rounded-full"></div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MarqueeScroll;
