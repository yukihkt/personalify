module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
  // pages: {
  //   index: {
  //     entry: "./src/pages/Home/main.js",
  //     template: "./public/index.html",
  //     title: "Home",
  //     chunks: ["chunk-vendors", "chunk-common", "index"],
  //   },
  //   authenticated: {
  //     entry: "./src/pages/Authenticated/main.js",
  //     template: "./public/index.html",
  //     title: "Authenticated",
  //     chunks: ["chunk-vendors", "chunk-common", "authenticated"],
  //   },
  // },
};
