import React from "react";

import BlogCard from "../Sections/BlogSection/Components/BlogCard";
import { useSection } from "../cms/SiteContent";

const NewsIndexPage = () => {
  const blogs = useSection("blogs");

  return (
    <section className="newsindex flex flex-col justify-between gap-8 items-center px-4 sm:px-6 md:px-[8%] lg:px-[10%] w-full mt-[200px] mb-16">
      <div className="text w-full flex flex-col justify-center items-center lg:justify-start lg:items-start gap-2">
        <h1 className="text-[36px] lg:text-[48px] tracking-tighter text-textprimary font-medium leading-[120%]">
          {blogs.headingLead}&nbsp;
          <span className="font-bold text-accent1">
            {blogs.headingHighlight}
          </span>
        </h1>
        <p className="description text-textsecondary text-sm sm:text-base">
          {blogs.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {blogs.items.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default NewsIndexPage;
