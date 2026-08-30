import React, { useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";

import NavBar from "../Sections/NavBar/NavBar";
import Footer from "../Sections/FooterSection/Footer";
import { scrollToSection } from "../cms/navigation";

/**
 * New route: start at the top. Route carrying a hash (a footer or nav link
 * pointing back at a landing-page section): scroll to that section once the
 * page has painted.
 */
function ScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = hash.replace(/^#/, "");
    const timer = setTimeout(() => scrollToSection(id), 100);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <>
      <ScrollOnNavigate />
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default Layout;
