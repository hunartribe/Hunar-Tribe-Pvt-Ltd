import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import Button from "../../Components/Button/Button";
import { useSection, useSiteSettings } from "../../cms/SiteContent";
import { resolveImage } from "../../cms/assets";

const HeroSection = () => {
  const hero = useSection("hero");
  const settings = useSiteSettings();

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = hero.items;

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Content can arrive after the first paint, so keep the index in range.
  useEffect(() => {
    setCurrentSlide((prev) => (prev < slides.length ? prev : 0));
  }, [slides.length]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slide = slides[currentSlide] || slides[0];
  if (!slide) return null;

  const mobileImage = resolveImage(slide, "mobileImage", "mobileAssetKey");
  const desktopImage = resolveImage(slide, "image", "assetKey");
  const backgroundImage = (isMobile && mobileImage) || desktopImage;

  const [firstWord, ...restWords] = (slide.title || "").split(" ");

  return (
    <section className="hero-section h-[80vh] md:h-[68vh] flex flex-col justify-center items-center w-full px-[16px] md:px-[4%] relative mb-4 mt-[160px] md:mt-[160px]">
      <motion.div
        key={currentSlide}
        className="heroimage w-full h-full bg-cover bg-center bg-no-repeat flex justify-start items-center px-[6%] py-12 rounded-[16px]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        initial={{ x: 300, opacity: 0 }} // Start from the right
        animate={{ x: 0, opacity: 1 }} // Slide to the center
        exit={{ x: -300, opacity: 0 }} // Slide to the left on exit
        transition={{ duration: 0.5 }}
      >
        <div className="content self-start md:self-center w-full md:text-left flex flex-col justify-center items-center gap-4 md:items-start md:justify-start text-center">
          <motion.h1
            className="text-[28px] md:text-[42px] tracking-tighter leading-[120%] font-bold text-textprimary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {firstWord} <br />
            <span className="text-accent1">{restWords.join(" ")}</span>
          </motion.h1>
          <p className="text-textsecondary w-[28ch] md:w-[36ch] tracking-tight leading-[130%]">
            {slide.description}
          </p>
          <Button
            link={slide.buttonUrl || settings.shopUrl}
            title={slide.buttonText}
            primary={true}
          />
        </div>
      </motion.div>

      <div className="dots flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? "bg-accent1 w-12" : "bg-gray-300"
            } cursor-pointer`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
