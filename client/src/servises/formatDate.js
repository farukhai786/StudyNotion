// utils/formatDate.js

/**
 * किसी ISO/UTC डेट‑स्ट्रिंग को
 * "29 June 2025 | 3:07 PM" जैसे फॉर्मेट में बदलता है
 *
 * @param {string | number | Date} dateInput - वैध डेट‑स्ट्रिंग / टाइम‑स्टैम्प
 * @param {string} locale - (optional) लोकेल, default "en-US"
 * @returns {string} फ़ॉर्मेटेड दिनाँक + समय
 */
export const formatDate = (
  dateInput,
  locale = "en-US"            // या "hi-IN", "en-GB", आदि
) => {
  const date = new Date(dateInput);
  if (Number.isNaN(date)) return "Invalid Date";

  // ---- दिनाँक (29 June 2025) ----
  const formattedDate = date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ---- 12‑hour समय (3:07 PM) ----
  let hour = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12; // 0 ➜ 12 AM, 12 ➜ 12 PM

  return `${formattedDate} | ${hour}:${minutes} ${period}`;
};
