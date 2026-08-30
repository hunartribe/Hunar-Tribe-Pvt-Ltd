import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../Firebase/FireBaseConfig";
import defaults from "./defaults";

export const CONTENT_COLLECTION = "siteContent";

const SiteContentContext = createContext({ remote: {}, loaded: false });

// Module-level cache so StrictMode's double mount doesn't fetch twice, and so
// a remount (route change) reuses what we already have.
let contentPromise = null;

const fetchSiteContent = async () => {
  const snapshot = await getDocs(collection(db, CONTENT_COLLECTION));
  const content = {};
  snapshot.forEach((docSnap) => {
    content[docSnap.id] = docSnap.data();
  });
  return content;
};

export const SiteContentProvider = ({ children }) => {
  const [remote, setRemote] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    if (!contentPromise) contentPromise = fetchSiteContent();

    contentPromise
      .then((content) => {
        if (active) setRemote(content);
      })
      .catch((err) => {
        // The site keeps rendering its bundled defaults when Firestore is
        // unreachable, so this is a warning rather than a failure.
        console.warn("Site content unavailable, using defaults.", err);
        contentPromise = null;
      })
      .finally(() => {
        if (active) setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ remote, loaded }), [remote, loaded]);

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
};

/**
 * Content for one section, with every field falling back to the bundled
 * default. A remote `items` array only wins when it actually has entries, so
 * an empty or half-written document can never blank out the live site.
 */
export const useSection = (key) => {
  const { remote } = useContext(SiteContentContext);

  return useMemo(() => {
    const base = defaults[key] || {};
    const override = remote[key] || {};
    const merged = { ...base, ...override };

    if (!Array.isArray(override.items) || override.items.length === 0) {
      merged.items = base.items || [];
    }
    return merged;
  }, [remote, key]);
};

export const useSiteSettings = () => useSection("settings");

export default SiteContentContext;
