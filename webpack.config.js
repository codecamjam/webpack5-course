const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        /**
         * This rule tells wp that every time it tries to import
         * a css file, it needs to use these loaders
         * here we specify one or more loaders
         * CSS LOADER - reads contents of css file and returns content (but nothing else)
         * STYLE LOADER - takes the css and injects it into the page using style tags
         * btw using style loader bundles your css together with js into a single resulting file
         * called bundle.js. later we'll see how to generate separate files
         *
         * WITH ASSET MODULES, we didnt have to install any additional we didnt have to
         * install any additional npm packages bc wp includes asset modules out of the box
         *
         * BUT when using loaders, we have to install them explicitely
         * so every webpack loader comes as an npm package that you add
         * as a dependency to your app:
         * npm i css-loader and style-loader --save-dev
         */
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
