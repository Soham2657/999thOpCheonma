const slugify = require("slugify");

// creates SEO-friendly URLs
module.exports = (text) =>
  slugify(text, { lower: true });
