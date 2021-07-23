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
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            /**
             * env preset compiles ecma 6,7,8,etc down to ecma 5
             * so it supports latest ecma standard
             *
             * during tthe time of this tutorial series release,
             * class properties werent part of the official ecma specs
             * so we also needed the plugin below
             * AND if you wanted to use another modern js feature
             * not supported by major browsers yet,
             * you should find a babel plugin for that and include
             * in the list of plugins
             *
             * npm i @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
             */
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
};
