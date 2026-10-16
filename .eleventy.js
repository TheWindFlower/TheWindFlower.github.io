module.exports = function (c) {
  c.addPassthroughCopy("public");
  return { dir: { input: "src", output: "dist", includes: "_includes", data: "_data" } };
};
