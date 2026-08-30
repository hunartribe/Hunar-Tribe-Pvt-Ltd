import React from "react";

import { useSection } from "../../cms/SiteContent";
import { visionIcon } from "../../cms/icons";

const OurVisionSection = () => {
  const vision = useSection("vision");

  return (
    <section
      id="vision"
      className="impactsection flex flex-col justify-between gap-6 items-center md:px-[8%] lg:px-[10%] px-[16px] w-full mt-[10%] mb-[10%]">
      <div className="text flex flex-col justify-center items-center gap-2">
        <h1 className="text-[36px] lg:text-[48px] tracking-tighter text-textprimary font-medium leading-[120%]">
          {vision.headingLead}&nbsp;
          <span className="font-bold text-accent1">
            {vision.headingHighlight}
          </span>
        </h1>
        <p className="description text-textsecondary text-center md:text-start">
          {vision.subtitle}
        </p>
      </div>
      <article className="iconcards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
        {vision.items.map((item, index) => (
          <div
            key={index}
            className="visioncard flex flex-col w-full items-center justify-center gap-6 px-[48px] py-[36px] rounded-lg hover:scale-[0.95] transition-all ease-in-out"
            style={{ backgroundColor: item.bgColor }}
          >
            {visionIcon(item.iconKey, item.iconColor)}
            <p className="title text-center text-textprimary leading-[150%] tracking-tight font-medium text-[20px]">
              {item.title} <br />
              <span className="font-bold text-accent1 text-[24px]">
                {item.highlight}
              </span>
              &nbsp; {item.description}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default OurVisionSection;
