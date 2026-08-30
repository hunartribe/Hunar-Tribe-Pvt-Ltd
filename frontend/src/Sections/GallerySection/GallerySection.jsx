import React from "react";
import Button from "../../Components/Button/Button";

import { useSection } from "../../cms/SiteContent";
import { resolveImage } from "../../cms/assets";

// The first two tiles are the large ones in the bento layout; everything after
// them fills a single cell. Written out in full so Tailwind keeps the classes.
const TILE_SPANS = [
  "col-span-1 sm:col-span-2 sm:row-span-2",
  "col-span-1 sm:col-span-2 sm:row-span-3",
];

const GALLERY_PREVIEW_COUNT = 7;

const GallerySection = () => {
  const gallery = useSection("gallery");
  const items = gallery.items.slice(0, GALLERY_PREVIEW_COUNT);
  const hasMore = gallery.items.length > GALLERY_PREVIEW_COUNT;

  return (
    <section
      id="gallery"
      className="product flex flex-col justify-between gap-8 items-center md:px-[8%] lg:px-[10%] px-[16px] w-full mt-10 mb-10"
    >
      {/* Heading and Button */}
      <div className="leftcontent w-full flex justify-between items-end gap-4 flex-wrap">
        <div className="text flex flex-col justify-center items-center md:justify-start md:items-start gap-2">
          <h1 className="text-[36px] lg:text-[48px] tracking-tight text-textprimary font-medium leading-[120%]">
            {gallery.headingLead}{" "}
            <span className="font-bold text-accent1">
              {gallery.headingHighlight}
            </span>
          </h1>
          <p className="description text-textsecondary text-[16px] text-center lg:text-start sm:text-[18px]">
            {gallery.subtitle}
          </p>
        </div>
        {/* Hide button on mobile */}
        <div className="hidden md:block">
          <Button title={gallery.seeAllLabel} link="/gallery" />
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-[150px] md:auto-rows-[200px] lg:auto-rows-[240px] gap-4 w-full">
        {items.map((item, index) => (
          <figure
            key={index}
            className={`bg-white flex items-center justify-center rounded-[8px] overflow-clip relative group ${
              TILE_SPANS[index] || ""
            }`}
          >
            <img
              src={resolveImage(item)}
              alt={item.alt || ""}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {item.caption ? (
              <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-[14px] px-3 pt-6 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {hasMore ? (
        <div className="md:hidden">
          <Button title={gallery.seeAllLabel} link="/gallery" />
        </div>
      ) : null}
    </section>
  );
};

export default GallerySection;
