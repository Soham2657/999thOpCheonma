/*
PURPOSE:
Convert MongoDB date into readable format.
*/

export function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}