module.exports = function (eleventyConfig) {
  // Static assets copied straight through to the build.
  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
    "src/css": "css",
    "src/js": "js",
    "src/CNAME": "CNAME",
  });

  // Films: any with an `order` come first (lowest first); the rest follow
  // alphabetically by title.
  eleventyConfig.addCollection("films", (api) =>
    api.getFilteredByTag("film").sort((a, b) => {
      const oa = a.data.order ?? Infinity;
      const ob = b.data.order ?? Infinity;
      if (oa !== ob) return oa - ob;
      return a.data.title.localeCompare(b.data.title);
    })
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
