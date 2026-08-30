// Firestore and Storage access for the admin.

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

import { db, storage } from "../firebase";
import defaults from "./defaults";

export const CONTENT_COLLECTION = "siteContent";
export const LEADS_COLLECTION = "leads";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

/** One section document, falling back to the seed defaults when unwritten. */
export const loadSection = async (key) => {
  const snapshot = await getDoc(doc(db, CONTENT_COLLECTION, key));
  if (!snapshot.exists()) {
    return { data: structuredClone(defaults[key] || {}), seeded: false };
  }
  return { data: snapshot.data(), seeded: true };
};

export const saveSection = async (key, data) =>
  setDoc(doc(db, CONTENT_COLLECTION, key), {
    ...data,
    updatedAt: serverTimestamp(),
  });

/** Which section documents already exist, for the dashboard status list. */
export const loadSectionStatus = async () => {
  const snapshot = await getDocs(collection(db, CONTENT_COLLECTION));
  const present = {};
  snapshot.forEach((docSnap) => {
    present[docSnap.id] = docSnap.data()?.updatedAt || null;
  });
  return present;
};

/** Writes the bundled defaults for any section not yet in Firestore. */
export const seedMissingSections = async ({ overwrite = false } = {}) => {
  const present = await loadSectionStatus();
  const written = [];

  for (const key of Object.keys(defaults)) {
    if (!overwrite && key in present) continue;
    await saveSection(key, structuredClone(defaults[key]));
    written.push(key);
  }
  return written;
};

export const validateImageFile = (file) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Use a PNG, JPG, WEBP, GIF or SVG image.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `Image must be under ${MAX_IMAGE_BYTES / (1024 * 1024)}MB.`;
  }
  return null;
};

const safeName = (name) =>
  name.replace(/[^\w.-]+/g, "-").replace(/-+/g, "-").toLowerCase();

/** Uploads to `folder` and returns the public download URL. */
export const uploadImage = async (folder, file) => {
  const error = validateImageFile(file);
  if (error) throw new Error(error);

  const path = `${folder}/${Date.now()}-${safeName(file.name)}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file, { contentType: file.type });

  return { url: await getDownloadURL(fileRef), path };
};

/** Files inside a product category folder, with names and URLs. */
export const listFolder = async (folder) => {
  const result = await listAll(ref(storage, folder));
  return Promise.all(
    result.items.map(async (itemRef) => ({
      name: itemRef.name,
      fullPath: itemRef.fullPath,
      url: await getDownloadURL(itemRef),
    }))
  );
};

/** Uploads keeping the original file name, so CMS metadata still matches. */
export const uploadToFolder = async (folder, file) => {
  const error = validateImageFile(file);
  if (error) throw new Error(error);

  const fileRef = ref(storage, `${folder}/${safeName(file.name)}`);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return {
    name: fileRef.name,
    fullPath: fileRef.fullPath,
    url: await getDownloadURL(fileRef),
  };
};

export const deleteStorageFile = async (fullPath) =>
  deleteObject(ref(storage, fullPath));

export const loadLeads = async () => {
  const snapshot = await getDocs(
    query(collection(db, LEADS_COLLECTION), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};

export const setLeadStatus = async (id, status) =>
  updateDoc(doc(db, LEADS_COLLECTION, id), { status });

export const deleteLead = async (id) =>
  deleteDoc(doc(db, LEADS_COLLECTION, id));
