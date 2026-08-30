import React from "react";
import {
  FaBook,
  FaCouch,
  FaFeatherAlt,
  FaGlobe,
  FaHandsHelping,
  FaHome,
  FaIndustry,
  FaKey,
  FaLeaf,
  FaLightbulb,
  FaPalette,
  FaPencilAlt,
  FaRecycle,
  FaSeedling,
  FaShapes,
  FaTree,
} from "react-icons/fa";

// Admins pick an icon by key in the CMS; components can't be stored in
// Firestore, so every selectable icon lives in one of these maps.

const CATEGORY_ICON_COMPONENTS = {
  palette: FaPalette,
  feather: FaFeatherAlt,
  shapes: FaShapes,
  seedling: FaSeedling,
  tree: FaTree,
  industry: FaIndustry,
  lightbulb: FaLightbulb,
  home: FaHome,
  key: FaKey,
  pencil: FaPencilAlt,
  couch: FaCouch,
  leaf: FaLeaf,
};

const VISION_ICON_COMPONENTS = {
  globe: FaGlobe,
  recycle: FaRecycle,
  book: FaBook,
  leaf: FaLeaf,
  hands: FaHandsHelping,
  lightbulb: FaLightbulb,
};

export const CATEGORY_ICON_KEYS = Object.keys(CATEGORY_ICON_COMPONENTS);
export const VISION_ICON_KEYS = Object.keys(VISION_ICON_COMPONENTS);

export const categoryIcon = (iconKey) => {
  const Icon = CATEGORY_ICON_COMPONENTS[iconKey] || FaTree;
  return <Icon className="text-accent2" />;
};

export const visionIcon = (iconKey, color) => {
  const Icon = VISION_ICON_COMPONENTS[iconKey] || FaGlobe;
  return <Icon size={72} style={{ color: color || "#119BD1" }} />;
};
