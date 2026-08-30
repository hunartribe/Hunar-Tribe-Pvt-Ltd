import React from "react";
import "./OurClients.css";

import { useSection } from "../../cms/SiteContent";
import { resolveImage } from "../../cms/assets";

const ClientLogo = ({ client }) => {
  const logo = (
    <img
      title={client.name}
      src={resolveImage(client, "logo", "assetKey")}
      alt={client.name}
      className="w-full h-auto object-contain hover:scale-[1.1] ease-in transition-all duration-150 scale-[0.8]"
    />
  );

  return (
    <div className="flex justify-center items-center">
      {client.url ? (
        <a href={client.url} target="_blank" rel="noopener noreferrer">
          {logo}
        </a>
      ) : (
        logo
      )}
    </div>
  );
};

const OurClients = () => {
  const clients = useSection("clients");

  // Split into two rows the way the design lays them out.
  const half = Math.ceil(clients.items.length / 2);
  const rows = [clients.items.slice(0, half), clients.items.slice(half)];

  return (
    <>
      <section
        id="clients"
        className="ourclients flex flex-col justify-center gap-2 items-center md:px-[8%] lg:px-[10%] px-[16px] w-full mt-10 mb-30">
        <div className="text flex flex-col justify-center items-center gap-2">
          <h1 className="text-[36px] lg:text-[48px] tracking-tighter text-textprimary font-medium leading-[120%]">
            {clients.headingLead}&nbsp;
            <span className="font-bold text-accent1">
              {clients.headingHighlight}
            </span>
          </h1>
          <p className="description text-textsecondary text-center md:text-start">
            {clients.subtitle}
          </p>
        </div>

        <div className="imagesgrid grid grid-cols-3 md:grid-cols-7 gap-8 justify-center items-center w-full mt-8 px-4 scale-[0.9]">
          {rows[0].map((client, index) => (
            <ClientLogo key={`${client.name}-${index}`} client={client} />
          ))}
        </div>

        {rows[1].length > 0 ? (
          <>
            <hr className="w-[90%] border-t border-gray-300 my-4" />

            <div className="imagesgrid grid grid-cols-3 md:grid-cols-7 gap-8 justify-center items-center w-full px-4 scale-[0.9] ">
              {rows[1].map((client, index) => (
                <ClientLogo key={`${client.name}-${index}`} client={client} />
              ))}
            </div>
          </>
        ) : null}
      </section>
    </>
  );
};

export default OurClients;
