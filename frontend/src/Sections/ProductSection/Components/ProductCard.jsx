import React from "react";

const ProductCard = ({ img, title, price, badge, shopUrl, categoryName }) => {
  const openShop = () => window.open(shopUrl, "_blank", "noopener,noreferrer");

  return (
    <article className="w-full cursor-pointer h-[260px] md:h-[360px] rounded-[16px] border-2 border-[#6F746F4D] bg-background shadow-md flex flex-col items-center justify-center relative group overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Badge - only when this product has actually been given one */}
      {badge ? (
        <div className="absolute hidden md:flex justify-center items-center top-0 left-0 bg-accent1 text-white font-medium tracking-tighter px-6 py-2  rounded-br-full z-2">
          <p className="leading-[130%]">{badge}</p>
        </div>
      ) : null}

      {/* Image Wrapper for hover effect */}
      <div className="w-full flex justify-center transition-transform duration-300 group-hover:scale-110">
        <img
          src={img}
          loading="lazy"
          alt={title || `${categoryName || "Hunar Tribe"} product`}
          className="w-full object-cover scale-[1.1] md:scale-none"
        />
      </div>

      {/* Caption - shown when the CMS has a name or price for this image */}
      {title || price ? (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-[22%] lg:pb-4 lg:group-hover:pb-[22%] transition-all duration-500 pointer-events-none">
          {title ? (
            <p className="text-white font-medium tracking-tight leading-[120%] text-[14px] sm:text-[16px] line-clamp-2">
              {title}
            </p>
          ) : null}
          {price ? (
            <p className="text-white/90 text-[13px] sm:text-[14px]">{price}</p>
          ) : null}
        </div>
      ) : null}

      <button
        className="shine-button absolute text-[14px] sm:text-[16px] bottom-[6%] left-1/2 transform -translate-x-1/2 opacity-100 lg:bottom-[-60px] lg:opacity-0 lg:group-hover:bottom-[8%] lg:group-hover:opacity-100 bg-accent1 text-white font-medium tracking-tighter px-4 md:px-6 py-2 rounded-[8px] transition-all duration-500 ease-in-out overflow-hidden w-[80%]"
        onClick={openShop}
      >
        View Product
        <span className="shine-effect"></span>
      </button>
    </article>
  );
};

export default ProductCard;
