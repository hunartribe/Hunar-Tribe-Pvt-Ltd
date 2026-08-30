import React from "react";
import { useFollowTarget } from "../../../cms/navigation";

const FooterButtons = ({ item, heading }) => {
  const follow = useFollowTarget();

  return (
    <div className="flex flex-col items-start gap-2 text-[18px]">
      <p className="font-bold text-accent3">{heading}</p>
      <ul className="flex flex-col gap-1 text-white">
        {item.map((entry) => (
          <li key={entry.label}>
            <button
              onClick={() => follow(entry.target, { offset: -200 })}
              className="hover:underline cursor-pointer text-left"
            >
              {entry.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterButtons;
