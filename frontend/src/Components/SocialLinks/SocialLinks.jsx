import React from "react";
import {
  BiLogoWhatsapp,
  BiLogoLinkedin,
  BiLogoInstagram,
} from "react-icons/bi";

import { useSiteSettings } from "../../cms/SiteContent";

const SocialLinks = ({ className = "" }) => {
  const settings = useSiteSettings();

  const links = [
    { url: settings.whatsappUrl, label: "WhatsApp", Icon: BiLogoWhatsapp },
    { url: settings.linkedinUrl, label: "LinkedIn", Icon: BiLogoLinkedin },
    { url: settings.instagramUrl, label: "Instagram", Icon: BiLogoInstagram },
  ].filter((link) => link.url);

  return (
    <div className={`flex justify-center gap-4 ${className}`}>
      {links.map(({ url, label, Icon }) => (
        <a
          key={label}
          target="_blank"
          href={url}
          aria-label={label}
          className="hover:text-accent1"
          rel="noopener noreferrer"
        >
          <Icon size={24} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
