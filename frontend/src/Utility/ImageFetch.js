// Reads the product images an admin has uploaded into a Storage folder.
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/FireBaseConfig";

/**
 * Every image in a category folder, with the file name kept alongside the URL
 * so per-image titles and badges set in the CMS can be matched back to it.
 */
export const listCategoryImages = async (folderPath) => {
  const folderRef = ref(storage, folderPath);
  const result = await listAll(folderRef);

  return Promise.all(
    result.items.map(async (itemRef) => ({
      name: itemRef.name,
      fullPath: itemRef.fullPath,
      url: await getDownloadURL(itemRef),
    }))
  );
};

export const getAllImageURLs = async (folderPath) => {
  const images = await listCategoryImages(folderPath);
  return images.map((image) => image.url);
};
