import React from "react";
import { useFollowTarget } from "../../../cms/navigation";
import { resolveImage } from "../../../cms/assets";

/**
 * A post opens its external link when one is set, otherwise its own
 * /news/:slug page.
 */
const BlogCard = ({ post }) => {
  const follow = useFollowTarget();
  const target = post.externalUrl || `/news/${post.slug}`;

  return (
    <>
      <article
        onClick={() => follow(target)}
        className="blog cursor-pointer hover:scale-[0.9] duration-100 ease-in transition-all flex flex-col justify-start items-start gap-4 w-full"
      >
        <div className="blogimage w-full h-[200px] lg:h-[300px]">
          <img
            src={resolveImage(post)}
            alt={post.title}
            loading="lazy"
            className="image w-full h-full object-cover rounded-[8px]"
          />
        </div>

        <p className="titile font-medium tracking-tight leading-[120%] text-textprimary text-[20px]">
          {post.title}
        </p>
        <div className="context flex -mt-1 gap-2 justify-start items-center w-full">
          {post.tag ? (
            <p className="type bg-accent3 px-4 py-1 rounded-full text-[14px] text-accent2 font-medium tracking-tight">
              {post.tag}
            </p>
          ) : null}
          <p className="date text-textsecondary text-[14px]">{post.date}</p>
        </div>
      </article>
    </>
  );
};

export default BlogCard;
