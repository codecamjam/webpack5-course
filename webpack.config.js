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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        /**
         * WEBPACK PROCESS LOADERS FROM RIGHT TO LEFT!!!!
         * 1 invoke sass loader which converts sass to css
         * 2 invoke css loader which converts css to js representation
         * 3 invoke style loader which creates style tags inside html tags
         * and injects the css into it
         * DONT FORGET TO:
         * npm i sass-loader sass --save-dev
         */
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
