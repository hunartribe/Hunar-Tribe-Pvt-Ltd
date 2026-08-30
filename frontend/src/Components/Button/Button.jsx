import React from "react";
import { useFollowTarget } from "../../cms/navigation";

/**
 * `link` accepts anything the CMS can hold: a full URL (opens in a new tab),
 * an in-page section id such as "contact", or an app route such as "/news".
 */
const Button = ({ primary, children, title, OnClick, link, type = "button" }) => {
  const follow = useFollowTarget();

  const baseClasses =
    "h-[48px] w-fit flex justify-center items-center  rounded-full px-6 py-2 hover:scale-[0.9] transition-all ease-in cursor-pointer";
  const primaryClasses = "bg-accent2 text-background";
  const secondaryClasses = "border-2 border-accent2 text-accent2";

  const buttonClasses = primary
    ? `${baseClasses} ${primaryClasses}`
    : `${baseClasses} ${secondaryClasses}`;

  const handleClick = () => {
    if (OnClick) {
      OnClick(); // If you passed a custom click function
    }
    if (link) {
      follow(link);
    }
  };

  return (
    <button className={buttonClasses} onClick={handleClick} type={type}>
      {title}
      {children}
    </button>
  );
};

export default Button;
