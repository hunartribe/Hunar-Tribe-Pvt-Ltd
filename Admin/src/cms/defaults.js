// Default site content.
//
// This is the exact copy that used to live inside each section component. It
// serves two purposes:
//   1. fallback for the public site when Firestore is unreachable or empty
//   2. seed data the admin writes into Firestore on first run
//
// Mirrors frontend/src/cms/defaults.js - keep the two in step.
// Images are referenced by `assetKey` (see cms/assets.js) until someone
// uploads a replacement, which fills in the `image` field.

export const SECTION_KEYS = [
  "settings",
  "navigation",
  "hero",
  "marquee",
  "promoBanner",
  "categories",
  "services",
  "clients",
  "impact",
  "vision",
  "gallery",
  "team",
  "blogs",
  "testimonials",
  "instagram",
  "pages",
];

const SHOP_URL = "https://hunartribe.mini.site/?path=%2F";

export const defaults = {
  settings: {
    brandFirst: "Hunar",
    brandSecond: "Tribe",
    phone: "+91-8000425929",
    whatsappNumber: "918000425929",
    email: "hunartribe@gmail.com",
    workHours: "08:00AM - 08:00PM",
    addressLine: "Dungarpur, Rajasthan, India",
    locationShort: "Rajasthan",
    country: "India",
    whatsappUrl: "https://wa.me/918000425929",
    instagramUrl: "https://www.instagram.com/hunar_tribe_upcycles/",
    linkedinUrl: "https://www.linkedin.com/company/hunar-tribe/",
    shopUrl: SHOP_URL,
    // Empty means "scroll to the contact section" instead of opening a link.
    joinUsUrl: "",
    promoEnabled: true,
    promoText: "Handcrafted from scrap, made to last 🎉",
    promoCtaLabel: "Shop Now",
    promoCtaUrl: SHOP_URL,
    copyrightYear: "2026",
    companyName: "Hunar Tribe Pvt Ltd",
    contactSubtitle: "For Bulk orders or need a service",
    bulkTitle: "Need Bulk In Orders?",
    bulkHighlight: "Bulk",
    bulkDescription: "Don't worry! Just a Call we will reach you",
    bulkCtaLabel: "Order Through Text!",
    bulkBackCtaLabel: "Start Messaging Now!",
    footerCtaTitle: "Let's Talk",
    footerCtaSubtitle: "Need a Service ?",
    // Contact submissions go to the Firestore `leads` collection. The legacy
    // Google Form can be re-enabled here without a code change.
    leadsToFirestore: true,
    googleFormEnabled: false,
    googleFormUrl:
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLScp3qFUGDLe-tv3jP4LUF9-Ur-neX6EDpa_kNgB2l1ujMBh4A/formResponse",
    googleFormEntryName: "entry.385947290",
    googleFormEntryMobile: "entry.1452828579",
    googleFormEntryEmail: "entry.1226840964",
    googleFormEntryMessage: "entry.1700694137",
  },

  navigation: {
    items: [
      { label: "Products", sectionId: "products" },
      { label: "Services", sectionId: "services" },
      { label: "Contact Us", sectionId: "contact" },
      { label: "Gallery", sectionId: "gallery" },
      { label: "Testimonials", sectionId: "testimonials" },
    ],
    usefulHeading: "Useful Links",
    useful: [
      { label: "Products", target: "products" },
      { label: "Services", target: "services" },
      { label: "Contact Us", target: "contact" },
      { label: "Gallery", target: "gallery" },
      { label: "Testimonials", target: "testimonials" },
    ],
    helpHeading: "Help Center",
    help: [
      { label: "Shipping & Returns", target: "/p/shipping-and-returns" },
      { label: "Track Your Order", target: SHOP_URL },
      { label: "Payment Options", target: "/p/payment-options" },
      { label: "FAQs", target: "/p/faqs" },
    ],
    aboutHeading: "About Us",
    about: [
      { label: "Join Us", target: "/#contact" },
      { label: "Press & Media", target: "/p/press-and-media" },
      { label: "Blogs", target: "/news" },
      { label: "Privacy Policy", target: "/p/privacy" },
    ],
    legal: [
      { label: "Refund Policy", target: "/p/refund-policy" },
      { label: "Legal", target: "/p/legal" },
      { label: "Privacy", target: "/p/privacy" },
      { label: "Site-Map", target: "/p/site-map" },
      { label: "Cookies", target: "/p/cookies" },
    ],
  },

  hero: {
    items: [
      {
        assetKey: "hero-banner-1",
        mobileAssetKey: "hero-small-3",
        title: "Reimagining Early Childhood Spaces",
        description:
          "Creative, colorful, and child-centric Anganwadis designed to spark curiosity and care.",
        buttonText: "Shop Now",
        buttonUrl: SHOP_URL,
      },
      {
        assetKey: "hero-banner-2",
        mobileAssetKey: "hero-small-2",
        title: "Transforming Trash into Treasures",
        description:
          "Enhancing the local tribes to upskill their abilities to make difference.",
        buttonText: "Explore Now",
        buttonUrl: "#products",
      },
      {
        assetKey: "hero-banner-3",
        mobileAssetKey: "hero-small-1",
        title: "From Margins to Makers",
        description:
          "Empowering tribal youth with skills, creativity, and opportunities to lead with purpose.",
        buttonText: "View Gallery",
        buttonUrl: "#gallery",
      },
      {
        assetKey: "hero-banner-4",
        mobileAssetKey: "hero-small-4",
        title: "Unbreakable. Timeless. Tire Pots.",
        description:
          "Redefining durability with sustainable design - handcrafted from reclaimed tires.",
        buttonText: "Shop Handmade",
        buttonUrl: SHOP_URL,
      },
      {
        assetKey: "hero-banner-5",
        mobileAssetKey: "hero-small-5",
        title: "Every Piece Tells a Story",
        description:
          "Unique decor handcrafted from scrap — sustainable, soulful, and full of character",
        buttonText: "Shop Handmade",
        buttonUrl: SHOP_URL,
      },
    ],
  },

  marquee: {
    items: [
      { text: "TIRE POTS" },
      { text: "BAGS" },
      { text: "INDOOR POTS" },
      { text: "INTERIOR" },
      { text: "SELFIE POINTS" },
      { text: "TIRE POTS" },
      { text: "INTERIOR" },
    ],
  },

  promoBanner: {
    enabled: true,
    headline: "Get your First Order!",
    badgeText: "Now Available At!",
    assetKey: "partner-swiggy",
    partnerName: "Swiggy",
    url: SHOP_URL,
  },

  categories: {
    headingLead: "Check out our",
    headingHighlight: "Products",
    browseAllLabel: "Browse All",
    items: [
      {
        name: "Art Mini Collection",
        folder: "art mini collection",
        iconKey: "palette",
      },
      { name: "Bird Collection", folder: "bird collection", iconKey: "feather" },
      {
        name: "Black and White Collection",
        folder: "black and white collection",
        iconKey: "shapes",
      },
      { name: "Boho Collection", folder: "boho collection", iconKey: "seedling" },
      {
        name: "Feminine Collection",
        folder: "girls collection",
        iconKey: "palette",
      },
      {
        name: "Hanging Pot Collection",
        folder: "hanging pot collection",
        iconKey: "tree",
      },
      {
        name: "Tribal Collection",
        folder: "tribal collection",
        iconKey: "industry",
      },
      {
        name: "Whispering Petals Collection",
        folder: "whispering petals",
        iconKey: "feather",
      },
      { name: "Lamps", folder: "lamp product", iconKey: "lightbulb" },
      { name: "Home Decor", folder: "home decor article", iconKey: "home" },
    ],
  },

  services: {
    headingLead: "Our",
    headingHighlight: "Services",
    subtitle: "Transforming Lives and Communities Through Innovation",
    joinLabel: "Join Us",
    contactLabel: "Contact Us",
    learnMoreLabel: "Learn More",
    learnMoreUrl: "",
    items: [
      {
        title: "Building Model Anganwadi",
        point1:
          "Designing vibrant, child-friendly Anganwadi spaces using sustainable, upcycled materials.",
        point2:
          "Supporting early childhood development through creative and functional design.",
        point3:
          "Empowering communities with environmentally-conscious, impactful design solutions.",
        iconAssetKey: "icon-students",
        youtubeUrl:
          "https://www.youtube.com/embed/nD3oSBv7uxY?si=c-j80lQvQYNP96Kz",
      },
      {
        title: "Tyre-Based Playgrounds",
        point1: "Crafting safe, eco-friendly playgrounds from discarded tyres",
        point2: "Promoting active play through joyful, upcycled designs.",
        point3: "Showcasing sustainability by transforming waste into wonder.",
        iconAssetKey: "icon-tyre",
        youtubeUrl:
          "https://www.youtube.com/embed/69ZQsBC1fPU?si=iZ7GCh12OTfcTPDr",
      },
      {
        title: "Waste to Wonder Parks",
        point1: "Transforming public spaces into creative, interactive wonders.",
        point2: "Using waste materials to design parks and gardens sustainably.",
        point3: "Inspiring awareness and eco-conscious living through design.",
        iconAssetKey: "icon-scrap",
        youtubeUrl:
          "https://www.youtube.com/embed/1I2XiQ0TdLw?si=imgpkr9LBRko_dfR",
      },
      {
        title: "Establishing Zero Waste Learning Centers",
        point1:
          "Establishing learning hubs focused on skill-building and sustainability.",
        point2:
          "Empowering youth and communities through hands-on eco education.",
        point3: "Promoting zero-waste living with practical, creative design.",
        iconAssetKey: "icon-plastic",
        youtubeUrl:
          "https://www.youtube.com/embed/-J1DqW4nDyY?si=B_-PacTpPT_D-VEG",
      },
      {
        title: "Upcycling & Sustainability Workshops",
        point1:
          "Conducting immersive workshops to showcase the power of upcycling.",
        point2:
          "Engaging schools and communities in hands-on waste management activities.",
        point3:
          "Fostering creativity and eco-awareness through interactive learning.",
        iconAssetKey: "icon-employee",
        youtubeUrl:
          "https://www.youtube.com/embed/mrXL-PceEyE?si=uStH6-k2-r1rZBZF",
      },
    ],
  },

  clients: {
    headingLead: "Our",
    headingHighlight: "Clients",
    subtitle: "Agenda of the Hunar Tribe to make a difference",
    items: [
      { name: "Coal India", assetKey: "client-1", url: "" },
      { name: "FXB", assetKey: "client-2", url: "" },
      { name: "IIFL Finance", assetKey: "client-3", url: "" },
      { name: "Cafe Amaara", assetKey: "client-4", url: "" },
      { name: "PM Shri", assetKey: "client-5", url: "" },
      { name: "Women Development", assetKey: "client-6", url: "" },
      { name: "Tribe Development", assetKey: "client-7", url: "" },
      { name: "Biotechnology", assetKey: "client-8", url: "" },
      { name: "Navodaya", assetKey: "client-9", url: "" },
      { name: "RRIL", assetKey: "client-10", url: "" },
      { name: "Swachh Dungapur", assetKey: "client-11", url: "" },
      { name: "Arena Animation", assetKey: "client-12", url: "" },
      { name: "Indian Women Impact", assetKey: "client-13", url: "" },
      { name: "Sasken Technologies", assetKey: "client-14", url: "" },
    ],
  },

  impact: {
    headingLead: "Our",
    headingHighlight: "Impact",
    subtitle: "Transforming Lives and Communities Through Innovation",
    joinLabel: "Join Us",
    items: [
      {
        number: "2,65,000+",
        unit: "Kgs",
        highlight: "Scrap",
        description: "Tires Upcycled",
        assetKey: "icon-tyre",
      },
      {
        number: "5,000+",
        unit: "Students",
        highlight: "Educational",
        description: "Activities",
        assetKey: "icon-students",
      },
      {
        number: "70,000+",
        unit: "Kgs",
        highlight: "Scrap",
        description: "Iron Upcycled",
        assetKey: "icon-scrap",
      },
      {
        number: "5,000+",
        unit: "Students",
        highlight: "Educational",
        description: "Activities",
        assetKey: "icon-students",
      },
      {
        number: "15,000+",
        unit: "Kgs",
        highlight: "Plastics",
        description: "Upcycled",
        assetKey: "icon-plastic",
      },
      {
        number: "30+",
        unit: "Tribal Youth",
        highlight: "Skilled",
        description: "& Empowered",
        assetKey: "icon-employee",
      },
    ],
  },

  vision: {
    headingLead: "Our",
    headingHighlight: "Vision",
    subtitle: "Agenda of the Hunar Tribe to make a difference",
    items: [
      {
        iconKey: "globe",
        iconColor: "#119BD1",
        bgColor: "rgba(17,155,209,0.08)",
        title: "Designing",
        highlight: "Sustainable",
        description: "Spaces",
      },
      {
        iconKey: "recycle",
        iconColor: "#2A890B",
        bgColor: "rgba(42,137,11,0.08)",
        title: "Transforming",
        highlight: "Waste",
        description: "Into Wonder",
      },
      {
        iconKey: "book",
        iconColor: "#FF4E4E",
        bgColor: "rgba(255,78,78,0.08)",
        title: "Educating the next",
        highlight: "Generations",
        description: "",
      },
    ],
  },

  gallery: {
    headingLead: "Our",
    headingHighlight: "Gallery",
    subtitle: "Transforming Lives and Communities Through Innovation",
    seeAllLabel: "See All",
    items: [
      {
        assetKey: "gallery-2",
        alt: "Upcycled tire seating installed at a community space",
        caption: "",
      },
      {
        assetKey: "gallery-3",
        alt: "Hand-painted tire planters in the Hunar Tribe workshop",
        caption: "",
      },
      {
        assetKey: "gallery-1",
        alt: "Artisans finishing an upcycled tire pot",
        caption: "",
      },
      {
        assetKey: "gallery-4",
        alt: "Colourful play area built from reclaimed tires",
        caption: "",
      },
      {
        assetKey: "gallery-5",
        alt: "Decorative upcycled planters on display",
        caption: "",
      },
      {
        assetKey: "gallery-6",
        alt: "Children at a Hunar Tribe learning centre",
        caption: "",
      },
      {
        assetKey: "gallery-7",
        alt: "Finished tire furniture ready for dispatch",
        caption: "",
      },
    ],
  },

  team: {
    headingLead: "Who",
    headingHighlight: "We",
    headingTail: "Are?",
    subtitle: "Our Mission To Make A Difference",
    items: [
      { name: "Gautam Bharati", role: "Founder", assetKey: "team-1" },
      { name: "Avani Jain", role: "Co-Founder", assetKey: "team-2" },
    ],
  },

  blogs: {
    headingLead: "Our Latest",
    headingHighlight: "News",
    subtitle: "Our Mission to Make a Difference",
    readMoreLabel: "Read More",
    items: [
      {
        slug: "team-spirit-zero-waste-learning-center",
        title: "Team spirit in action at the Zero Waste Learning Center!",
        assetKey: "blog-1",
        tag: "Article",
        date: "June 3, 2024",
        excerpt:
          "Our team came together at the Zero Waste Learning Center to turn discarded material into something the whole community can use.",
        body:
          "Our team came together at the Zero Waste Learning Center to turn discarded material into something the whole community can use.\n\nEvery session at the centre starts the same way: sorting what has been collected, deciding what can be given a second life, and planning the build. What looks like waste at the start of the day leaves as seating, planters and play equipment.\n\nThe learning centre is as much about the people as the material. Local youth work alongside our artisans, picking up the craft skills that let them take on paid work of their own.",
        externalUrl: "",
      },
      {
        slug: "hands-on-learning-zero-waste-learning-center",
        title:
          "Hands-on learning in progress at the Zero Waste Learning Center!",
        assetKey: "blog-2",
        tag: "Article",
        date: "June 3, 2024",
        excerpt:
          "Students get their hands dirty learning how upcycling works — from raw scrap through to a finished, usable product.",
        body:
          "Students get their hands dirty learning how upcycling works — from raw scrap through to a finished, usable product.\n\nWorkshops run through the week for school groups and community members. Participants learn to cut, clean, shape and finish reclaimed tires, and they take home the piece they make.\n\nThe aim is simple: once you have built something yourself out of what was going to be thrown away, waste never quite looks the same again.",
        externalUrl: "",
      },
      {
        slug: "building-sustainability-one-tire-at-a-time",
        title: "Building sustainability, one tire at a time!",
        assetKey: "blog-3",
        tag: "Article",
        date: "June 3, 2024",
        excerpt:
          "Each tire we reclaim is one less in a landfill — and one more piece of durable, handcrafted decor.",
        body:
          "Each tire we reclaim is one less in a landfill — and one more piece of durable, handcrafted decor.\n\nTires are difficult to dispose of and almost impossible to break down. That same durability is what makes them such good raw material: a tire pot will outlast almost anything else in a garden.\n\nTo date the workshop has upcycled over 2,65,000 kgs of scrap tires, alongside scrap iron and plastics, and trained tribal youth in the skills that make the work possible.",
        externalUrl: "",
      },
    ],
  },

  testimonials: {
    headingLead: "What Our",
    headingHighlight: "Customer",
    headingTail: "Tell",
    subtitle:
      "We take pride in delivering quality and satisfaction. Here's what our amazing customers have to say about their experience with us.",
    shopLabel: "Shop Now",
    items: [
      {
        quote: "Top-quality pots, vibrant and shiny, the best I've ever purchased!",
        name: "Daksh",
        place: "Rajasthan",
      },
      {
        quote: "Absolutely love the pots! They bring life to my home very bright.",
        name: "Hari",
        place: "Karnataka",
      },
      {
        quote:
          "Excellent customer service and beautiful products. Highly recommended!",
        name: "Vishnu",
        place: "Haryana",
      },
    ],
  },

  instagram: {
    headingLead: "Follow Us For Regular",
    headingHighlight: "Updates",
    followLabel: "Follow On Instagram",
    items: [
      { shortcode: "DHNuVH5Bhb2" },
      { shortcode: "DHKvCZZIlD2" },
      { shortcode: "DGXQiuxSSmc" },
      { shortcode: "DF1uX0vyIDW" },
      { shortcode: "DFuEfrBScyU" },
      { shortcode: "DDsMccAhpGg" },
    ],
  },

  pages: {
    items: [
      {
        slug: "privacy",
        title: "Privacy Policy",
        body:
          "We collect only the details you send us through the contact form — your name, mobile number, email address and message — and we use them solely to respond to your enquiry.\n\nWe do not sell or rent your details to anyone. To have your details removed from our records, email hunartribe@gmail.com and we will delete them.",
      },
      {
        slug: "refund-policy",
        title: "Refund Policy",
        body:
          "Orders are fulfilled through our store at hunartribe.mini.site, and the refund terms shown there at the time of purchase apply to your order.\n\nIf an item arrives damaged, message us on WhatsApp at +91-8000425929 within 7 days of delivery with a photograph and we will arrange a replacement or refund.",
      },
      {
        slug: "legal",
        title: "Legal",
        body:
          "This website is operated by Hunar Tribe Pvt Ltd, Dungarpur, Rajasthan, India.\n\nAll images, product designs and written content on this site belong to Hunar Tribe Pvt Ltd and may not be reproduced without written permission. Contact hunartribe@gmail.com for licensing enquiries.",
      },
      {
        slug: "cookies",
        title: "Cookies",
        body:
          "This site does not use advertising or tracking cookies.\n\nEmbedded content from YouTube and Instagram may set cookies of its own when you interact with it. Those are governed by the privacy policies of the respective providers.",
      },
      {
        slug: "site-map",
        title: "Site Map",
        body:
          "Home — hero, products, services, clients, impact, vision, gallery, team, news, testimonials, Instagram and contact sections.\n\nNews — /news, with an article page for each post.\n\nGallery — /gallery, the full set of workshop and installation photographs.\n\nStore — hunartribe.mini.site, where all orders are placed.",
      },
      {
        slug: "shipping-and-returns",
        title: "Shipping & Returns",
        body:
          "We dispatch across India from our workshop in Dungarpur, Rajasthan. Handmade pieces are made to order, so allow 5–7 working days for dispatch, plus transit time.\n\nReturns are handled under our refund policy. Message us on WhatsApp at +91-8000425929 to start a return.",
      },
      {
        slug: "payment-options",
        title: "Payment Options",
        body:
          "Payments for online orders are handled by our store at hunartribe.mini.site, which accepts UPI, major debit and credit cards, and net banking.\n\nFor bulk and institutional orders we raise an invoice and accept bank transfer. Message us on WhatsApp at +91-8000425929 to discuss a bulk order.",
      },
      {
        slug: "faqs",
        title: "FAQs",
        body:
          "Are the products really made from scrap tires? Yes. Every pot, planter and piece of furniture starts as a discarded tire, scrap iron or reclaimed plastic.\n\nDo you take bulk orders? Yes — schools, offices, resorts and municipal projects are a large part of our work. Message us on WhatsApp at +91-8000425929.\n\nDo you ship outside India? Not at present. For export enquiries, email hunartribe@gmail.com.\n\nCan you build a park or playground for us? Yes. See the Services section for the kinds of installations we take on.",
      },
      {
        slug: "press-and-media",
        title: "Press & Media",
        body:
          "For press enquiries, interviews, photographs or brand assets, email hunartribe@gmail.com or call +91-8000425929 between 08:00AM and 08:00PM.\n\nWe are happy to arrange visits to the workshop and learning centre in Dungarpur, Rajasthan.",
      },
    ],
  },
};

export default defaults;
