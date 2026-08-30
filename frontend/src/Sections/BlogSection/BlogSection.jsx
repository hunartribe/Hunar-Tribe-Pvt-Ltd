import React from "react";
import Button from "../../Components/Button/Button";
import BlogCard from "./Components/BlogCard";

import { useSection } from "../../cms/SiteContent";

const POSTS_ON_LANDING = 3;

const BlogSection = () => {
  const blogs = useSection("blogs");
  const posts = blogs.items.slice(0, POSTS_ON_LANDING);

  if (posts.length === 0) return null;

  return (
    <section
      id="news"
      className="impact flex flex-col justify-between gap-8 items-center px-4 sm:px-6 md:px-[8%] lg:px-[10%] w-full my-12"
    >
      {/* Top Header Section */}
      <div className="leftcontent w-full flex flex-col md:flex-row justify-between items-center lg:items-start md:items-end gap-4">
        <div className="text flex flex-col justify-center items-center lg:justify-start lg:items-start gap-0 lg:gap-2">
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

        {/* Button hidden on small screens */}
        <div className="hidden md:block">
          <Button title={blogs.readMoreLabel} link="/news" />
        </div>
      </div>

      {/* Grid of Blogs */}
      <div className="gridsofblogs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Button visible only on small screens */}
      <div className="md:hidden">
        <Button title={blogs.readMoreLabel} link="/news" />
      </div>
    </section>
  );
};

export default BlogSection;
