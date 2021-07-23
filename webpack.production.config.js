const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: "./src/index.js",
  entry: {
    helloWorld: "./src/helloWorld.js",
    kiwi: "./src/kiwi.js",
  },
  output: {
    // filename: "bundle.[contenthash].js",
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000, //approx 3kb
    },
  },
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
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "styles.[contenthash].css",
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "helloWorld.html",
      chunks: ["helloWorld"],
      title: "Hello world",
      template: "src/page-template.hbs",
      description: "Some description",
      minify: false, //defaults to true
    }),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      chunks: ["kiwi"],
      title: "Kiwi",
      template: "src/page-template.hbs",
      description: "Some description",
      minify: false, //defaults to true
    }),
  ],
};
