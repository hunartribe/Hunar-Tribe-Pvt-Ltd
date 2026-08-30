import React from "react";
import { Navigate, useParams } from "react-router-dom";

import { useSection } from "../cms/SiteContent";

/**
 * Simple CMS-managed text page, used for the footer's legal and help links.
 * Body copy is plain text; blank lines separate paragraphs.
 */
const ContentPage = () => {
  const { slug } = useParams();
  const pages = useSection("pages");

  const page = pages.items.find((item) => item.slug === slug);

  if (!page) {
    return pages.items.length > 0 ? <Navigate to="/" replace /> : null;
  }

  const paragraphs = (page.body || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section className="contentpage flex flex-col gap-6 items-start px-4 sm:px-6 md:px-[12%] lg:px-[18%] w-full mt-[200px] mb-16">
      <h1 className="text-[32px] lg:text-[42px] tracking-tighter text-textprimary font-bold leading-[120%]">
        {page.title}
      </h1>
      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-textprimary leading-[170%] tracking-tight"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ContentPage;
