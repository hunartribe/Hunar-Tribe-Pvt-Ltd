import React from "react";
import phoneicon from "../Assets/phoneicon.svg";
import { useSiteSettings } from "../../../cms/SiteContent";
import { useFollowTarget } from "../../../cms/navigation";

const Advertisment = () => {
  const settings = useSiteSettings();
  const follow = useFollowTarget();

  return (
    <div className="bg-accent2 text-white flex flex-wrap justify-between items-center w-full px-[4%] py-1 text-[12px]">
      {/* Phone Section */}
      <a href={`tel:${settings.phone}`} className="flex items-center gap-2">
        <img src={phoneicon} alt="" className="w-4 h-4" />
        <p>{settings.phone}</p>
      </a>

      {/* Offer - hidden on mobile, and switched off from the CMS out of season */}
      {settings.promoEnabled && settings.promoText ? (
        <div className="hidden sm:flex items-center gap-2">
          <p className="text-neutral-200 font-light">{settings.promoText} |</p>
          <button
            onClick={() => follow(settings.promoCtaUrl || settings.shopUrl)}
            className="underline text-[13px] cursor-pointer"
          >
            {settings.promoCtaLabel || "Shop Now"}
          </button>
        </div>
      ) : null}

      {/* Location */}
      <p className="text-white">
        <span className="font-medium text-[13px]">
          {settings.locationShort},
        </span>
        &nbsp;{settings.country}
      </p>
    </div>
  );
};

export default Advertisment;
