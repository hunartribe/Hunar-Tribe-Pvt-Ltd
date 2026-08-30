import React from "react";
import flower from "./Assets/flower.svg";

import { useSection } from "../../cms/SiteContent";
import { resolveImage } from "../../cms/assets";

const TeamSection = () => {
  const team = useSection("team");

  return (
    <section
      id="team"
      className="team-section relative flex justify-center items-center flex-col gap-6 md:px-[4%] lg:px-[10%] px-4 w-full my-[10%]">
      {/* Decorative Flowers - Hidden on Mobile */}
      <img
        src={flower}
        alt=""
        className="flower absolute top-0 left-[-10%] w-80 hidden lg:block"
      />
      <img
        src={flower}
        alt=""
        className="flower absolute right-[-10%] bottom-0 w-80 hidden lg:block"
      />

      {/* Heading */}
      <div className="text-center flex justify-center items-center flex-col gap-2">
        <h1 className="text-[36px] lg:text-[48px] tracking-tighter text-textprimary font-medium leading-[120%]">
          {team.headingLead}{" "}
          <span className="text-accent1 font-bold">{team.headingHighlight}</span>{" "}
          {team.headingTail}
        </h1>
        <p className="description text-textsecondary sm:text-base">
          {team.subtitle}
        </p>
      </div>

      {/* Team Cards */}
      <div className="container flex items-center justify-center gap-6 w-full flex-col md:flex-row mt-4">
        {team.items.map((member, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-start items-start w-full md:w-[40%]"
          >
            {/* Orange Background */}
            <div className="bg-[#FCDE5A66] w-full h-60 rounded-lg relative mt-12">
              {/* Image */}
              <img
                src={resolveImage(member, "photo", "assetKey")}
                alt={member.name}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-72 h-72 object-contain"
              />
            </div>

            {/* Name and Role */}
            <div className="mt-3 flex flex-col justify-start items-start gap-1">
              <h3 className="text-2xl font-semibold text-accent2">
                {member.name}
              </h3>
              <p className="text-textsecondary">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
