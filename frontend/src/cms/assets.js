// Registry of the images that ship with the build.
//
// CMS records store an `assetKey` instead of a URL when they are still using
// the image that was hardcoded in the section. The admin can upload a
// replacement, which sets an `image` URL and wins over the bundled asset.

import banner1 from "../Sections/HeroSection/Assets/banner1.webp";
import banner2 from "../Sections/HeroSection/Assets/banner2.webp";
import banner3 from "../Sections/HeroSection/Assets/banner3.webp";
import banner4 from "../Sections/HeroSection/Assets/banner4.webp";
import banner5 from "../Sections/HeroSection/Assets/banner5.webp";
import small1 from "../Sections/HeroSection/Assets/small1.webp";
import small2 from "../Sections/HeroSection/Assets/small2.webp";
import small3 from "../Sections/HeroSection/Assets/small3.webp";
import small4 from "../Sections/HeroSection/Assets/small4.webp";
import small5 from "../Sections/HeroSection/Assets/small5.webp";

import tyre from "../Sections/ImpactSection/Assets/tyre.svg";
import students from "../Sections/ImpactSection/Assets/students.svg";
import scrap from "../Sections/ImpactSection/Assets/scrap.svg";
import plastic from "../Sections/ImpactSection/Assets/plastic.svg";
import ecployee from "../Sections/ImpactSection/Assets/ecployee.svg";

import client1 from "../Sections/OurClients/Assets/img1.png";
import client2 from "../Sections/OurClients/Assets/img2.png";
import client3 from "../Sections/OurClients/Assets/img3.png";
import client4 from "../Sections/OurClients/Assets/img4.png";
import client5 from "../Sections/OurClients/Assets/img5.png";
import client6 from "../Sections/OurClients/Assets/img6.png";
import client7 from "../Sections/OurClients/Assets/img7.png";
import client8 from "../Sections/OurClients/Assets/img8.png";
import client9 from "../Sections/OurClients/Assets/img9.png";
import client10 from "../Sections/OurClients/Assets/img10.png";
import client11 from "../Sections/OurClients/Assets/img11.png";
import client12 from "../Sections/OurClients/Assets/img12.png";
import client13 from "../Sections/OurClients/Assets/img13.png";
import client14 from "../Sections/OurClients/Assets/img14.webp";

import gallery1 from "../Sections/GallerySection/Assets/img1.png";
import gallery2 from "../Sections/GallerySection/Assets/img2.png";
import gallery3 from "../Sections/GallerySection/Assets/img3.png";
import gallery4 from "../Sections/GallerySection/Assets/img4.png";
import gallery5 from "../Sections/GallerySection/Assets/img5.png";
import gallery6 from "../Sections/GallerySection/Assets/img6.png";
import gallery7 from "../Sections/GallerySection/Assets/img7.png";

import person1 from "../Sections/TeamSection/Assets/person1.webp";
import person2 from "../Sections/TeamSection/Assets/person2.webp";

import blogimg1 from "../Sections/BlogSection/Assets/blogimg1.png";
import blogimg2 from "../Sections/BlogSection/Assets/blogimg2.jpg";
import blogimg3 from "../Sections/BlogSection/Assets/blogimg3.jpg";

import swiggy from "../SwiggyBanner/Assets/swiggy.png";

export const ASSETS = {
  "hero-banner-1": banner1,
  "hero-banner-2": banner2,
  "hero-banner-3": banner3,
  "hero-banner-4": banner4,
  "hero-banner-5": banner5,
  "hero-small-1": small1,
  "hero-small-2": small2,
  "hero-small-3": small3,
  "hero-small-4": small4,
  "hero-small-5": small5,

  "icon-tyre": tyre,
  "icon-students": students,
  "icon-scrap": scrap,
  "icon-plastic": plastic,
  "icon-employee": ecployee,

  "client-1": client1,
  "client-2": client2,
  "client-3": client3,
  "client-4": client4,
  "client-5": client5,
  "client-6": client6,
  "client-7": client7,
  "client-8": client8,
  "client-9": client9,
  "client-10": client10,
  "client-11": client11,
  "client-12": client12,
  "client-13": client13,
  "client-14": client14,

  "gallery-1": gallery1,
  "gallery-2": gallery2,
  "gallery-3": gallery3,
  "gallery-4": gallery4,
  "gallery-5": gallery5,
  "gallery-6": gallery6,
  "gallery-7": gallery7,

  "team-1": person1,
  "team-2": person2,

  "blog-1": blogimg1,
  "blog-2": blogimg2,
  "blog-3": blogimg3,

  "partner-swiggy": swiggy,
};

/**
 * Resolve an image for a CMS record: an uploaded URL wins, otherwise fall back
 * to the bundled asset the record was seeded with.
 */
export const resolveImage = (item, field = "image", keyField = "assetKey") => {
  if (!item) return "";
  return item[field] || ASSETS[item[keyField]] || "";
};
