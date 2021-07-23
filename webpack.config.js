const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    new TerserPlugin(),
    /*****
     * this plugin is used to create a separate css file
     * as opposed to including it in our js bundle
     * (before using this, if you inspected the dom with
     * dev tools, our styles were included in the html head)
     *
     * WE HAVE TO MODIFY OUR RULES TO USE THIS PLUGIN
     * in our css and sass rules above,
     *  we replaced style-loader with
     * MiniCssExtractPlugin.loader
     *
     * DONT FORGET TO INCLUDE styles.css into our html markup
     *
     * TLDR:
     *
     * MINI-CSS-EXTRACT-PLUGIN extracts all our styles in our
     * application and puts them
     * in a single css file under the dist folder
     */
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
