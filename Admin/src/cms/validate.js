// Field validation shared by the singleton forms and the list item forms.

const URL_RE = /^(https?:\/\/|mailto:|tel:)/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;
const YOUTUBE_EMBED_RE = /^https:\/\/www\.youtube\.com\/embed\/[\w-]+/i;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugify = (value) =>
  (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export const validateField = (field, value) => {
  const raw = typeof value === "string" ? value.trim() : value;

  if (field.required && (raw === "" || raw === undefined || raw === null)) {
    return `${field.label} is required.`;
  }
  if (!raw || typeof raw !== "string") return null;

  switch (field.type) {
    case "url":
      if (!URL_RE.test(raw)) return "Enter a full link starting with https://";
      break;
    case "target":
      // A target may be a URL, a path, or a bare section id.
      if (/\s/.test(raw)) return "Links cannot contain spaces.";
      break;
    case "email":
      if (!EMAIL_RE.test(raw)) return "Enter a valid email address.";
      break;
    case "tel":
      if (!PHONE_RE.test(raw)) return "Enter a valid phone number.";
      break;
    case "youtube":
      if (!YOUTUBE_EMBED_RE.test(raw))
        return "Use the embed form: https://www.youtube.com/embed/VIDEO_ID";
      break;
    case "slug":
      if (!SLUG_RE.test(raw))
        return "Use lowercase letters, numbers and hyphens only.";
      break;
    default:
      break;
  }

  if (field.pattern && !new RegExp(field.pattern).test(raw)) {
    return field.patternMessage || `${field.label} is not in the right format.`;
  }
  if (field.maxLength && raw.length > field.maxLength) {
    return `${field.label} must be under ${field.maxLength} characters.`;
  }
  return null;
};

export const validateFields = (fields, values) => {
  const errors = {};
  fields.forEach((field) => {
    const error = validateField(field, values[field.name]);
    if (error) errors[field.name] = error;
  });
  return errors;
};
