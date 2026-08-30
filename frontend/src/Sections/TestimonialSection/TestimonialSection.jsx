import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Components/Button/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import flower from "./Assets/flower.webp";
import hflower from "./Assets/flower2.webp";
import TestimonialPerson from "./TestimonialPerson";

import { useSection, useSiteSettings } from "../../cms/SiteContent";

const TestimonialSection = () => {
  const testimonialsSection = useSection("testimonials");
  const settings = useSiteSettings();

  const testimonials = testimonialsSection.items;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    setIndex((prev) => (prev < testimonials.length ? prev : 0));
  }, [testimonials.length]);

  // Auto change every 5 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const testimonial = testimonials[index] || testimonials[0];
  if (!testimonial) return null;

  return (
    <section
      id="testimonials"
      className="testimonialsection flex flex-col md:flex-row justify-between items-center gap-8 px-4 sm:px-6 md:px-[8%] lg:px-[10%] w-full my-[10%]"
    >
      {/* Left Content (Hidden on mobile) */}
      <div className="leftcontent hidden md:flex w-full md:w-[45%] flex-col justify-start items-start gap-8">
        <div className="text flex flex-col gap-2">
          <h1 className="text-[32px] sm:text-[36px] tracking-tighter md:text-[42px] lg:text-[48px]  text-textprimary font-medium leading-[120%]">
            {testimonialsSection.headingLead}
            <br />
            <span className="font-bold text-accent1">
              {testimonialsSection.headingHighlight}
            </span>{" "}
            {testimonialsSection.headingTail}
          </h1>
          <p className="text-textsecondary text-sm sm:text-base leading-[140%]">
            {testimonialsSection.subtitle}
          </p>
        </div>

        <div className="allbuttons flex flex-col sm:flex-row gap-4 w-full sm:items-center">
          <Button
            link={settings.shopUrl}
            title={testimonialsSection.shopLabel}
            primary
          />

          <div className="buttonsrow flex gap-4 mt-2 sm:mt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="chevrons cursor-pointer w-12 h-12 flex justify-center items-center bg-background border border-accent2 rounded-full hover:scale-110 hover:bg-[#3f12120e] transition"
            >
              <FaChevronLeft size={16} className="text-accent2" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="chevrons cursor-pointer w-12 h-12 flex justify-center items-center bg-background border border-accent2 rounded-full hover:scale-110 hover:bg-[#3f12120e] transition"
            >
              <FaChevronRight size={16} className="text-accent2" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="rightcontent w-full md:w-[55%] bg-accent3light rounded-2xl flex flex-col justify-center items-center gap-8 py-12 px-6 sm:px-8 md:px-12 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center gap-8"
          >
            <p className="text-center tracking-tighter text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] font-medium text-textprimary leading-[130%] max-w-[20ch]">
              &ldquo; {testimonial.quote} &rdquo;
            </p>

            <TestimonialPerson
              name={testimonial.name}
              place={testimonial.place}
              photo={testimonial.photo}
            />
          </motion.div>
        </AnimatePresence>

        {/* Decorative Flowers */}
        <img
          src={flower}
          alt=""
          className="absolute left-[-14%] bottom-[-8%]  w-[36%] hidden sm:block"
        />
        <img
          src={hflower}
          alt=""
          className="absolute right-[-14%] bottom-[-8%] w-[36%] hidden sm:block"
        />
      </div>
    </section>
  );
};

export default TestimonialSection;
