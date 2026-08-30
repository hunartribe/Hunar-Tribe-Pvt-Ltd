import React from "react";
import { Navigate, useParams } from "react-router-dom";

import Button from "../Components/Button/Button";
import { useSection } from "../cms/SiteContent";
import { resolveImage } from "../cms/assets";

const NewsArticlePage = () => {
  const { slug } = useParams();
  const blogs = useSection("blogs");

  const post = blogs.items.find((item) => item.slug === slug);

  // Content may still be loading on a cold open, so only 404 once the list has
  // something in it and this slug is genuinely not part of it.
  if (!post) {
    return blogs.items.length > 0 ? <Navigate to="/news" replace /> : null;
  }

  const paragraphs = (post.body || post.excerpt || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <article className="newsarticle flex flex-col gap-6 items-start px-4 sm:px-6 md:px-[12%] lg:px-[18%] w-full mt-[200px] mb-16">
      <div className="flex flex-col gap-2 w-full">
        <div className="context flex gap-2 justify-start items-center">
          {post.tag ? (
            <p className="type bg-accent3 px-4 py-1 rounded-full text-[14px] text-accent2 font-medium tracking-tight">
              {post.tag}
            </p>
          ) : null}
          <p className="date text-textsecondary text-[14px]">{post.date}</p>
        </div>
        <h1 className="text-[32px] lg:text-[42px] tracking-tighter text-textprimary font-bold leading-[120%]">
          {post.title}
        </h1>
      </div>

      <img
        src={resolveImage(post)}
        alt={post.title}
        className="w-full max-h-[440px] object-cover rounded-[12px]"
      />

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

      <Button title="Back To News" link="/news" />
    </article>
  );
};

export default NewsArticlePage;
