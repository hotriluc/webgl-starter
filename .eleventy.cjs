const path = require("path");
const htmlmin = require("html-minifier");
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

      resolve: {
        alias: {
          "@app": path.resolve(".", "/src/app"),
          "@animations": path.resolve(".", "/src/app/animations"),
          "@classes": path.resolve(".", "/src/app/classes"),
          "@components": path.resolve(".", "/src/app/components"),
          "@canvas": path.resolve(".", "/src/app/components/canvas"),
          "@pages": path.resolve(".", "/src/app/pages"),
          "@shaders": path.resolve(".", "/src/app/shaders"),
          "@utils": path.resolve(".", "/src/app/utils"),

          "@styles": path.resolve(".", "/src/styles"),
          "@interfaces": path.resolve(".", "/src/interfaces"),
        },
      },
    },
  });

  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/app");
  eleventyConfig.addPassthroughCopy("src/interfaces");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.setServerPassthroughCopyBehavior("copy");

  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src/views",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: "pug",
  };
};
