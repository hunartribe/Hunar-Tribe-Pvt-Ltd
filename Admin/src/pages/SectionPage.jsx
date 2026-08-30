import React from "react";
import { Navigate, useParams } from "react-router-dom";

import SectionEditor from "../components/SectionEditor";
import CategoryImages from "../components/CategoryImages";
import { sectionByKey } from "../cms/schema";

/** Every CMS screen is this one route, driven by the section's schema entry. */
const SectionPage = () => {
  const { key } = useParams();
  const section = sectionByKey(key);

  if (!section) return <Navigate to="/" replace />;

  return (
    <SectionEditor key={section.key} section={section}>
      {section.custom === "categories"
        ? ({ data, update }) => (
            <CategoryImages
              categories={data.items || []}
              onChange={(items) => update("items", items)}
            />
          )
        : null}
    </SectionEditor>
  );
};

export default SectionPage;
