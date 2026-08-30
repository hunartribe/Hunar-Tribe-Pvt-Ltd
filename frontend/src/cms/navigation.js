import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Offset that clears the fixed navbar when scrolling to a section.
const SCROLL_OFFSET = -180;

export const scrollToSection = (id, offset = SCROLL_OFFSET) => {
  const section = document.getElementById(id);
  if (!section) return false;
  const y = section.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
};

/**
 * CMS link targets are written by non-technical staff, so a target can be any
 * of: a full URL, an in-page section id ("contact" or "#contact"), a route
 * ("/news/some-post"), or a route with an anchor ("/#contact").
 */
export const parseTarget = (target) => {
  const value = (target || "").trim();
  if (!value) return { kind: "none" };
  if (/^(https?:)?\/\//i.test(value)) return { kind: "external", url: value };
  if (/^(mailto:|tel:|wa\.me)/i.test(value)) return { kind: "external", url: value };
  if (value.startsWith("/")) {
    const [path, hash] = value.split("#");
    return { kind: "route", path: path || "/", hash: hash || "" };
  }
  return { kind: "anchor", id: value.replace(/^#/, "") };
};

/**
 * Returns a `follow(target)` function that does the right thing for any of the
 * target shapes above, including scrolling to a landing-page section when the
 * visitor is currently on a sub-page.
 */
export const useFollowTarget = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (target, { offset } = {}) => {
      const parsed = parseTarget(target);

      switch (parsed.kind) {
        case "external":
          window.open(parsed.url, "_blank", "noopener,noreferrer");
          return true;

        case "route":
          if (parsed.hash && parsed.path === "/" && location.pathname === "/") {
            return scrollToSection(parsed.hash, offset);
          }
          navigate(parsed.path + (parsed.hash ? `#${parsed.hash}` : ""));
          return true;

        case "anchor":
          if (location.pathname !== "/") {
            navigate(`/#${parsed.id}`);
            return true;
          }
          return scrollToSection(parsed.id, offset);

        default:
          return false;
      }
    },
    [navigate, location.pathname]
  );
};
