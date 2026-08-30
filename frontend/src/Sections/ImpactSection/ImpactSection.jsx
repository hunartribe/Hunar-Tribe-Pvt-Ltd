import React from "react";
import Button from "../../Components/Button/Button";
import ImpactCard from "./ImpactCard";

import { useSection, useSiteSettings } from "../../cms/SiteContent";
import { resolveImage } from "../../cms/assets";

const ImpactSection = () => {
  const impact = useSection("impact");
  const settings = useSiteSettings();

  const joinTarget = settings.joinUsUrl || "contact";

  return (
    <>
      <section
        id="impact"
        className=" impact flex flex-col justify-between gap-8 items-center md:px-[8%] lg:px-[10%] px-[16px] w-full mt-10 mb-10">
        <div className="leftcontent w-full flex justify-between items-end gap-4">
          <div className="text flex flex-col lg:justify-start justify-center items-center lg:items-start gap-2">
            <h1 className="text-[36px] lg:text-[48px] tracking-tight text-textprimary font-medium leading-[120%]">
              {impact.headingLead}&nbsp;
              <span className="font-bold text-accent1">
                {impact.headingHighlight}
              </span>
            </h1>
            <p className="description text-textsecondary  text-center md:text-start">
              {impact.subtitle}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 hidden lg:block">
            <Button primary title={impact.joinLabel} link={joinTarget} />
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
          {impact.items.map((item, index) => (
            <ImpactCard
              key={index}
              icon={resolveImage(item)}
              number={item.number}
              quantity={item.unit}
              highlight={item.highlight}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ImpactSection;
