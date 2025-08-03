
export const formatDate = (
  dateInput,
  locale = "en-US"          
) => {
  const date = new Date(dateInput);
  if (Number.isNaN(date)) return "Invalid Date";


  const formattedDate = date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  let hour = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${formattedDate} | ${hour}:${minutes} ${period}`;
};
