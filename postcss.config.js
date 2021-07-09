const licenseBanner = require("./build/banner");

module.exports = {
  plugins: [
    require("cssnano")({
      preset: "advanced"
    })
    ,
    require("postcss-banner")({
      banner: licenseBanner,
      important: true
    })
  ]
};
