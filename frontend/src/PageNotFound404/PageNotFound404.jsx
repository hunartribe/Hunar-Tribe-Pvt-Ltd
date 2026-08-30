import React from "react";
import Button from "../Components/Button/Button";
import { useSiteSettings } from "../cms/SiteContent";

function PageNotFound404({ description, img }) {
  const settings = useSiteSettings();

  return (
    <>
      <section className="pagenotfound flex flex-col md:flex-row justify-center gap-8 bg-white items-center md:px-[8%] py-[4%] lg:px-[10%] px-[16px] w-full mt-[10%]">
        <div className="textandbutton w-full flex flex-col justify-center items-center gap-8">
          <div className="text flex flex-col justify-center items-center w-full gap-2">
            <h1 className="text-[120px] md:text-[240px] tracking-tight text-accent1 font-bold leading-[100%]">
              404
            </h1>
            <p className="description -mt-4 font-medium tracking-tight text-textprimary md:text-[32px] text-[20px]">
              {description}
            </p>
          </div>
          <div className="buttons flex justify-center items-center gap-4">
            <Button title="Back To Home" link="/" />
            <Button primary title="Shop Now" link={settings.shopUrl} />
          </div>
        </div>

        <img src={img} alt="" className="illustration w-full md:w-[50%]" />
      </section>
    </>
  );
}

export default PageNotFound404;
