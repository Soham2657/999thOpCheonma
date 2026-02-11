/*
PURPOSE:
Cuts long text for preview display (BlogCard excerpt).
Strips HTML tags before truncating.
*/

export function truncateText(text, limit = 120) {
  if (!text) return "";

  // Strip HTML tags
  const strippedText = text.replace(/<[^>]*>/g, "");

  if (strippedText.length <= limit) return strippedText;

  return strippedText.slice(0, limit) + "...";
}