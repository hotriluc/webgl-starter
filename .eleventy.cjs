const path = require("path");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const glslifyPlugin = require("vite-plugin-glslify").default;

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 3000,
  });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: ".11ty-vite",
    viteOptions: {
      publicDir: "public",
      root: "src",
      plugins: [glslifyPlugin()],
    },
  });

  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/app");
  eleventyConfig.addPassthroughCopy("src/interfaces");
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.setServerPassthroughCopyBehavior("copy");

  return {
    dir: {
      input: "src/views",
      output: "_site",
    },
    passthroughFileCopy: true,
  };
};
