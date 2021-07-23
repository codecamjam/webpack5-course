const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
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
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    /**
     * this auto cleans our dist folder and removes clutter
     * when we have multiple hashed files from builds
     */
    // new CleanWebpackPlugin(),
    //we can also add options: in this example, we have another folder (build)
    new CleanWebpackPlugin({
      /**
       * this removes old files before webpack generates new files
       * and you can specify an array of file patterns which you want to remove
       * and these patterns are relative to output in
       *  path.resolve(__dirname, "./dist")
       */

      cleanOnceBeforeBuildPatterns: [
        /**
         * THIS MEANS TO REMOVE ALL THE FILES TOGETHER
         * WITH SUBDIRECTORIES INSIDE DIST FOLDER
         * NO MATTER HOW NESTED LEVELS
         *
         * AND THIS IS HOW CLEAN ONCE BEFORE BUILT PATTERNS
         * WORKS BY DEFAULT IF YOU DONT MODIFY IT
         *
         *
         */
        "**/*",
        /**
         * However, if you want to remove the files
         * outside of the dist folder,
         * you should specify an absolute path to file patterns
         * this will remove all the files together with sub
         * folders inside the build folder
         */
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
  ],
};
