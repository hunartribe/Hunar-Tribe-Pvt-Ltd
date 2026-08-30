import React, { useState, useEffect, useRef } from "react";
import Advertisment from "./Components/Advertisment";
import Button from "../../Components/Button/Button";
import SocialLinks from "../../Components/SocialLinks/SocialLinks";
import logo from "/Logo.svg";
import NavButtons from "./Components/NavButtons";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../../cms/SiteContent";

const NavBar = () => {
  const settings = useSiteSettings();
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY - lastScrollY.current > 10
      ) {
        // Scrolling down fast
        setShow(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setShow(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 bg-white z-50 flex flex-col justify-center items-center transform transition-transform duration-300 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Advertisment />
      <section className="navbar flex justify-between items-center md:px-[8%] lg:px-[10%] px-[16px] w-full border-b border-[#6f746fce] bg-white cursor-pointer">
        <Link
          to="/"
          className="logo flex justify-center items-center cursor-pointer w-fit py-2"
        >
          <img src={logo} alt="logo" className="w-14 md:w-16" />

          <div className="text leading-tight flex justify-center items-center mt-3">
            <p className="font-bold text-accent2 text-[24px] md:text-[32px] tracking-tighter">
              {settings.brandFirst}
            </p>
            &nbsp;
            <p className="font-bold text-accent1 text-[24px] md:text-[32px] tracking-tighter">
              {settings.brandSecond}
            </p>
          </div>
        </Link>

        <div className="buttonandmeta flex justify-between items-center gap-4">
          <SocialLinks className="hidden md:flex text-accent2 text-[20px] sm:text-[24px]" />
          <div className="scale-[0.9]">
            <Button title={"Shop Now"} link={settings.shopUrl} />
          </div>
        </div>
      </section>
      <NavButtons />
    </nav>
  );
};

export default NavBar;
