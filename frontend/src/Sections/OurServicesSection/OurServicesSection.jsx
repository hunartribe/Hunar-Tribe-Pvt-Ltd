import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { useSection, useSiteSettings } from "../../cms/SiteContent";
import { resolveImage } from "../../cms/assets";

const OurServicesSection = () => {
  const services = useSection("services");
  const settings = useSiteSettings();

  const items = services.items;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex((prev) => (prev < items.length ? prev : 0));
  }, [items.length]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const service = items[index] || items[0];
  if (!service) return null;

  const points = [service.point1, service.point2, service.point3].filter(
    Boolean
  );

  // "Join Us" opens a CMS link when there is one, otherwise it brings the
  // visitor down to the contact form.
  const joinTarget = settings.joinUsUrl || "contact";

  return (
    <section
      id="services"
      className="service flex flex-col justify-center gap-8 overflow-y-clip items-start min-h-screen md:px-[8%] lg:px-[10%] px-4 w-full py-12"
    >
      {/* Heading and Join Button */}
      <div className="leftcontent w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="text flex flex-col justify-center items-center lg:justify-start lg:items-start gap-2">
          <h1 className="text-[32px] md:text-[48px] tracking-tighter text-textprimary font-medium leading-[120%]">
            {services.headingLead}{" "}
            <span className="font-bold text-accent1">
              {services.headingHighlight}
            </span>
          </h1>
          <p className="description text-textsecondary  text-center md:text-start">
            {services.subtitle}
          </p>
        </div>
        <div className="mt-2 sm:mt-0 hidden lg:block">
          <Button title={services.joinLabel} link={joinTarget} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse lg:flex-row items-center py-4 h-full gap-10 justify-center w-full">
        {/* Left Content */}
        <div className="leftcontent flex flex-col items-center justify-center  lg:justify-start lg:items-start gap-6 w-full">
          <motion.div
            key={`title-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="maincontent flex justify-start items-center gap-4"
          >
            <div className="iconplace bg-accent3 rounded-full flex justify-center items-center w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex-shrink-0">
              <img
                src={resolveImage(service, "icon", "iconAssetKey")}
                alt=""
                className="icon w-[60%] h-[60%] scale-[0.8]"
              />
            </div>
            <p className="heading font-bold text-[28px] md:text-[32px] text-accent2 tracking-tighter">
              {service.title}
            </p>
          </motion.div>

          {/* Points List */}
          <div className="points flex flex-col justify-start items-start gap-2">
            {points.map((point, i) => (
              <div
                key={i}
                className="point flex justify-start items-start gap-2"
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-700 text-lg"
                />
                <p className="pointtext font-medium text-textprimary tracking-tight">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="allbuttons flex flex-wrap justify-center items-center lg:justify-start lg:items-center w-full gap-3">
            <Button primary title={services.contactLabel} link="contact" />
            <Button
              title={services.learnMoreLabel}
              link={services.learnMoreUrl || "contact"}
            />
            <div className="buttonsrow flex justify-center items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous service"
                className="chevrons w-10 h-10 flex justify-center items-center p-2 bg-background border border-accent2 rounded-full hover:scale-105 hover:bg-[#3f12120e] cursor-pointer transition-all"
              >
                <FaChevronLeft size={16} className="text-accent2" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next service"
                className="chevrons w-10 h-10 flex justify-center items-center p-2 bg-background border border-accent2 rounded-full hover:scale-105 hover:bg-[#3f12120e] cursor-pointer transition-all"
              >
                <FaChevronRight size={16} className="text-accent2" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Content - YouTube Video */}
        <motion.div
          key={`video-${index}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="rightcontent w-full max-w-full "
        >
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src={service.youtubeUrl}
              title={service.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServicesSection;
