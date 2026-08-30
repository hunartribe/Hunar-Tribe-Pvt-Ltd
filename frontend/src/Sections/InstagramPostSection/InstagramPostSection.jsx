import React from "react";
import Button from "../../Components/Button/Button";
import InfiniteSlider from "../InstagramPostSection/Components/InfiniteSlider";

import { useSection, useSiteSettings } from "../../cms/SiteContent";

const InstagramPostSection = () => {
  const instagram = useSection("instagram");
  const settings = useSiteSettings();

  if (instagram.items.length === 0) return null;

  return (
    <>
      <section className="instagram flex flex-col justify-between gap-8 bg-accent3light items-center md:px-[8%] py-[4%] lg:px-[10%] px-4 w-full mt-10 mb-10">
        <div className="text w-full mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <h1 className="text-[32px] lg:text-[48px] tracking-tighter text-textprimary font-medium leading-[120%]">
            {instagram.headingLead}&nbsp;
            <span className="font-bold text-accent1">
              {instagram.headingHighlight}
            </span>
          </h1>

          {/* Hide on small screens */}
          <div className="hidden sm:block">
            <Button
              title={instagram.followLabel}
              link={settings.instagramUrl}
            />
          </div>
        </div>

        <InfiniteSlider posts={instagram.items} />
      </section>
    </>
  );
};

export default InstagramPostSection;
