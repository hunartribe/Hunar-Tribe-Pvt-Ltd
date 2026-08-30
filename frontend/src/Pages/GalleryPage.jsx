import React from "react";

import { useSection } from "../cms/SiteContent";
import { resolveImage } from "../cms/assets";

const GalleryPage = () => {
  const gallery = useSection("gallery");

  return (
    <section className="gallerypage flex flex-col gap-8 items-center px-4 sm:px-6 md:px-[8%] lg:px-[10%] w-full mt-[200px] mb-16">
      <div className="text w-full flex flex-col justify-center items-center lg:justify-start lg:items-start gap-2">
        <h1 className="text-[36px] lg:text-[48px] tracking-tight text-textprimary font-medium leading-[120%]">
          {gallery.headingLead}{" "}
          <span className="font-bold text-accent1">
            {gallery.headingHighlight}
          </span>
        </h1>
        <p className="description text-textsecondary text-[16px] sm:text-[18px]">
          {gallery.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {gallery.items.map((item, index) => (
          <figure
            key={index}
            className="bg-white rounded-[8px] overflow-clip h-[240px] md:h-[300px] relative group"
          >
            <img
              src={resolveImage(item)}
              alt={item.alt || ""}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {item.caption ? (
              <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-[14px] px-3 pt-6 pb-2">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
};

export default GalleryPage;
