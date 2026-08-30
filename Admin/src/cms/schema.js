// Describes every editable section of the public site.
//
// One schema entry drives a whole screen: the singleton `fields` become a form,
// and each entry in `lists` becomes an add/edit/delete/reorder table. Adding a
// field to the site means adding it here, not writing another page.
//
// Field types: text, textarea, url, target, tel, email, checkbox, select,
//              image, youtube, color, slug, number

import { CATEGORY_ICON_KEYS, VISION_ICON_KEYS } from "./icons";

const iconOptions = (keys) =>
  keys.map((key) => ({ value: key, label: key }));

export const sections = [
  {
    key: "settings",
    label: "Site Settings",
    group: "Global",
    description:
      "Contact details, social links, the shop URL and the promo bar. These feed the navbar, footer and contact section on every page.",
    previewNote: "Navbar, footer, contact section — every page",
    fields: [
      { name: "brandFirst", label: "Brand name (dark word)", required: true },
      { name: "brandSecond", label: "Brand name (orange word)", required: true },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        required: true,
        help: "Shown in the top bar, footer and contact card.",
      },
      {
        name: "whatsappNumber",
        label: "WhatsApp number (digits only, with country code)",
        pattern: "^\\d{10,15}$",
        patternMessage: "Digits only, e.g. 918000425929",
      },
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "workHours", label: "Work hours" },
      { name: "addressLine", label: "Address line", required: true },
      { name: "locationShort", label: "Top bar location (state)" },
      { name: "country", label: "Top bar country" },
      { name: "whatsappUrl", label: "WhatsApp link", type: "url" },
      { name: "instagramUrl", label: "Instagram link", type: "url" },
      { name: "linkedinUrl", label: "LinkedIn link", type: "url" },
      {
        name: "shopUrl",
        label: "Shop URL",
        type: "url",
        required: true,
        help: "Used by every Shop Now / Browse All / View Product button.",
      },
      {
        name: "joinUsUrl",
        label: "'Join Us' link",
        type: "target",
        help: "Leave blank to scroll visitors to the contact form instead.",
      },
      { name: "promoEnabled", label: "Show the promo top bar", type: "checkbox" },
      { name: "promoText", label: "Promo text" },
      { name: "promoCtaLabel", label: "Promo button label" },
      { name: "promoCtaUrl", label: "Promo button link", type: "target" },
      { name: "copyrightYear", label: "Copyright year" },
      { name: "companyName", label: "Company name in the footer" },
      { name: "footerCtaSubtitle", label: "Footer CTA small line" },
      { name: "footerCtaTitle", label: "Footer CTA big line" },
      { name: "contactSubtitle", label: "Contact section subtitle" },
      { name: "bulkHighlight", label: "Bulk card highlighted word" },
      { name: "bulkDescription", label: "Bulk card description" },
      { name: "bulkCtaLabel", label: "Bulk card front link label" },
      { name: "bulkBackCtaLabel", label: "Bulk card back link label" },
      {
        name: "leadsToFirestore",
        label: "Save contact enquiries to the Leads inbox",
        type: "checkbox",
        help: "Recommended. Turning this off means enquiries are not stored.",
      },
      {
        name: "googleFormEnabled",
        label: "Also forward enquiries to the old Google Form",
        type: "checkbox",
      },
      { name: "googleFormUrl", label: "Google Form response URL", type: "url" },
      { name: "googleFormEntryName", label: "Google Form field id — name" },
      { name: "googleFormEntryMobile", label: "Google Form field id — mobile" },
      { name: "googleFormEntryEmail", label: "Google Form field id — email" },
      { name: "googleFormEntryMessage", label: "Google Form field id — message" },
    ],
  },

  {
    key: "navigation",
    label: "Navigation & Footer",
    group: "Global",
    description:
      "Menu items and the three footer link columns. A target can be a section id (products, services, clients, impact, vision, gallery, team, news, testimonials, contact), a page path such as /p/privacy, or a full URL.",
    previewNote: "Navbar menu and footer — every page",
    fields: [
      { name: "usefulHeading", label: "Footer column 1 heading" },
      { name: "helpHeading", label: "Footer column 2 heading" },
      { name: "aboutHeading", label: "Footer column 3 heading" },
    ],
    lists: [
      {
        name: "items",
        label: "Menu items",
        titleField: "label",
        fields: [
          { name: "label", label: "Label", required: true },
          {
            name: "sectionId",
            label: "Section id",
            required: true,
            help: "products, services, clients, impact, vision, gallery, team, news, testimonials, contact",
          },
        ],
      },
      {
        name: "useful",
        label: "Footer — Useful Links",
        titleField: "label",
        fields: [
          { name: "label", label: "Label", required: true },
          { name: "target", label: "Target", type: "target", required: true },
        ],
      },
      {
        name: "help",
        label: "Footer — Help Center",
        titleField: "label",
        fields: [
          { name: "label", label: "Label", required: true },
          { name: "target", label: "Target", type: "target", required: true },
        ],
      },
      {
        name: "about",
        label: "Footer — About Us",
        titleField: "label",
        fields: [
          { name: "label", label: "Label", required: true },
          { name: "target", label: "Target", type: "target", required: true },
        ],
      },
      {
        name: "legal",
        label: "Footer — legal links",
        titleField: "label",
        fields: [
          { name: "label", label: "Label", required: true },
          { name: "target", label: "Target", type: "target", required: true },
        ],
      },
    ],
  },

  {
    key: "hero",
    label: "Hero Slides",
    group: "Home page",
    description:
      "The rotating banner at the very top of the home page. Each slide changes every 5 seconds.",
    previewNote: "Home page — top banner",
    lists: [
      {
        name: "items",
        label: "Slides",
        titleField: "title",
        storageFolder: "cms/hero",
        fields: [
          { name: "title", label: "Title", required: true },
          { name: "description", label: "Description", type: "textarea" },
          {
            name: "image",
            label: "Desktop image",
            type: "image",
            assetKeyField: "assetKey",
          },
          {
            name: "mobileImage",
            label: "Mobile image",
            type: "image",
            assetKeyField: "mobileAssetKey",
          },
          { name: "buttonText", label: "Button label", required: true },
          {
            name: "buttonUrl",
            label: "Button link",
            type: "target",
            help: "Full URL, a section id like gallery, or a path like /news.",
          },
        ],
      },
    ],
  },

  {
    key: "marquee",
    label: "Scrolling Tags",
    group: "Home page",
    description: "The scrolling strip of product words under the hero.",
    previewNote: "Home page — strip under the hero",
    lists: [
      {
        name: "items",
        label: "Tags",
        titleField: "text",
        fields: [{ name: "text", label: "Tag", required: true }],
      },
    ],
  },

  {
    key: "promoBanner",
    label: "Partner Banner",
    group: "Home page",
    description:
      "The large partner banner between the tag strip and the products grid.",
    previewNote: "Home page — banner above Products",
    storageFolder: "cms/promo",
    fields: [
      { name: "enabled", label: "Show this banner", type: "checkbox" },
      { name: "headline", label: "Headline", required: true },
      { name: "badgeText", label: "Badge text" },
      { name: "partnerName", label: "Partner name (image alt text)" },
      {
        name: "image",
        label: "Partner logo",
        type: "image",
        assetKeyField: "assetKey",
      },
      { name: "url", label: "Destination link", type: "target" },
    ],
  },

  {
    key: "categories",
    label: "Products & Categories",
    group: "Home page",
    description:
      "Product collections shown in the Products grid. Images come from the Storage folder named below — upload and name them on this screen.",
    previewNote: "Home page — Products section",
    custom: "categories",
    fields: [
      { name: "headingLead", label: "Heading (dark part)" },
      { name: "headingHighlight", label: "Heading (orange part)" },
      { name: "browseAllLabel", label: "Browse All button label" },
    ],
    lists: [
      {
        name: "items",
        label: "Categories",
        titleField: "name",
        fields: [
          { name: "name", label: "Display name", required: true },
          {
            name: "folder",
            label: "Storage folder",
            required: true,
            help: "The folder in Firebase Storage holding this collection's images.",
          },
          {
            name: "iconKey",
            label: "Icon",
            type: "select",
            options: iconOptions(CATEGORY_ICON_KEYS),
          },
          {
            name: "shopUrl",
            label: "Shop link for this collection",
            type: "url",
            help: "Optional. Falls back to the site-wide shop URL.",
          },
        ],
      },
    ],
  },

  {
    key: "services",
    label: "Services",
    group: "Home page",
    description: "The services carousel, each with three points and a video.",
    previewNote: "Home page — Services section",
    fields: [
      { name: "headingLead", label: "Heading (dark part)" },
      { name: "headingHighlight", label: "Heading (orange part)" },
      { name: "subtitle", label: "Subtitle" },
      { name: "joinLabel", label: "Join Us button label" },
      { name: "contactLabel", label: "Contact button label" },
      { name: "learnMoreLabel", label: "Learn More button label" },
      {
        name: "learnMoreUrl",
        label: "Learn More link",
        type: "target",
        help: "Leave blank to scroll to the contact form.",
      },
    ],
    lists: [
      {
        name: "items",
        label: "Services",
        titleField: "title",
        storageFolder: "cms/services",
        fields: [
          { name: "title", label: "Title", required: true },
          { name: "point1", label: "Point 1", type: "textarea", required: true },
          { name: "point2", label: "Point 2", type: "textarea" },
          { name: "point3", label: "Point 3", type: "textarea" },
          {
            name: "icon",
            label: "Icon",
            type: "image",
            assetKeyField: "iconAssetKey",
          },
          {
            name: "youtubeUrl",
            label: "YouTube embed URL",
            type: "youtube",
            required: true,
            help: "Must be an embed link: https://www.youtube.com/embed/VIDEO_ID",
          },
        ],
      },
    ],
  },

  {
    key: "clients",
    label: "Clients",
    group: "Home page",
    description: "Partner and client logos, laid out in two rows.",
    previewNote: "Home page — Clients section",
    fields: [
      { name: "headingLead", label: "Heading (dark part)" },
      { name: "headingHighlight", label: "Heading (orange part)" },
      { name: "subtitle", label: "Subtitle" },
    ],
    lists: [
      {
        name: "items",
        label: "Clients",
        titleField: "name",
        storageFolder: "cms/clients",
        fields: [
          { name: "name", label: "Client name", required: true },
          {
            name: "logo",
            label: "Logo",
            type: "image",
            assetKeyField: "assetKey",
          },
          { name: "url", label: "Website (optional)", type: "url" },
        ],
      },
    ],
  },

  {
    key: "impact",
    label: "Impact Numbers",
    group: "Home page",
    description:
      "The impact stat cards. Each reads: number, unit, then the orange highlight word followed by the rest of the line.",
    previewNote: "Home page — Impact section",
    fields: [
      { name: "headingLead", label: "Heading (dark part)" },
      { name: "headingHighlight", label: "Heading (orange part)" },
      { name: "subtitle", label: "Subtitle" },
      { name: "joinLabel", label: "Join Us button label" },
    ],
    lists: [
      {
        name: "items",
        label: "Stats",
        titleField: "number",
        storageFolder: "cms/impact",
        fields: [
          { name: "number", label: "Number", required: true },
          { name: "unit", label: "Unit", help: "Kgs, Students, Tribal Youth…" },
          { name: "highlight", label: "Highlight word (orange)" },
          { name: "description", label: "Rest of the line" },
          {
            name: "image",
            label: "Icon",
            type: "image",
            assetKeyField: "assetKey",
          },
        ],
      },
    ],
  },

  {
    key: "vision",
    label: "Vision Cards",
    group: "Home page",
    description: "The three vision cards.",
    previewNote: "Home page — Vision section",
    fields: [
      { name: "headingLead", label: "Heading (dark part)" },
      { name: "headingHighlight", label: "Heading (orange part)" },
      { name: "subtitle", label: "Subtitle" },
    ],
    lists: [
      {
        name: "items",
        label: "Cards",
        titleField: "title",
        fields: [
          { name: "title", label: "Title", required: true },
          { name: "highlight", label: "Highlight word (orange)" },
          { name: "description", label: "Trailing words" },
          {
            name: "iconKey",
            label: "Icon",
            type: "select",
            options: iconOptions(VISION_ICON_KEYS),
          },
          { name: "iconColor", label: "Icon colour", type: "color" },
          {
            name: "bgColor",
            label: "Card background",
            help: "A CSS colour, e.g. rgba(17,155,209,0.08)",
          },
        ],
      },
    ],
  },

  {
    key: "gallery",
    label: "Gallery",
    group: "Home page",
    description:
      "The first seven images appear on the home page; the whole list appears on the /gallery page.",
    previewNote: "Home page — Gallery section, and the /gallery page",
    fields: [
      { name: "headingLead", label: "Heading (dark part)" },
      { name: "headingHighlight", label: "Heading (orange part)" },
      { name: "subtitle", label: "Subtitle" },
      { name: "seeAllLabel", label: "See All button label" },
    ],
    lists: [
      {
        name: "items",
        label: "Images",
        titleField: "alt",
        storageFolder: "cms/gallery",
        fields: [
          { name: "image", label: "Image", type: "image", assetKeyField: "assetKey" },
          {
            name: "alt",
            label: "Alt text",
            required: true,
            help: "Describe the photo for screen readers and search engines.",
          },
          { name: "caption", label: "Caption (optional)" },
        ],
      },
    ],
  },

  {
    key: "team",
    label: "Team",
    group: "Home page",
    description: "The people shown in the 'Who We Are?' section.",
    previewNote: "Home page — Who We Are section",
    fields: [
      { name: "headingLead", label: "Heading (start)" },
      { name: "headingHighlight", label: "Heading (orange word)" },
      { name: "headingTail", label: "Heading (end)" },
      { name: "subtitle", label: "Subtitle" },
    ],
    lists: [
      {
        name: "items",
        label: "Team members",
        titleField: "name",
        storageFolder: "cms/team",
        fields: [
          { name: "name", label: "Name", required: true },
          { name: "role", label: "Role", required: true },
          { name: "photo", label: "Photo", type: "image", assetKeyField: "assetKey" },
        ],
      },
    ],
  },

  {
    key: "blogs",
    label: "News & Blogs",
    group: "Home page",
    description:
      "The first three posts appear on the home page; all of them are listed at /news. A post opens its own page unless you give it an external link.",
    previewNote: "Home page — Latest News, plus /news and /news/:slug",
    fields: [
      { name: "headingLead", label: "Heading (dark part)" },
      { name: "headingHighlight", label: "Heading (orange part)" },
      { name: "subtitle", label: "Subtitle" },
      { name: "readMoreLabel", label: "Read More button label" },
    ],
    lists: [
      {
        name: "items",
        label: "Posts",
        titleField: "title",
        storageFolder: "cms/blogs",
        fields: [
          { name: "title", label: "Title", required: true },
          {
            name: "slug",
            label: "URL slug",
            type: "slug",
            required: true,
            slugFrom: "title",
            help: "The post lives at /news/<slug>. Lowercase letters, numbers and hyphens.",
          },
          { name: "image", label: "Cover image", type: "image", assetKeyField: "assetKey" },
          { name: "tag", label: "Tag", help: "Article, Event, Press…" },
          { name: "date", label: "Date", help: "e.g. June 3, 2024" },
          { name: "excerpt", label: "Excerpt", type: "textarea" },
          {
            name: "body",
            label: "Body",
            type: "textarea",
            rows: 12,
            help: "Plain text. Leave a blank line between paragraphs.",
          },
          {
            name: "externalUrl",
            label: "External link (optional)",
            type: "url",
            help: "Set this and the card opens that link instead of the post page.",
          },
        ],
      },
    ],
  },

  {
    key: "testimonials",
    label: "Testimonials",
    group: "Home page",
    description: "Customer quotes in the rotating testimonial card.",
    previewNote: "Home page — Testimonials section",
    fields: [
      { name: "headingLead", label: "Heading (start)" },
      { name: "headingHighlight", label: "Heading (orange word)" },
      { name: "headingTail", label: "Heading (end)" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "shopLabel", label: "Shop button label" },
    ],
    lists: [
      {
        name: "items",
        label: "Testimonials",
        titleField: "name",
        storageFolder: "cms/testimonials",
        fields: [
          { name: "quote", label: "Quote", type: "textarea", required: true },
          { name: "name", label: "Name", required: true },
          { name: "place", label: "Place" },
          { name: "photo", label: "Photo (optional)", type: "image" },
        ],
      },
    ],
  },

  {
    key: "instagram",
    label: "Instagram Posts",
    group: "Home page",
    description:
      "Posts embedded in the Instagram strip. The shortcode is the part of the post URL after /p/ — for instagram.com/p/DHNuVH5Bhb2/ it is DHNuVH5Bhb2.",
    previewNote: "Home page — Instagram strip",
    fields: [
      { name: "headingLead", label: "Heading (dark part)" },
      { name: "headingHighlight", label: "Heading (orange part)" },
      { name: "followLabel", label: "Follow button label" },
    ],
    lists: [
      {
        name: "items",
        label: "Posts",
        titleField: "shortcode",
        fields: [
          {
            name: "shortcode",
            label: "Post shortcode",
            required: true,
            pattern: "^[A-Za-z0-9_-]+$",
            patternMessage: "Just the shortcode, no slashes or full URL.",
          },
        ],
      },
    ],
  },

  {
    key: "pages",
    label: "Info Pages",
    group: "Global",
    description:
      "Text pages behind the footer links. Each is served at /p/<slug>. The starter text is a draft - have someone check the refund, privacy and legal wording before you rely on it.",
    previewNote: "/p/<slug> — linked from the footer",
    lists: [
      {
        name: "items",
        label: "Pages",
        titleField: "title",
        fields: [
          { name: "title", label: "Title", required: true },
          {
            name: "slug",
            label: "URL slug",
            type: "slug",
            required: true,
            slugFrom: "title",
            help: "The page lives at /p/<slug>.",
          },
          {
            name: "body",
            label: "Body",
            type: "textarea",
            rows: 14,
            required: true,
            help: "Plain text. Leave a blank line between paragraphs.",
          },
        ],
      },
    ],
  },
];

export const sectionByKey = (key) =>
  sections.find((section) => section.key === key);

export const sectionGroups = () => {
  const groups = [];
  sections.forEach((section) => {
    let group = groups.find((entry) => entry.label === section.group);
    if (!group) {
      group = { label: section.group, sections: [] };
      groups.push(group);
    }
    group.sections.push(section);
  });
  return groups;
};
