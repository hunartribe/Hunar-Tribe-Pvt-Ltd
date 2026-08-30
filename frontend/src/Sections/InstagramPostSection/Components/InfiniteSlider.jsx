import React, { useState, useEffect } from "react";
import Slider from "react-infinite-logo-slider";
import InstagramPost from "./InstagramPost";

const InfiniteSlider = ({ posts = [] }) => {
  const [sliderWidth, setSliderWidth] = useState("100px");

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth >= 1024) {
        setSliderWidth("400px"); // lg screens
      } else if (window.innerWidth >= 600) {
        setSliderWidth("320px"); // md screens
      } else {
        setSliderWidth("200px"); // sm screens
      }
    };

    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth); // Listen to window resize

    return () => window.removeEventListener("resize", updateWidth); // Cleanup listener
  }, []);

  return (
    <article className="slider w-full gap-2 p-6 bg-white rounded-[12px]">
      <Slider width={sliderWidth} duration={40} pauseOnHover={true}>
        {posts.map((post, index) => (
          <Slider.Slide key={`${post.shortcode}-${index}`}>
            <InstagramPost postid={post.shortcode}></InstagramPost>
          </Slider.Slide>
        ))}
      </Slider>
    </article>
  );
};

export default InfiniteSlider;
