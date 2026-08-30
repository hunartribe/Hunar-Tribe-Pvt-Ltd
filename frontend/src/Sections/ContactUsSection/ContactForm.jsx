import React, { useState } from "react";
import DOMPurify from "dompurify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import toast from "react-hot-toast";

import { db } from "../../Firebase/FireBaseConfig";
import { useSiteSettings } from "../../cms/SiteContent";

const ContactForm = () => {
  const settings = useSiteSettings();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields = [
    {
      name: "fullName",
      type: "text",
      label: "Full Name",
      placeholder: "Amit Kumar Mishra",
      autoComplete: "name",
      required: true,
    },
    {
      name: "mobile",
      type: "tel",
      label: "Mobile",
      placeholder: "96422XXXXX",
      autoComplete: "tel",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "E-mail",
      placeholder: "example@gmail.com",
      autoComplete: "email",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      placeholder: "Need a Service...",
      required: false,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = name === "message" ? DOMPurify.sanitize(value) : value;
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
  };

  const validate = () => {
    let temp = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) temp.fullName = "Full name is required.";
    if (!formData.mobile.trim() || !phoneRegex.test(formData.mobile))
      temp.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      temp.email = "Enter a valid email address.";
    if (formData.message.length > 300)
      temp.message = "Message should be under 300 characters.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // Enquiries land in the `leads` collection, where the admin app lists them.
  const saveLead = async () => {
    await addDoc(collection(db, "leads"), {
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      message: formData.message,
      status: "new",
      createdAt: serverTimestamp(),
    });
  };

  // Legacy path, off by default. Google's endpoint is no-cors, so a failure
  // here is invisible - which is exactly why Firestore is now the primary.
  const postToGoogleForm = async () => {
    const payload = new FormData();
    payload.append(settings.googleFormEntryName, formData.fullName);
    payload.append(settings.googleFormEntryMobile, formData.mobile);
    payload.append(settings.googleFormEntryEmail, formData.email);
    payload.append(settings.googleFormEntryMessage, formData.message);

    await fetch(settings.googleFormUrl, {
      method: "POST",
      mode: "no-cors",
      body: payload,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    let delivered = false;

    try {
      if (settings.leadsToFirestore !== false) {
        await saveLead();
        delivered = true;
      }
    } catch (err) {
      // Firestore rejected the write (rules not deployed, offline, quota).
      // Fall through to the Google Form rather than losing the enquiry.
      console.error("Could not save the enquiry to Firestore", err);
    }

    try {
      if (
        settings.googleFormUrl &&
        (settings.googleFormEnabled || !delivered)
      ) {
        await postToGoogleForm();
        delivered = true;
      }
    } catch (err) {
      console.error("Could not forward the enquiry to the Google Form", err);
    }

    if (delivered) {
      toast.success("Submitted Form Successfully, Our Team will Reach You");
      handleClear();
    } else {
      toast.error(
        `Something went wrong. Please call or WhatsApp us on ${settings.phone}.`
      );
    }

    setIsSubmitting(false);
  };

  const handleClear = () => {
    setFormData({
      fullName: "",
      mobile: "",
      email: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4">
        {formFields.map(
          ({ name, type, label, placeholder, required, autoComplete }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
                  placeholder={placeholder}
                />
              ) : (
                <input
                  id={name}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
                  placeholder={placeholder}
                  required={required}
                  autoComplete={autoComplete}
                />
              )}
              {errors[name] && (
                <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
              )}
            </div>
          )
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-[52px] rounded-md bg-accent2 px-6 py-2 cursor-pointer font-medium text-white hover:bg-[#2a0c0c]"
          >
            {isSubmitting ? "Sending..." : "Request For Call"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
